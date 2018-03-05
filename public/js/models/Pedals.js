class Pedals {
  constructor(parentNode, pianoKeys) {
    this.parentNode = parentNode;
    this.pianoKeys = pianoKeys;

    this.DOMbutton = new Button({
      'class': 'pedal'
    }, this.parentNode);
  }
}
