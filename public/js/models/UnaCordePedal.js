import Pedals from './Pedals';

export default class UnaCordePedal extends Pedals {
  _setType() {
    this.type = 'unacorde';
  }
  activate() {
    super.activate();
    Object.values(this.pianoKeys).forEach((pianoKey) => {
      pianoKey.softUnaCorde = true;
    });
  }
  deactivate() {
    super.deactivate();
    Object.values(this.pianoKeys).forEach((pianoKey) => {
      pianoKey.softUnaCorde = false;
    });
  }
}
