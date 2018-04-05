class Pedals {
  constructor(pianoKeys) {
    this._setType();
    this.parentNode = this._getParentNode();
    this.pianoKeys = pianoKeys;
    this.jsButton = this._createjsButton();
  }
  _getParentNode() {
    return document.getElementById('pedal-container');
  }
  _createjsButton() {
    let tempjsButton = new Button({
      'class': 'pedals',
      'id': this.type
    }, this.parentNode)
    tempjsButton.activate = function () {
      this.activate();
    }.bind(this);
    tempjsButton.deactivate = function () {
      this.deactivate();
    }.bind(this);
    return tempjsButton;
  }
}
