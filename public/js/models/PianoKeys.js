class PianoKey {
  constructor(grandfatherNode, note) {
    this.note = note;
    this.typeOfKey = this._setTypeByNote();
    this.grandfatherNode = grandfatherNode;
    this.parentNode = this._getParentNode();
    this.DOMButton = this._createDOMButton();
    this._setPropertyIfGap();
    // damper mimics the structure of a
    // real piano. TRUE = down/silence, FALSE = up/allowsound
    this.damper = true;
    this.damperLockSustain = false;
    this.damperLockSostenuto = false;
    this.softUnaCorde = false;
  }



  _setTypeByNote() {
    return this._isBlackKey() ? 'black-key' : 'white-key';
  }
  _isBlackKey() {
    return this.note.indexOf('#') != -1
  }
  _getParentNode() {
    return document.getElementById(this.typeOfKey + 's');
  }


  _createDOMButton() {
    let tempDOMButton = new Button({
      'class': this.typeOfKey,
      'id': this.note
    }, this.parentNode)
    tempDOMButton.activate = function () {
      this.play();
    }.bind(this);
    tempDOMButton.deactivate = function () {
      this.stopWhenConditions();
    }.bind(this);

    return tempDOMButton;
  }
  _setPropertyIfGap() {
    if (this.note.indexOf('D') != -1 || this.note.indexOf('A') != -1)
      this.DOMButton.DOMelement.setAttribute('gap', '');
  }

  play() {
    this.damper = false;
    this.update();
  }
  stopWhenConditions() {
    if (!this.damperLockSustain && !this.damperLockSostenuto && !this.keyboardDown && !this.mouseDown) {
      this.damper = true;
    }
      this.update();
    }
  update() {
    if (this.damper) {
      this.DOMButton.DOMelement.removeAttribute('pressed')
      // TODO stop sound in tone js
    } else {

        this.DOMButton.DOMelement.setAttribute('pressed', '')
      // TODO play sound in tone js
    }
  }
  isPlaying() {
    return !this.damper;
  }
}
