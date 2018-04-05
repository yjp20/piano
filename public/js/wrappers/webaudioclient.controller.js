class Controller{
  constructor(reference) {
    this.ref = reference;
    this.loop = false;
    this.settingPlaybackRate = 1.0;
    this.playing = false,
    this._restartTime = 0
    this.load = this.load;
    this.play = this.play;
    this.goto = this.goto;
    this.reset = this.reset;
  }
  initBufferSettings() {
    this._BUFFER_SOURCE.onended = function() {
      if(!this._endedDueToPause) {
        this._restartTime = 0;
        if(this.loop) this.play();
        window.dispatchEvent(this.ref.events.audioEnd);
      }
    }.bind(this);
    this._BUFFER_SOURCE.playbackRate.value = this.settingPlaybackRate;
  }
  //load the new buffer source using handle to audio buffer
  load() {
    this._BUFFER_SOURCE = this.ref.context.createBufferSource();
    this._BUFFER_SOURCE.buffer = this.ref.bufferHandle;
    this._BUFFER_SOURCE.gainNode = this.ref.context.createGain();
    this._BUFFER_SOURCE.connect(this._BUFFER_SOURCE.gainNode);
    this._BUFFER_SOURCE.gainNode.gain.value = 1;
    this._BUFFER_SOURCE.gainNode.connect(this.ref.context.destination);

    if(!this._BUFFER_SOURCE.onended) this.initBufferSettings();
    //this._BUFFER_SOURCE.start();
  }
  pause() {
    this.playing = false;
    this._restartTime += (new Date() - this._startTime) / 1000

    this._endedDueToPause = true;
    this._BUFFER_SOURCE.stop();
  }
  play() {
    this.playing = true;
    this._endedDueToPause = false;
    this.load();
    this._startTime = new Date(); //use for measuring time on pause

    this._BUFFER_SOURCE.start(null, this._restartTime)
  }
  goto(seconds) {
    this._restartTime = seconds;
    if(!this.playing) this.play();
  }
  reset() {
    if(this.playing) this._BUFFER_SOURCE.stop()
    this._restartTime = 0;
  }
  set playbackRate(prop) {
    this._BUFFER_SOURCE.playbackRate.value = prop;
    this.settingPlaybackRate = prop
  }
}

