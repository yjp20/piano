class SustainPedal extends Pedals {
  _setType() {
    this.type = 'sustain';
  }
  activate() {
    console.log(this.type);
    for (let pianoKey in this.pianoKeys) {
      if (this.pianoKeys[pianoKey].isPlaying()) {
        this.pianoKeys[pianoKey].damperLockSustain = true;
      }
    }
  }
  deactivate() {
    for (let pianoKey in this.pianoKeys) {
      this.pianoKeys[pianoKey].damperLockSustain = false;
      this.pianoKeys[pianoKey].stopWhenConditions();
    }
  }
}
