class PianoKeyboard {
  constructor(DOMnode) {
    this.DOMnode = DOMnode;
    this.notesListing = NotesListing.generateNotesListing();
    this.pianoKeys = {};
    this._generatePianoKeys(this._createPedals.bind(this));
    this._createPedals();
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
}
