class Pedals extends jsButton {
  constructor(pianoKeys) {
    super(null, null, false);
    this._setType();
    this.parentNode = this._getParentNode();
    this.init({
      'class': 'pedals',
      'id': this.type
    }, this.parentNode);
    this.pianoKeys = pianoKeys;
  }
  _getParentNode() {
    return document.getElementById('pedal-container');
  }
}
