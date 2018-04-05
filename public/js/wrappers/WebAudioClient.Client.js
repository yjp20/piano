//banner
(function() {
  console.log('%c§ WebAudioWrapper v0.1 §', 'color: #fff; background-color: black; font-size: 20px; letter-spacing: 3px; text-shadow: 1px 1px gray')
})();

class WebAudioClient extends EventTarget {
  constructor(playbackOptions) {
    super();
    this.events = {};
    
    if(this.constructor == WebAudioClient) throw new Error('Do not instantiate base class. Illegal constructor')
    
    //default context options
    if(!playbackOptions) {
      playbackOptions = {
        latencyOption: 'interactive',
        sampleRate: 44100
      }
    }

    this.events.updateDone = new Event('audioUpdateDone');
    this.events.updateStart = new Event('audioUpdateStart');
    this.events.audioEnd = new Event('audioEnd');

    //call AudioContext
    this._buildContext(playbackOptions)

    //node
    this.convNode = this.context.createConvolver();
    this.gainNode = this.context.createGain();

    //
    this.convNode.normalize = true;
  }

  _buildContext(playbackOptions) {
    this.context = new AudioContext({
      latencyHint: playbackOptions.latencyOption,
      sampleRate: playbackOptions.sampleRate
    })
  }

  //set controls for the context
  _setMediaControls() {
    this._suspend = function() {
      this.context.suspend();
    }
  
    this._resume = function() {
      this.context.resume();
    }
  }

  set onaudioloadend(callback) {
    this.addEventListener('audioUpdateDone', callback)
  }

  set onaudioloadstart(callback) {
    this.addEventListener('audioUpdateStart', callback)
  }

  set onaudioend(callback) {
    this.addEventListener('audioEnd', callback)
  }
}

WebAudioClient.Controller = Controller;

/** 
 * @class 
 * @classdesc - creates an audio client that is controlled with a HTMLMediaElement 
 * @memberof! <global>
 * @access public
 * @augments WebAudioClient
 * 
 * @param {HTMLMediaElement} source - the element that will serve as the audio source
 * @param {Object} [playbackOptions] - Options for playback.
 * @param {String} playbackOptions.latencyOption - sets LatencyHint
 * @param {Number} playbackOptions.sampleRate - sets sampling rate, default 44.1 kHz
 * 
 * @example
 * var htmlAudio = new Audio('files/guitar.mp3');
 * var myAudio = new WebAudioClient.fromHTMLElement(htmlAudio)
 * myAudio.play();
 **/

 //using video/audio source
WebAudioClient.fromHTMLMediaElement = class extends WebAudioClient {
  constructor(sources, playbackOptions) {
    super(playbackOptions)
    this._setSource(sources)
    this._setMediaControls();
    this._addEventPassover();
   }

  _setSource(audioSource) {
    if(!audioSource instanceof HTMLMediaElement) throw new Error('not correct')
    
    this.controller = audioSource; //allow to use html play/pause
    this.source.add
    this.source.connect(this.context.destination);
  }

  _setEventPassover() {
    this._audioSource.onended = function() {
      this.dispatchEvent(this.events.audioEnd)
    }
  }
}
 
WebAudioClient.fromBlob = class extends WebAudioClient {
  constructor(source, playbackOptions) {
    super(playbackOptions)
    this._buildAudioBuffer = this._buildAudioBuffer
    this._setSource(source)
    this._setBufferController();
    this._setMediaControls();
  }

  _setBufferController() {
    this.controller = new WebAudioClient.Controller(this);
  }

  _buildAudioBuffer(source) {
    return new Promise(function(resolve, reject) {
      this.dispatchEvent(this.events.updateStart);
      this._readArrayBuffer(source)
      .then(function(results) {

        this.context.decodeAudioData(results)
        .then(function(audioBuffer) {
          resolve(audioBuffer)
        })
        .catch(function(err){});
      }.bind(this))
    }.bind(this))
  }

  _setSource(audioSource) {
    if(audioSource instanceof ArrayBuffer) { //if arraybuffer directly set
      this.audioBuffer = audioSource;
      return;
    }
    if(!audioSource instanceof Blob) console.log('not proper cons -- use realloc.')
    console.log(audioSource)
    this._buildAudioBuffer(audioSource)
    .then(function(audioBuffer) {
      this.bufferHandle = audioBuffer;

      this.dispatchEvent(this.events.updateDone);
    }.bind(this))
  }



  _readArrayBuffer(file) {
    return new Promise(function(resolve, reject) {
      if(!file) resolve();
      const reader = new FileReader();
      
      reader.onload = function(res) {
        resolve(res.target.result)
      }
      console.log(file)
      reader.readAsArrayBuffer(file)
    })
  }
}

WebAudioClient.fromFileURL = class extends WebAudioClient.fromBlob {
  constructor(urlString, playbackOptions) {
    super(null, playbackOptions);
    this.controller = new WebAudioClient.Controller(this)

    this._callXHRRequest(urlString, function(res){
      this._setSource(res)
    }.bind(this));
  }

  _callXHRRequest(urlString, callback) {
    const REQ = new XMLHttpRequest();

    REQ.open('GET', urlString);
    REQ.responseType = 'blob';


    REQ.onloadend = function(res) {
      const RESPONSE_FILE = res.target.response || REQ.response;
      callback(RESPONSE_FILE);
    }
    

    REQ.send();

    //if(!nsync) return REQ.reponse
  }
}

WebAudioClient.Sampler = class extends WebAudioClient.fromFileURL {
  constructor(urlStrings, playbackOptions) {
    super(null, playbackOptions)
    this._bufferSources = {};
    this.activeBufferSources = {};
    let promises = []

    for(let noteName in urlStrings) {
      promises.push(this._buildAudioArray(urlStrings[noteName], noteName))
    }

    Promise.all(promises)
    .then(function(){
      this._initConstants();
      this._initController()
      this.dispatchEvent(this.events.updateDone);
    }.bind(this))
  }

  _initConstants() {
    this.FREQUENCY_DIFF_PER_SEMITONE = 1.05946309436;
    this.LETTER_NUM = {
      'C': 1,
      'C#': 2,
      'D': 3,
      'D#': 4,
      'E': 5,
      'F': 6,
      'G': 7,
      'G#': 8,
      'A': 9,
      'A#': 10,
      'B': 11,

    }
  }

  _initController() {
    this.media = new WebAudioClient.Controller(this);
    let selfRef = this;

    this.controller = {
      play(note) {
        let difference = 1000000;
        let baseNote;
        let thisNote = this.findToSemiInterval(note);

        for(let noteName in this.buffers) {
          let signedDelta = (thisNote - this.findToSemiInterval(noteName))
          let absDelta = Math.abs(signedDelta);
          if (absDelta < Math.abs(difference)) {difference = signedDelta; baseNote = noteName; console.log('ok');}
        }

        this.bufferHandle = this.buffers[baseNote];
        
        if(difference < 0) {
          this.media.settingPlaybackRate = 1/(this.FREQUENCY_DIFF_PER_SEMITONE ** Math.abs(difference))
        } else if(difference > 0) {
          this.media.settingPlaybackRate = this.FREQUENCY_DIFF_PER_SEMITONE ** Math.abs(difference)
        } 
        console.log(this.media.settingPlaybackRate, difference)
        this.media.play();
        selfRef.activeBufferSources[note] = this.media._BUFFER_SOURCE;
      },

      pause(note) {
        try {
          selfRef.activeBufferSources[note].gainNode.gain.exponentialRampToValueAtTime(0.1, selfRef.context.currentTime + 2);
        } catch(e) {
          console.log('note was not activated, or is done.', e)
        }
      },
      playing: this.media.playing
    }
    this.controller.play = this.controller.play.bind(selfRef);
  }

  findToSemiInterval(name) {
    let freqSteps = 0;
    let noteName = name;

    if(noteName.length == 3) {
      freqSteps += this.LETTER_NUM[noteName[0] + noteName[1]];
      freqSteps += (parseInt(noteName[2]) - 1) * 11 
    } else {
      freqSteps += this.LETTER_NUM[noteName[0]];
      freqSteps += (parseInt(noteName[1]) - 1) * 11 
    }

    return freqSteps;
  }

  _buildAudioArray(data, name) {
    if(!this.buffers) this.buffers = {};
    return new Promise(function(resolve, reject){
      this._callXHRRequest(data, function(res){
        this._buildAudioBuffer(res)
        .then(function(buf){
          this.buffers[name] = buf
          resolve();  
        }.bind(this))
      }.bind(this))
    }.bind(this))
  }
} 
 