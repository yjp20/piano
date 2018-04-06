class SostenutoPedal extends Pedals {
  _setType() {
    this.type = 'sostenuto';
  }
  activate() {
    for (let pianoKey in this.pianoKeys) {
      if (this.pianoKeys[pianoKey].isPlaying()) {
        this.pianoKeys[pianoKey].damperLockSostenuto = true;
      }
    }
  }
  deactivate() {
    for (let pianoKey in this.pianoKeys) {
      this.pianoKeys[pianoKey].damperLockSostenuto = false;
      this.pianoKeys[pianoKey].stopWhenConditions();
    }
  }
}
