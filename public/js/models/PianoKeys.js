class PianoKey {
  constructor(note, parentNode) {
    this.note = note;
    this.typeOfKey = this._setTypeByNote();
    this.parentNode = parentNode;
    this.DOMelement = this._createDOMelement();
    this._generateDOMElementAttributes();

    // damper mimics the structure of a
    // real piano. TRUE = down/silence, FALSE = up/allowsound
    this.damper = true;
    this.damperLockSostenuto = false;

    // multiple inputs, mouse, keyboard
    this.keyboardDown = false;
    this.mouseDown = false;
  }
  _setTypeByNote() {
    return this._isBlackKey() ? 'black-key' : 'white-key';
  }
  _isBlackKey() {
    return this.note.indexOf('#') != -1
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
  _update() {
    if (this.damper) {
      // TODO stop sound in tone js
    } else {
      // TODO play sound in tone js
    }
  }

  _createDOMelement() {
    return document.createElement('button');
  }
  _generateDOMElementAttributes() {
    this.DOMelement.setAttribute('id', this.note);
    this.DOMelement.setAttribute('class', this.typeOfKey);

    this.parentNode.appendChild(this.DOMelement);

    _addMouseListener();
  }
  _addMouseListener() {
    this.DOMelement.addEventListener('')
  }
}
