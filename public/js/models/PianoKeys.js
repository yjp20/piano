class PianoKey {
  constructor(grandfatherNode, note) {
    this.note = note;
    this.typeOfKey = this._setTypeByNote();
    this.grandfatherNode = grandfatherNode;
    this.parentNode = this._getParentNode();
    this.DOMbutton = this._createDOMButton();

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
    return document.getElementById(this.type + 's');
  }


  _createDOMButton() {
    let tempDOMButton = new Button({
      'class': this.type,
      'id': this.note
    }, this.parentNode)
    tempDOMButton.activate = function () {
      this.play();
    }.bind(this);
    tempDOMButton.deactivate = function () {
      this.stop();
    }.bind(this);
  }


  play() {
    this.damper = false;
    this.update();
  }
  stopWhenConditions() {
    if (!this.damperLockSustain && !this.damperLockSostenuto && !this.keyboardDown && !this.mouseDown) {
      this.damper = true;
      this.update();
    }
    }
  update() {
    if (this.damper) {
      // TODO stop sound in tone js
    } else {
      // TODO play sound in tone js
    }
  }
  isPlaying() {
    return !this.damper;
  }
}
