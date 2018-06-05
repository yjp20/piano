class UnaCordePedal extends Pedals {
  _setType() {
    this.type = 'unacorde';
  }
  activate() {
    super.activate();
    for (let pianoKey in this.pianoKeys) {
      if (this.pianoKeys[pianoKey].isStateOn()) {
        this.pianoKeys[pianoKey].softUnaCorde = true;
      }
    }
  }
  deactivate() {
    super.deactivate();
    for (let pianoKey in this.pianoKeys) {
      this.pianoKeys[pianoKey].softUnaCorde = false;
      this.pianoKeys[pianoKey]._update();
    }
  }
}
