module.exports = class PianoKeyboard {
  constructor() {
    this.pianoKeys = {};
    this.notesListing = new NotesListing();
    _generatePianoKeys();
  };

  function _generatePianoKeys() {
    for(let i = 0; i<notesListing.length; i++){
      pianoKeys[notesListing[i]] = new PianoKey(notesListing[i]);
    }
  };
}
