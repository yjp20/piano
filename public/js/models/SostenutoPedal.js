class SostenutoPedal extends Pedals {
  constructor() {
    super();
    this.type = 'sostenuto';
  }
  
  activate() {
    for (pianoKey in this.pianoKeys) {
      if (pianoKey.isPlaying()) {
        pianoKey.damperLockSostenuto = true;
      }
    }
  }
  deactivate() {
    for (pianoKey in this.pianoKeys) {
      pianoKey.damperLockSostenuto = false;
      pianoKey.stopWhenConditions();
    }
  }
}
