class SostenutoPedal extends Pedals {
  _setType() {
    this.type = 'sostenuto';
  }
  activate() {
    super.activate();
    for (let pianoKey in this.pianoKeys) {
      if (this.pianoKeys[pianoKey].isStateOn()) {
        this.pianoKeys[pianoKey].damperLockSostenuto = true;
      }
    }
  }
  deactivate() {
    super.deactivate();
    for (let pianoKey in this.pianoKeys) {
      this.pianoKeys[pianoKey].damperLockSostenuto = false;
      this.pianoKeys[pianoKey]._update();
    }
  }
}
