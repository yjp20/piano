class PianoKeyboard {
  constructor() {
    this.pianoKeys = {};
    this.notesListing = NotesListing.generateNotesListing();
    this.pianoKeys = _generatePianoKeys();

    this.UnaCordePedal = new UnaCordePedal(this.DOMnode, this.pianoKeys);
    this.SostenutoPedal = new SostenutoPedal(this.DOMnode, this.pianoKeys);
    this.SustainPedal = new SustainPedal(this.DOMnode, this.pianoKeys);
  };

  function _generatePianoKeys() {
    for(let i = 0; i<this.notesListing.length; i++)
      pianoKeys[this.notesListing[i]] = new PianoKey(this.DOMnode, this.notesListing[i]);
  };
}
