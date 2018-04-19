class jsButton {
  constructor(attributes, parentNode) {
    this.parentNode = parentNode;
    this.DOMelement = this._createDOMelement();
    this.setDOMAttributes(attributes);
    this._modifyDOMElement();

    // multiple inputs, mouse, keyboard
    this.keyboardIsDown = false;
    this.mouseIsDown = false;
  }


  _createDOMelement() {
    return document.createElement('div');
  }
  _modifyDOMElement() {
    this._addMouseListener();
    this._appendDOMElement();
  }
  setDOMAttributes(attributes) {
    for (let attribute in attributes) {
      this.DOMelement.setAttribute(attribute, attributes[attribute]);
    }
  }
  _appendDOMElement() {
    this.parentNode.appendChild(this.DOMelement);
  }


  _addMouseListener() {
    this.DOMelement.addEventListener('mousedown', function () {
      this._mouseDown();
    }.bind(this))
    this.DOMelement.addEventListener('mouseup', function () {
      this._mouseUp();
    }.bind(this))
    this.DOMelement.addEventListener('mouseenter', function (event) {
      const CLICKED = 1;
      if (event.buttons == CLICKED) {
        this._mouseDown();
      }
    }.bind(this))
    this.DOMelement.addEventListener('mouseleave', function (event) {
      const CLICKED = 1;
      if (event.buttons == CLICKED) {
        this._mouseUp();
      }
    }.bind(this))
  }
  _mouseDown() {
    this.mouseIsDown = true;
    this._activate();
  }
  _mouseUp() {
    this.mouseIsDown = false;
    this._deactivate();
  }
  keyboardDown() {
    if (!this.keyboardIsDown) {
      this.keyboardIsDown = true;
      this._activate();
    }
  }
  keyboardUp() {
    this.keyboardIsDown = false;
    this._deactivate();
  }
  isStateOn() {
    return this.keyboardIsDown || this.mouseIsDown;
  }


  _activate() {
    this.DOMelement.setAttribute('pressed', '');
    // use super();
  }
  _deactivate() {
    if (!(this.keyboardIsDown || this.mouseIsDown)) {
      console.log("deactivate");
      this.DOMelement.removeAttribute('pressed');
      // use super():
    }
  }
  setText(string) {
    this.DOMelement.innerHTML = string;
  }
}
