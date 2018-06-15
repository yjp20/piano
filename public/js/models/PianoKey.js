import jsButton from './jsButton';

export default class PianoKey extends jsButton {
  constructor(grandfather, note) {
    super(null, null, false);
    this.note = note;
    this.init({
      class: this._getTypeByNote(),
      id: this.note,
    }, this._getParentNode());

    this.grandfather = grandfather;
    this._setPropertyIfBlackKeyNeedsGap();
    this.isPlaying = false;

    this.damperLockSustain = false;
    this.damperLockSostenuto = false;
    this.softUnaCorde = false;
  }


  _getTypeByNote() {
    return this._isBlackKey() ? 'black-key' : 'white-key';
  }
  _isBlackKey() {
    return this.note.indexOf('#') !== -1;
  }
  _getParentNode() {
    return document.getElementById(`${this._getTypeByNote()}s`);
  }


  _setPropertyIfBlackKeyNeedsGap() {
    if (this.note.indexOf('D') !== -1 || this.note.indexOf('A') !== -1) { this.setDOMAttributes({ gap: '' }); }
  }
  isStateOn() {
    return this.keyboardIsDown || this.mouseIsDown ||
           this.damperLockSustain || this.damperLockSostenuto;
  }

  _mouseDown() {
    const prev = this.grandfather._mouse_active;
    if (prev !== undefined) prev._mouseUp();
    this.grandfather._mouse_active = this;
    super._mouseDown();
  }

  _update(strike) {
    if (this.isStateOn()) this.activate(strike);
    else this.deactivate();
  }
  deactivate() {
    super.deactivate();
    if (this.isPlaying) {
      this.grandfather.audioMain.controller.pause(this.note);
      this.grandfather.audioSoft.controller.pause(this.note);
    }
    this.isPlaying = false;
  }
  activate(strike) {
    if (!strike) return;
    super.activate();
    this.isPlaying = true;
    if (!this.softUnaCorde) { 
      console.log('hard');
      this.grandfather.audioMain.controller.play(this.note);
    } else {
      console.log("soft");
      this.grandfather.audioSoft.controller.play(this.note);
    }
  }
}
