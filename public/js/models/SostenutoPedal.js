class SostenutoPedal extends Pedals {
  _setType() {
    this.type = 'sostenuto';
  }
  activate() {
    for (pianoKey in this.pianoKeys) {
      if (this.pianoKeys[pianoKey].isPlaying()) {
        this.pianoKeys[pianoKey].damperLockSostenuto = true;
      }
    }
  }
  deactivate() {
    for (pianoKey in this.pianoKeys) {
      this.pianoKeys[pianoKey].damperLockSostenuto = false;
      this.pianoKeys[pianoKey].stopWhenConditions();
    }
  }
}
