import Pedals from './Pedals';

export default class SustainPedal extends Pedals {
  _setType() {
    this.type = 'sustain';
  }
  activate() {
    super.activate();
    Object.values(this.pianoKeys).forEach((pianoKey) => {
      pianoKey.damperLockSustain = true;
    });
  }
  deactivate() {
    super.deactivate();
    Object.values(this.pianoKeys).forEach((pianoKey) => {
      pianoKey.damperLockSustain = false;
      pianoKey._update();
    });
  }
}
