class UnaCordePedal extends Pedals {
  _setType() {
    this.type = 'unacorde';
  }
  activate() {
    for (let pianoKey in this.pianoKeys) {
      if (this.pianoKeys[pianoKey].isPlaying()) {
        this.pianoKeys[pianoKey].softUnaCorde = true;
      }
    }
  }
  deactivate() {
    for (let pianoKey in this.pianoKeys) {
      this.pianoKeys[pianoKey].softUnaCorde = false;
      this.pianoKeys[pianoKey].stopWhenConditions();
    }
  }
}
