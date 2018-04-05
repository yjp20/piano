class Pedals {
  constructor(pianoKeys) {
    this._setType();
    this.parentNode = this._getParentNode();
    this.pianoKeys = pianoKeys;
    this.DOMButton = this._createDOMButton();
  }
  _getParentNode() {
    return document.getElementById('pedal-container');
  }
  _createDOMButton() {
    let tempDOMButton = new Button({
      'class': 'pedals',
      'id': this.type
    }, this.parentNode)
    tempDOMButton.activate = function () {
      this.activate();
    }.bind(this);
    tempDOMButton.deactivate = function () {
      this.deactivate();
    }.bind(this);
    return tempDOMButton;
  }
}
