class Button {
  constructor(attributes, parentNode) {
    this.parentNode = parentNode;
    this.DOMelement = this._createDOMelement();
    this.setDOMAttributes(attributes);
    this._modifyDOMElement();

    // multiple inputs, mouse, keyboard
    this.keyboardDown = false;
    this.mouseDown = false;
  }
  _createDOMelement() {
    return document.createElement('button');
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

    console.log('hello')
    this.mouseDown = true;
    this.activate();
  }
  _mouseUp() {
    console.log('hello')
    this.mouseDown = false;
    this.deactivate();
  }
  keyboardDown() {
    this.keyboardDown = true;
    this.activate();
  }
  keyboardUp() {
    this.keyboardDown = false;
    this.deactivate();
  }
  activate() {

  }
  deactivate() {

  }
}
