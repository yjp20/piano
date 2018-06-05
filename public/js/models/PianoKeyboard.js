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
    this.loadInstrument(instruments['piano']);
  };
  _generatePianoKeys(callback) {
    for(let i = 0; i<this.notesListing.length; i++)
      this.pianoKeys[this.notesListing[i]] = new PianoKey(this, this.notesListing[i]);
  };
  _createPedals() {
    this.UnaCordePedal = new UnaCordePedal(this.pianoKeys);
    this.SostenutoPedal = new SostenutoPedal(this.pianoKeys);
    this.SustainPedal = new SustainPedal(this.pianoKeys);
  }
  _addKeyListener() {
    document.addEventListener('keydown', function (e) {
      e.preventDefault();
      let key = this.currentKeymapping[e.keyCode];
      console.log(key);
      if (key != undefined && key[0] != 'p') /* filters pedals */
        this.pianoKeys[key].keyboardDown();
      else if (key != undefined && key[0] == 'p') {
        if (key == 'pedal_1') this.UnaCordePedal.keyboardDown();
        if (key == 'pedal_2') this.SostenutoPedal.keyboardDown();
        if (key == 'pedal_3') this.SustainPedal.keyboardDown();
      }
    }.bind(this));
    document.addEventListener('keyup', function (e) {
      let key = this.currentKeymapping[e.keyCode];
      
      if (key != undefined && key[0] != 'p') /* filters pedals */
        this.pianoKeys[key].keyboardUp();
      else if (key != undefined && key[0] == 'p') {
        if (key == 'pedal_1') this.UnaCordePedal.keyboardUp();
        if (key == 'pedal_2') this.SostenutoPedal.keyboardUp();
        if (key == 'pedal_3') this.SustainPedal.keyboardUp();
      }
    }.bind(this));
  }
  loadInstrument(links) {
    this.audioMain = new WebAudioClient.Sampler(links);
    this.audioSoft = new WebAudioClient.Sampler(links);
  }
  setKeyBindings(assignment) {
    this.currentKeymapping = assignment;

    for (let key in this.pianoKeys) {
      this.pianoKeys[key].setText('');
    }
    for (let code in assignment) {
      let key = assignment[code];
      let value = keyCodeToText(code);
      console.log(key, value)
      if (key[0] != 'p') { /*this filters pedals*/
        this.pianoKeys[key].setText(value);
      }
      if (key[0] == 'p') {
        switch(key) {
          case 'pedal_1':
            this.UnaCordePedal.setText(value);
            break;
          case 'pedal_2':
            this.SostenutoPedal.setText(value);
            break;
          case 'pedal_3':
            this.SustainPedal.setText(value);
            break;
        }
      }
    }
  }
}
