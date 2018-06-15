import jsButton from './jsButton';

export default class Pedals extends jsButton {
  constructor(pianoKeys) {
    super(null, null, false);
    this._setType();
    this.parentNode = document.getElementById('pedal-container');
    this.init({
      class: 'pedals',
      id: this.type,
    }, this.parentNode);
    this.pianoKeys = pianoKeys;
  }
}
