class Pedals extends jsButton {
  constructor(pianoKeys) {
    this._setType();
    this.parentNode = this._getParentNode();
    super({
      'class': 'pedals',
      'id': this.type
    }, this.parentNode);
    this.pianoKeys = pianoKeys;
  }
  _getParentNode() {
    return document.getElementById('pedal-container');
  }
}
