class UnaCordePedal extends Pedals {
  this.type = 'unacorde';

  activate() {
    for (pianoKey in this.pianoKeys) {
      if (pianoKey.isPlaying()) {
        pianoKey.softUnaCorde = true;
      }
    }
  }
  deactivate() {
    for (pianoKey in this.pianoKeys) {
      pianoKey.softUnaCorde = false;
      pianoKey.stopWhenConditions();
    }
  }
}
