//banner
(function() {
  console.log('%c§ WebAudioWrapper v0.1 §', 'color: #fff; background-color: black; font-size: 20px; letter-spacing: 3px; text-shadow: 1px 1px gray')
})();

class WebAudioClient extends EventTarget {
  constructor(playbackOptions) {
    super();
      this.constructor;

    if(this.constructor == WebAudioClient) throw new Error('Do not instantiate base class. Illegal constructor')
    
    //default context options
    if(!playbackOptions) {
      playbackOptions = {
        latencyOption: 'interactive',
        sampleRate: 44100
      }
    }

    this._updateEventDone = new Event('audioBufferUpdateDone');
    this._updateEventStart = new Event('audioBufferUpdateStart');

    //call AudioContext
    this._buildContext(playbackOptions)
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
    this.addEventListener('audioBufferUpdateDone', callback)
  }

  set onaudioloadstart(callback) {
    this.addEventListener('audioBufferUpdateStart', callback)
  }
  
 }

 //using video/audio source
WebAudioClient.fromHTMLMediaElement = class extends WebAudioClient {
  constructor(source, playbackOptions) {
    super(playbackOptions)
    this._setSource(source)
    this._setMediaControls();
   }

  _setSource(audioSource) {
    if(!audioSource instanceof HTMLMediaElement) throw new Error('not correct')
    this.controller = audioSource;
    this.source = this.context.createMediaElementSource(audioSource)
    this.source.connect(this.context.destination);
   }
 }

//using some audio blob   
WebAudioClient.fromBlob = class extends WebAudioClient {
  constructor(source, playbackOptions) {
    super(playbackOptions)
    this._setSource(source)
    this._setBufferController();
    this._setMediaControls();
   }

   realloc(source) {
     if(this.controller.playing) this.controller.pause();
     this._setSource(source);
   }

   _setBufferController() {
    let self = this;

    this.controller = {
      initBufferSettings() {
        this._BUFFER_SOURCE.onended = function(){
          if(!this._endedDueToPause) this._restartTime = 0;
        }.bind(this);
        this._BUFFER_SOURCE.playbackRate.value = this.settingPlaybackRate;
      },
      //load the new buffer source using handle to audio buffer
      load() {
        this._BUFFER_SOURCE = self.context.createBufferSource();
        this._BUFFER_SOURCE.buffer = self.bufferHandle;
        this._BUFFER_SOURCE.connect(self.context.destination)

        if(!this._BUFFER_SOURCE.onended) this.initBufferSettings();
        //this._BUFFER_SOURCE.start();
      },
      pause() {
        this.playing = false;
        this._restartTime += (new Date() - this._startTime) / 1000
        console.log(this._restartTime)
        this._endedDueToPause = true;
        this._BUFFER_SOURCE.stop();
      },
      play() {
        this.playing = true;
        this._endedDueToPause = false;
        this.load();
        this._startTime = new Date();
        console.log(this._startTime)
        this._BUFFER_SOURCE.start(null, this._restartTime)
      },
      goto(seconds) {
        this._restartTime = seconds;
        if(!this.playing) this.play();
      },
      reset() {
        if(this.playing) this._BUFFER_SOURCE.stop()
        this._restartTime = 0;
      },
      set playbackRate(prop) {
        this._BUFFER_SOURCE.playbackRate.value = prop;
        this.settingPlaybackRate = prop
      },
      settingPlaybackRate: 1.0,
      playing: false,
      _restartTime: 0
    };
  }   

  _setSource(audioSource) {
    if(audioSource instanceof ArrayBuffer) this.bufferHandle = audioSource
    if(!audioSource instanceof Blob) console.log('not proper cons -- use realloc.')
    console.time('l')
    this._buildAudioBuffer(audioSource)
    .then(function(audioBuffer) {
      this.bufferHandle = audioBuffer;
      console.timeEnd('l')
      this.dispatchEvent(this._updateEventDone);
    }.bind(this))
  }

  _buildAudioBuffer(source) {
 
    return new Promise(function(resolve, reject) {
      this.dispatchEvent(this._updateEventStart);
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
    this._callXHRRequest(urlString);
  }

  _callXHRRequest(urlString) {
    const REQ = new XMLHttpRequest();

    REQ.open('GET', urlString);
    REQ.responseType = 'blob';

    REQ.onloadend = function(res) {
      const RESPONSE_FILE = res.target.response || REQ.response;
      this.realloc(RESPONSE_FILE);
      
    }.bind(this) 

    REQ.send();
  }
}


 


window.addEventListener("dragover",function(e){
  e = e || event;
  e.preventDefault();
},false);
window.addEventListener("drop",function(e){
  e = e || event;
  e.preventDefault();
},false);



window.addEventListener('drop', handle);
var hi;


window.tto = new WebAudioClient.fromFileURL('audio/guitar/A3.mp3')

function handle(e) {
  hi = e.dataTransfer.files[0]
  domohihi = new WebAudioClient.fromBlob(e.dataTransfer.files[0])
}





  
