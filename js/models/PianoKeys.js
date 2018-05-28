class PianoKey extends jsButton{
  constructor(grandfather, note) {
    super(null, null, false);
    this.note = note;
    this.init({
      'class': this._getTypeByNote(),
      'id': this.note
    }, this._getParentNode());

    this.grandfather = grandfather;
    this._setPropertyIfBlackKeyNeedsGap();
    
    this.damperLockSustain = false;
    this.damperLockSostenuto = false;
    this.softUnaCorde = false;
  }


  _getTypeByNote() {
    return this._isBlackKey() ? 'black-key' : 'white-key';
  }
  _isBlackKey(str) {
    return this.note.indexOf('#') != -1
  }
  _getParentNode() {
    return document.getElementById(this._getTypeByNote() + 's');
  }


  _setPropertyIfBlackKeyNeedsGap() {
    if (this.note.indexOf('D') != -1 || this.note.indexOf('A') != -1)
      this.setDOMAttributes({'gap': ''});
  }
  isStateOn() {
    return this.keyboardIsDown || this. mouseIsDown || this.damperLockSustain || this.damperLockSostenuto;
  }
  
  _update(strike) {
    if (this.isStateOn())
      this.activate(strike);
    else
      this.deactivate();
  }
  deactivate() {
    super.deactivate();
    console.log('stop: ' + this.note);
    this.grandfather.audioMain.controller.pause(this.note);
  } 
  activate(strike) {
    if (!strike) return;
    super.activate();
    console.log('play: ' + this.note);
    this.grandfather.audioMain.controller.play(this.note);
  }
}
