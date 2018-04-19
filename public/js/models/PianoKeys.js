class PianoKey {
  constructor(grandfather, note) {
    this.note = note;
    this.typeOfKey = this._setTypeByNote();
    this.grandfather = grandfather;
    this.grandfatherNode = grandfather.DOMnode;
    this.parentNode = this._getParentNode();
    this.jsButton = this._createjsButton();
    this._setPropertyIfBlackKeyNeedsGap();
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


  _createjsButton() {
    let tempjsButton = new Button({
      'class': this.typeOfKey,
      'id': this.note
    }, this.parentNode)
    tempjsButton.activate = this.play.bind(this);
    tempjsButton.deactivate = this.stopWhenConditions.bind(this);

    return tempjsButton;
  }
  _setPropertyIfBlackKeyNeedsGap() {
    if (this.note.indexOf('D') != -1 || this.note.indexOf('A') != -1)
      this.jsButton.DOMelement.setAttribute('gap', '');
  }

  setText(string) {
    this.jsButton.DOMelement.innerHTML = string;
  }

  play() {
    console.log('play1: ' + this.note);
    if (this.damper) {
      this.damper = false;
      this.update();
    }
  }
  stopWhenConditions() {
    console.log(this.damperLockSustain, this.damperLockSostenuto, this.jsButton.isStateOn());
    if (!this.damperLockSustain && !this.damperLockSostenuto && !this.jsButton.isStateOn()) {
      this.damper = true;
      this.update();
    }
  }
  update() {
    if (this.damper) {
      console.log('stop: ' + this.note);
      this.grandfather.audioMain.controller.pause(this.note);
    } else {
      console.log('play: ' + this.note);
      this.grandfather.audioMain.controller.play(this.note);
    }
  }
  isPlaying() {
    return !this.damper;
  }
}
