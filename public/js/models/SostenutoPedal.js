import Pedals from './Pedals';

export default class SostenutoPedal extends Pedals {
  _setType() {
    this.type = 'sostenuto';
  }
  activate() {
    super.activate();
    Object.values(this.pianoKeys).forEach((pianoKey) => {
      if (pianoKey.isStateOn()) {
        pianoKey.damperLockSostenuto = true;
      }
    });
  }
  deactivate() {
    super.deactivate();
    Object.values(this.pianoKeys).forEach((pianoKey) => {
      pianoKey.damperLockSostenuto = false;
      pianoKey._update();
    });
  }
}
