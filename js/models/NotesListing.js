class NotesListing {
  static generateNotesListing() {
    this._createNotesListing();
    this._fillNotesListing();
    return this.notes;
  };

  static _createNotesListing() {
    this.notes = [];
  };

  static _fillNotesListing() {
    const FRONT_SCALE = ['C','C#','D','D#','E', 'F','F#', 'G','G#', 'A','A#', 'B'];
    const OCTAVES = ['2','3','4','5','6','7'];
    for(let i = 0; i<OCTAVES.length; i++){
      for(let v = 0; v<FRONT_SCALE.length; v++){
        this.notes.push(FRONT_SCALE[v].concat(OCTAVES[i]))
      }
    }
  };
}
