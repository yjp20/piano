class Pedals {
  constructor(grandfatherNode, pianoKeys) {
    this.grandfatherNode = grandfatherNode;
    this.parentNode = _getParentNode();
    this.pianoKeys = pianoKeys;
    this.DOMbutton = this._createDOMButton();
  }
  _getParentNode() {
    this.parentNode.getElementById('pedal-container');
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
