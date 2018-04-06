class Button {
  constructor(attributes, parentNode) {
    this.parentNode = parentNode;
    this.DOMelement = this._createDOMelement();
    this.setDOMAttributes(attributes);
    this._modifyDOMElement();

    // multiple inputs, mouse, keyboard
    this.keyboardIsDown = false;
    this.mouseIsDown = false;
  }
  get isStateOn() {
    return this.keyboardDown || this.mouseDown;
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
    this._parentActivate();
  }
  _mouseUp() {
    this.mouseIsDown = false;
    this._parentDeactivate();
  }
  keyboardDown() {
    if (!this.keyboardIsDown) {
      this.keyboardIsDown = true;
      this._parentActivate();
    }
  }
  keyboardUp() {
    this.keyboardIsDown = false;
    this._parentDeactivate();
  }
  _parentActivate() {
    this.DOMelement.setAttribute('pressed', '');
    this.activate();
  }
  _parentDeactivate() {
    if (!(this.keyboardIsDown || this.mouseIsDown)) {
      this.DOMelement.removeAttribute('pressed');
      this.deactivate()
    }
  }
}
