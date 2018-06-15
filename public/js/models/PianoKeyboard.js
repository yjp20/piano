import PianoKey from './PianoKey';
import UnaCordePedal from './UnaCordePedal';
import SostenutoPedal from './SostenutoPedal';
import SustainPedal from './SustainPedal';
import NotesListing from './NotesListing';
import WebAudioClient from '../wrappers/WebAudioClient.Client';
import keymapping from '../data/keymapping';
import instruments from '../data/instruments';

export default class PianoKeyboard {
  constructor(DOMnode) {
    this.DOMnode = DOMnode;
    this.notesListing = NotesListing.generateNotesListing();
    this.pianoKeys = {};
    this.currentKeymapping = null;
    this._generatePianoKeys(this._createPedals.bind(this));
    this._createPedals();
    this._addKeyListener();
    this.setKeyBindings(keymapping.functional);
    this.loadInstrument(instruments.piano);
    this.option_listener();
  }
  _generatePianoKeys() {
    for (let i = 0; i < this.notesListing.length; i += 1) {
      this.pianoKeys[this.notesListing[i]] = new PianoKey(this, this.notesListing[i]);
    }
  }
  _createPedals() {
    this.UnaCordePedal = new UnaCordePedal(this.pianoKeys);
    this.SostenutoPedal = new SostenutoPedal(this.pianoKeys);
    this.SustainPedal = new SustainPedal(this.pianoKeys);
  }
  _addKeyListener() {
    document.addEventListener('keydown', (e) => {
      e.preventDefault();
      const key = this.currentKeymapping[e.keyCode];
      if (key !== undefined && key[0] !== 'p') {
        this.pianoKeys[key].keyboardDown();
      } else if (key !== undefined && key[0] === 'p') {
        if (key === 'pedal_1') this.UnaCordePedal.keyboardDown();
        if (key === 'pedal_2') this.SostenutoPedal.keyboardDown();
        if (key === 'pedal_3') this.SustainPedal.keyboardDown();
      }
    });
    document.addEventListener('keyup', (e) => {
      const key = this.currentKeymapping[e.keyCode];

      if (key !== undefined && key[0] !== 'p') {
        this.pianoKeys[key].keyboardUp();
      } else if (key !== undefined && key[0] === 'p') {
        if (key === 'pedal_1') this.UnaCordePedal.keyboardUp();
        if (key === 'pedal_2') this.SostenutoPedal.keyboardUp();
        if (key === 'pedal_3') this.SustainPedal.keyboardUp();
      }
    });
  }
  loadInstrument(links) {
    this.audioMain = new WebAudioClient.Sampler(links);
    this.audioSoft = new WebAudioClient.Sampler(links, null, 0.6);
  }
  setKeyBindings(assignment) {
    this.currentKeymapping = assignment;

    Object.values(this.pianoKeys).forEach((pianoKey) => {
      pianoKey.setText('');
    });
    Object.keys(assignment).forEach((code) => {
      const key = assignment[code];
      const value = keymapping.keyCodeToText(code);
      if (key[0] !== 'p') { /* this filters pedals */
        this.pianoKeys[key].setText(value);
      }
      if (key[0] === 'p') {
        switch (key) {
          case 'pedal_1':
            this.UnaCordePedal.setText(value);
            break;
          case 'pedal_2':
            this.SostenutoPedal.setText(value);
            break;
          case 'pedal_3':
            this.SustainPedal.setText(value);
            break;
          default:
            break;
        }
      }
    });
  }
  option_listener() {
    const $keymap = document.getElementById('keymap');
    const $instrument = document.getElementById('instrument');
    $keymap.addEventListener('change', (event) => {
      this.setKeyBindings(keymapping[event.target.value]);
    });
    $instrument.addEventListener('change', (event) => {
      this.loadInstrument(instruments[event.target.value]);
    });
  }
}
