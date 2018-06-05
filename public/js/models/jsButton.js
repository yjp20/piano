class jsButton {
  constructor(attributes, parentNode, activate=true) {
    if (activate) this.init(attributes, parentNode);
  }
  
  init(attributes, parentNode) {
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
  
  setText(string) {
    this.DOMelement.innerHTML = string;
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
    this._update(true);
  }
  _mouseUp() {
    this.mouseIsDown = false;
    this._update();
  }
  keyboardDown() {
    // filter repeat keys
    if (!this.keyboardIsDown) {
      this.keyboardIsDown = true;
      this._update(true);
    }
  }
  keyboardUp() {
    this.keyboardIsDown = false;
    this._update();
  }
  isStateOn() {
    return this.keyboardIsDown || this.mouseIsDown;
  }
  _update() {
    if (this.isStateOn()) 
      this.activate();
    else
      this.deactivate();
  }
  activate() {
    this.DOMelement.setAttribute('pressed', '');
    // use super();
  }
  deactivate() {
    this.DOMelement.removeAttribute('pressed');
  }
}
