class PianoKeyboard {
  constructor() {
    this.pianoKeys = {};
    generateNotesList();
    generatePianoKeys();
  };
  
  function generateNotesList() {
    createNotesList();
    fillNotesList();
  };
  
  function createNotesList() {
    this.notesList = [];
  };
  
  function fillNotesList() {
    const FRONT_SCALE = ['C','C#','D','D#','E', 'F','F#', 'G','G#', 'A','A#', 'B'];
    const OCTAVES = ['2','3','4','5','6','7'];
    for(let i = 0; i<OCTAVES.length; i++){
      for(let v = 0; v<FRONT_SCALE.length; v++){
        notesList.push(FRONT_SCALE[v].concat(OCTAVES[i]))
      }
    }
  };

  function generatePianoKeys() {
    for(let i = 0; i<notesList.length; i++){
      pianoKeys[notesList[i]] = new PianoKey(notesList[i]);
    }
  };
}

