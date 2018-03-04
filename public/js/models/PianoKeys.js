module.exports = class PianoKey {
  constructor(note) {
    this.note = note;

    // hammer mimics the structure of a
    // real piano. TRUE = down/silence, FALSE = up/allowsound
    this.damper = true;
    this.damperLockSostenuto = false;
  }
  play() {
    this.damper = false;
    this._update();
  }
  stop(damperLockUnaCorde = false) {
    if (!damperLockUnaCorde && !this.damperLockSostenuto) {
      this.damper = true;
      this._update();
    }
  }
  _createDOMelement() {

  }
  _addClickListener() {}
  _update() {
    if (this.damper) {
      // TODO stop sound in tone js
    } else {
      // TODO play sound in tone js
    }
  }
}
