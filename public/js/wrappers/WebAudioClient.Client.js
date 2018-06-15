// banner
(function () {
  console.log('%c§ WebAudioWrapper v0.1 §', 'color: #fff; background-color: black; font-size: 20px; letter-spacing: 3px; text-shadow: 1px 1px gray');
}());

export default class WebAudioClient {
  constructor(playbackOptions) {
    this.hook = new EventTarget();
    this.events = {};

    if (this.constructor == WebAudioClient) throw new Error('Do not instantiate base class. Illegal constructor');

    // default context options
    if (!playbackOptions) {
      playbackOptions = {
        latencyOption: 'interactive',
        sampleRate: 44100,
      };
    }

    this.events.updateDone = new Event('audioUpdateDone');
    this.events.updateStart = new Event('audioUpdateStart');
    this.events.audioEnd = new Event('audioEnd');

    // call AudioContext
    this._buildContext(playbackOptions);
  }

  _buildContext(playbackOptions) {
    this.context = new AudioContext({
      latencyHint: playbackOptions.latencyOption,
      sampleRate: playbackOptions.sampleRate,
    });
  }

  // set controls for the context
  _setMediaControls() {
    this._suspend = function () {
      this.context.suspend();
    };

    this._resume = function () {
      this.context.resume();
    };
  }

  bufferSource(buffer) {
    const buf = this.context.createBufferSource();
    buf.buffer = buffer;
    return buf;
  }

  set onaudioloadend(callback) {
    this.addEventListener('audioUpdateDone', callback);
  }

  set onaudioloadstart(callback) {
    this.addEventListener('audioUpdateStart', callback);
  }

  set onaudioend(callback) {
    this.addEventListener('audioEnd', callback);
  }
}

// required for controlling buffers
WebAudioClient.Controller = class {
  constructor(reference) {
    this.ref = reference;
    this.loop = false;
    this.settingPlaybackRate = 1.0;
    this.playing = false,
    this.volume = 1;
    this._restartTime = 0;
    this.load = this.load;
    this.play = this.play;
    this.goto = this.goto;
    this.reset = this.reset;
  }
  initBufferSettings() {
    this._BUFFER_SOURCE.onended = function () {
      if (!this._endedDueToPause) {
        this._restartTime = 0;
        if (this.loop) this.play();
        window.dispatchEvent(this.ref.events.audioEnd);
      }
    }.bind(this);
    this._BUFFER_SOURCE.playbackRate.setValueAtTime(this.settingPlaybackRate, this.ref.context.currentTime + 0.0001);
  }
  // load the new buffer source using handle to audio buffer
  load() {
    this._BUFFER_SOURCE = this.ref.bufferSource(this.ref.bufferHandle);
    this._BUFFER_SOURCE.gainNode = this.ref.context.createGain();
    this._BUFFER_SOURCE.connect(this._BUFFER_SOURCE.gainNode);
    this._BUFFER_SOURCE.gainNode.gain.setValueAtTime(this.volume, this.ref.context.currentTime + 0.00001);
    this._BUFFER_SOURCE.gainNode.connect(this.ref.context.destination);

    if (!this._BUFFER_SOURCE.onended) this.initBufferSettings();
  }
  pause() {
    this.playing = false;
    this._restartTime += (new Date() - this._startTime) / 1000;

    this._endedDueToPause = true;
    this._BUFFER_SOURCE.stop();
  }
  play() {
    this.playing = true;
    this._endedDueToPause = false;
    this.load();
    this._startTime = new Date(); // use for measuring time on pause

    this._BUFFER_SOURCE.start(null, this._restartTime);
  }
  setVolume(volume) {
    this.volume = volume;
  }
  goto(seconds) {
    this._restartTime = seconds;
    if (!this.playing) this.play();
  }
  reset() {
    if (this.playing) this._BUFFER_SOURCE.stop();
    this._restartTime = 0;
  }
  set playbackRate(prop) {
    this._BUFFER_SOURCE.playbackRate.setValueAtTime(prop, this.ref.context.currentTime + 0.001);
    this.settingPlaybackRate = prop;
  }
};


// using video/audio source
WebAudioClient.fromHTMLMediaElement = class extends WebAudioClient {
  constructor(sources, playbackOptions) {
    super(playbackOptions);
    this._setSource(sources);
    this._setMediaControls();
    this._addEventPassover();
  }

  _setSource(audioSource) {
    if (!(audioSource instanceof HTMLMediaElement)) throw new Error('not correct');

    this.controller = audioSource; // allow to use html play/pause
    this.source.add;
    this.source.connect(this.context.destination);
  }

  _setEventPassover() {
    this._audioSource.onended = function () {
      this.hook.dispatchEvent(this.events.audioEnd);
    };
  }
};

WebAudioClient.fromBlob = class extends WebAudioClient {
  constructor(source, playbackOptions) {
    super(playbackOptions);
    this._buildAudioBuffer = this._buildAudioBuffer;
    this._setSource(source);
    this._setBufferController();
    this._setMediaControls();
  }

  _setBufferController() {
    this.controller = new WebAudioClient.Controller(this);
  }

  _buildAudioBuffer(source) {
    return new Promise(((resolve, reject) => {
      this.hook.dispatchEvent(this.events.updateStart);
      this._readArrayBuffer(source)
        .then((results) => {
          this.context.decodeAudioData(results)
            .then((audioBuffer) => {
              resolve(audioBuffer);
            })
            .catch((err) => {});
        });
    }));
  }

  _setSource(audioSource) {
    if (audioSource instanceof ArrayBuffer) { // if arraybuffer directly set
      this.audioBuffer = audioSource;
      return;
    }
    if (!(audioSource instanceof Blob)) console.log('not proper cons -- use realloc.');

    this._buildAudioBuffer(audioSource)
      .then((audioBuffer) => {
        this.bufferHandle = audioBuffer;

        this.hook.dispatchEvent(this.events.updateDone);
      });
  }


  _readArrayBuffer(file) {
    return new Promise(((resolve, reject) => {
      if (!file) resolve();
      const reader = new FileReader();

      reader.onload = function (res) {
        resolve(res.target.result);
      };

      reader.readAsArrayBuffer(file);
    }));
  }
};

WebAudioClient.fromFileURL = class extends WebAudioClient.fromBlob {
  constructor(urlString, playbackOptions) {
    super(null, playbackOptions);
    this.controller = new WebAudioClient.Controller(this);

    if (this.constructor === WebAudioClient.fromFileURL) {
      this._callXHRRequest(urlString, (res) => {
        this._setSource(res);
      });
    }
  }

  _callXHRRequest(urlString, callback) {
    const REQ = new XMLHttpRequest();

    REQ.open('GET', urlString);
    REQ.responseType = 'blob';


    REQ.onloadend = function (res) {
      const RESPONSE_FILE = res.target.response || REQ.response;
      callback(RESPONSE_FILE);
    };


    REQ.send();

    // if(!nsync) return REQ.reponse
  }
};

WebAudioClient.Sampler = class extends WebAudioClient.fromFileURL {
  constructor(urlStrings, playbackOptions, volume = 1) {
    super(null, playbackOptions);
    this._bufferSources = {};
    this.activeBufferSources = {};
    this.volume = volume 
    const baseURL = urlStrings.baseURL;
    const promises = [];
    for (const noteName in urlStrings.files) {
      promises.push(this._buildAudioArray(encodeURIComponent(baseURL + urlStrings.files[noteName]), noteName));
    }

    Promise.all(promises)
      .then(() => {
        this._initConstants();
        this._initController();
        this.hook.dispatchEvent(this.events.updateDone);
      });
  }

  _initConstants() {
    this.FREQUENCY_DIFF_PER_SEMITONE = 1.05946309436; // 12rt of 2
    this.LETTER_NUM = {
      'C':  1,
      'C#': 2,
      'D':  3,
      'D#': 4,
      'E':  5,
      'F':  6,
      'F#': 7,
      'G':  8,
      'G#': 9,
      'A':  10,
      'A#': 11,
      'B':  12
    };

    for (let note in this.buffers) { 
      this.buffers[note].push(this.findToSemiInterval(note))
    };

    
  }

  _initController() {
    this.media = new WebAudioClient.Controller(this);
    const selfRef = this;

    // override basic controller for the playing
    this.controller = {
      play(note) {
        let difference = 1000000;
        let baseNote;
        const thisNote = this.findToSemiInterval(note)
        for (const noteName in this.buffers) {
          const signedDelta = (thisNote - this.buffers[noteName][1]);
          const absDelta = Math.abs(signedDelta);
          if (absDelta < Math.abs(difference)) { difference = signedDelta; baseNote = noteName; console.log('ok'); }
        }
        this.bufferHandle = this.buffers[baseNote][0];

        if (difference <= 0) {
          this.media.settingPlaybackRate = 1 / (this.FREQUENCY_DIFF_PER_SEMITONE ** Math.abs(difference));
        } else if (difference >= 0) {
          this.media.settingPlaybackRate = this.FREQUENCY_DIFF_PER_SEMITONE ** Math.abs(difference);
        }
        this.media.setVolume(this.volume)
        this.media.play();
        selfRef.activeBufferSources[note] = this.media._BUFFER_SOURCE;
      },

      pause(note) {
        try {
          selfRef.activeBufferSources[note].gainNode.gain.exponentialRampToValueAtTime(0.01, selfRef.context.currentTime + 0.85);
        } catch (e) {
        }
      },
      playing: this.media.playing,
    };
    
    this.controller.play = this.controller.play.bind(selfRef);
  }

  findToSemiInterval(name) {
    let freqSteps = 0;
    const noteName = name;

    if (noteName.length == 3) { // accidental note
      freqSteps += this.LETTER_NUM[noteName[0] + noteName[1]];
      freqSteps += (parseInt(noteName[2]) - 1) * 12;
    } else { // else, regular note
      freqSteps += this.LETTER_NUM[noteName[0]];
      freqSteps += (parseInt(noteName[1]) - 1) * 12;
    }

    return freqSteps;
  }

  _buildAudioArray(data, name) {
    if (!this.buffers) this.buffers = {};
    return new Promise(((resolve, reject) => {
      this._callXHRRequest(data, (res) => {
        this._buildAudioBuffer(res)
          .then((buf) => {
            this.buffers[name] = [buf];
            resolve();
          });
      });
    }));
  }
};
