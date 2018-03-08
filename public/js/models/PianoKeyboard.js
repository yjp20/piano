class PianoKeyboard {
  constructor(DOMnode) {
    this.DOMnode = DOMnode;
    this.pianoKeys = {};
    this.notesListing = NotesListing.generateNotesListing();
    this.pianoKeys = this._generatePianoKeys();

    this.UnaCordePedal = new UnaCordePedal(this.DOMnode, this.pianoKeys);
    this.SostenutoPedal = new SostenutoPedal(this.DOMnode, this.pianoKeys);
    this.SustainPedal = new SustainPedal(this.DOMnode, this.pianoKeys);
  };

  _generatePianoKeys() {
    for(let i = 0; i<this.notesListing.length; i++)
      this.pianoKeys[this.notesListing[i]] = new PianoKey(this.DOMnode, this.notesListing[i]);
  };
}
