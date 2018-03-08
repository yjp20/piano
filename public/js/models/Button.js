class Button {
  constructor(attributes, parentNode) {
    this.setDOMAttributes(attributes);
    this.parentNode = parentNode;

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
    for (attribute in attributes) {
      this.DOMelement.setAttribute(attribute, attributes[attribute]);
    }
  }
  _appendDOMElement() {
    this.parentNode.appendChild(this.DOMelement);
  }
  _addMouseListener() {
    this.DOMelement.addEventListener('onmousedown', function () {
      this.mouseDown();
    }.bind(this))
    this.DOMelement.addEventListener('onmouseup', function () {
      this.mouseUp();
    }.bind(this))
    this.DOMelement.addEventListener('onmouseenter', function (event) {
      const CLICKED = 1;
      if (event.button == CLICKED) {
        this.mouseDown();
      }
    }.bind(this))
    this.DOMelement.addEventListener('onmouseup', function (event) {
      const CLICKED = 1;
      if (event.button == CLICKED) {
        this.mouseUp();
      }
    }.bind(this))
  }
  _mouseDown() {
    this.mouseDown = true;
    this.activate();
  }
  _mouseUp() {
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
