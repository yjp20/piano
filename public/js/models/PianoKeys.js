class PianoKey extends Button {
  constructor(note, grandfatherNode) {
    this.note = note;
    this.typeOfKey = this._setTypeByNote();
    this.gradnfatherNode = grandfatherNode;
    this.parentNode = this._getParentNode();
    this.button = this._createDOMButton();

    // damper mimics the structure of a
    // real piano. TRUE = down/silence, FALSE = up/allowsound
    this.damper = true;
    this.damperLockSostenuto = false;
    this.damperLockUnaCorde = false;
  }



  _setTypeByNote() {
    return this._isBlackKey() ? 'black-key' : 'white-key';
  }
  _isBlackKey() {
    return this.note.indexOf('#') != -1
  }
  _getParentNode() {
    return this.gradnfatherNode.getElementById(this.type + 's');
  }


  _createDOMButton() {
    let tempDOMButton = new Button({
      'class': this.type,
      'id': this.note
    }, this.parentNode)
    tempDOMButton.activate = function () {
      play();
    }
    tempDOMButton.deactivate = function () {
      stop();
    }
  }


  play() {
    this.damper = false;
    this._update();
  }
  stop() {
    if (!this.damperLockUnaCorde && !this.damperLockSostenuto && !this.keyboardDown && !this.mouseDown) {
      this.damper = true;
      this._update();
    }
  }
  _update() {
    if (this.damper) {
      // TODO stop sound in tone js
    } else {
      // TODO play sound in tone js
    }
  }
  isPlaying() {
    return !damper;
  }
}
