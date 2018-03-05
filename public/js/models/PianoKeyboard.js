class PianoKeyboard {
  constructor() {
    this.pianoKeys = {};
    this.notesListing = NotesListing.generateNotesListing();
    this.pianoKeys = _generatePianoKeys(this.notesListing);

    this.UnaCordePedal = new UnaCordePedal();
    this.SostenutoPedal = new SostenutoPedal();
    this.SoftPedal = new SoftPedal();
  };

  function _generatePianoKeys() {
    for(let i = 0; i<this.notesListing.length; i++)
      pianoKeys[this.notesListing[i]] = new PianoKey(this.notesListing[i]);
  };
}
