class SustainPedal extends Pedals {
  this.type = 'sustain';

  activate() {
    for (pianoKey in this.pianoKeys) {
      if (pianoKey.isPlaying()) {
        pianoKey.damperLockSustain = true;
      }
    }
  }
  deactivate() {
    for (pianoKey in this.pianoKeys) {
      pianoKey.damperLockSustain = false;
      pianoKey.stopWhenConditions();
    }
  }
}
