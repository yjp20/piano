class Pedals {
  constructor(parentNode) {
    this.parentNode = parentNode;
    _createDOMElement();
    _modiftDOMElement();
    _appendDOMElemment();
  }

  _createDOMElement() {
    this.DOMelement = document.createElement('button')
  }
  _modifyDOMElement() {
    this.DOMelement.setAttribute('class', 'pedal')
  }
  _appendDOMElement() {
    this.parentNode.appendChild(this.DOMelement);
  }
}
