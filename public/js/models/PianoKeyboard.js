class PianoKeyboard {
  constructor(DOMnode) {
    this.DOMnode = DOMnode;
    this.notesListing = NotesListing.generateNotesListing();
    this.pianoKeys = {};
    this.currentKeymapping;
    this._generatePianoKeys(this._createPedals.bind(this));
    this._createPedals();
    this._addKeyListener();
    this.setKeyBindings(keymapping['functional']);
  };
  _generatePianoKeys(callback) {
    for(let i = 0; i<this.notesListing.length; i++)
      this.pianoKeys[this.notesListing[i]] = new PianoKey(this.DOMnode, this.notesListing[i]);
  };
  _createPedals() {
    this.UnaCordePedal = new UnaCordePedal(this.pianoKeys);
    this.SostenutoPedal = new SostenutoPedal(this.pianoKeys);
    this.SustainPedal = new SustainPedal(this.pianoKeys);
  }
  _addKeyListener() {
    document.addEventListener('keydown', function (e) {
      let key = this.currentKeymapping[e.keyCode];
      if (key != undefined && key[0] != 'p') /* filters pedals */
        this.pianoKeys[key].jsButton.keyboardDown();
    }.bind(this));
    document.addEventListener('keyup', function (e) {
      let key = this.currentKeymapping[e.keyCode];
      if (key != undefined && key[0] != 'p') /* filters pedals */
        this.pianoKeys[key].jsButton.keyboardUp();
    }.bind(this));
  }
  setKeyBindings(assignment) {
    this.currentKeymapping = assignment;

    for (let key in this.pianoKeys) {
      this.pianoKeys[key].setText('');
    }
    for (let code in assignment) {
      let key = assignment[code];
      let value = keyCodeToText(code);
      if (key[0] != 'p') /*this filters pedals*/
        this.pianoKeys[key].setText(value);
    }
  }
}
