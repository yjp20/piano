class PianoKey {
  constructor(note, grandfatherNode) {
    this.note = note;
    this.typeOfKey = this._setTypeByNote();
    this.gradnfatherNode = grandfatherNode;
    this.parentNode = this._getParentNode();
    this.DOMelement = this._createDOMelement();
    this._modifyDOMElement();

    // damper mimics the structure of a
    // real piano. TRUE = down/silence, FALSE = up/allowsound
    this.damper = true;
    this.damperLockSostenuto = false;
    this.damperLockUnaCorde = false;

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
  _getParentNode() {
    return this.gradnfatherNode.getElementById(this.type + 's');
  }



  _createDOMelement() {
    return document.createElement('button');
  }
  _modifyDOMElement() {
    this._setDOMElementAttributes();
    this._addMouseListener();
    this._appendDOMElement();
  }
  _setDOMElementAttributes() {
    this.DOMelement.setAttribute('id', this.note);
    this.DOMelement.setAttribute('class', this.typeOfKey + ' ' + this.note[0]);
  }
  _appendDOMElement() {
    this.parentNode..appendChild(this.DOMelement);
  }
  _addMouseListener() {
    this.DOMelement.addEventListener('onmousedown', function () {
      this.mousePlay();
    })
    this.DOMelement.addEventListener('onmouseup', function () {
      this.mouseStop();
    })
    this.DOMelement.addEventListener('onmouseenter', function (event) {
      const CLICKED = 1;
      if (event.button == CLICKED) {
        this.mousePlay();
      }
    })
    this.DOMelement.addEventListener('onmouseup', function (event) {
      const CLICKED = 1;
      if (event.button == CLICKED) {
        this.mouseStop();
      }
    })
  }
  _mousePlay() {
    this.mouseDown = true;
    this.play();
  }
  _mouseStop() {
    this.mouseDown = false;
    this.stop();
  }

  _keyboardPlay() {
    this.keyboardDown = true;
    this.play();
  }
  _keyboardStop() {
    this.keyboardDown = false;
    this.stop();
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
}
