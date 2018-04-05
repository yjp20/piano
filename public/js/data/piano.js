
/*
function setpsynthPiano() {
     psynth = new Tone.Sampler({
      'A0' : 'A0.[mp3|ogg]',
      'C1' : 'C1.[mp3|ogg]',
      'D#1' : 'Ds1.[mp3|ogg]',
      'F#1' : 'Fs1.[mp3|ogg]',
      'A1' : 'A1.[mp3|ogg]',
      'C2' : 'C2.[mp3|ogg]',
      'D#2' : 'Ds2.[mp3|ogg]',
      'F#2' : 'Fs2.[mp3|ogg]',
      'A2' : 'A2.[mp3|ogg]',
      'C3' : 'C3.[mp3|ogg]',
      'D#3' : 'Ds3.[mp3|ogg]',
      'F#3' : 'Fs3.[mp3|ogg]',
      'A3' : 'A3.[mp3|ogg]',
      'C4' : 'C4.[mp3|ogg]',
      'D#4' : 'Ds4.[mp3|ogg]',
      'F#4' : 'Fs4.[mp3|ogg]',
      'A4' : 'A4.[mp3|ogg]',
      'C5' : 'C5.[mp3|ogg]',
      'D#5' : 'Ds5.[mp3|ogg]',
      'F#5' : 'Fs5.[mp3|ogg]',
      'A5' : 'A5.[mp3|ogg]',
      'C6' : 'C6.[mp3|ogg]',
      'C6' : 'C6.[mp3|ogg]',
      'D#6' : 'Ds6.[mp3|ogg]',
      'F#6' : 'Fs6.[mp3|ogg]',
      'A6' : 'A6.[mp3|ogg]',
      'C7' : 'C7.[mp3|ogg]',
      'D#7' : 'Ds7.[mp3|ogg]',
      'F#7' : 'Fs7.[mp3|ogg]',
      'A7' : 'A7.[mp3|ogg]',
      'C8' : 'C8.[mp3|ogg]'
    }, {
      'release' : 1,
      'baseUrl' : './audio/salamander/',
      'onload':setbsynthPiano()
  }).toMaster();
};

function setpsynthGuitar() {
  psynth = new Tone.Sampler({
    'A3': 'A3.mp3',
    'B2': 'B2.mp3',
    'B3': 'B3.mp3',
    'B4': 'B4.mp3',
    'C#3': 'Cs3.mp3',
    'C#4': 'Cs4.mp3',
    'D#4': 'Ds4.mp3',
    'D3': 'D3.mp3',
    'D5': 'D5.mp3',
    'E2': 'E2.mp3',
    'E4': 'E4.mp3',
    'F2': 'F2.mp3',
    'C6': 'C6.mp3',
    }, {
    'release': 1,
    'baseUrl': './audio/guitar/',
    'onload': setbsynthGuitar()
 }).toMaster();
};



function setpsynthViolin() {
  psynth = new Tone.Sampler({
    'A6': 'A6.mp3',
    'B3': 'B3.mp3',
    'B5': 'B5.mp3',
    'C4': 'C4.mp3',
    'C5': 'C5.mp3',
    'C6': 'C6.mp3',
    'D4': 'D4.mp3',
    'D6': 'D6.mp3',
    'D7': 'D7.mp3',
    'E4': 'E4.mp3',
    'E5': 'E5.mp3',
    'E6': 'E6.mp3',
    'F4': 'F4.mp3',
    'F5': 'F5.mp3',
    'F7': 'F7.mp3',
    'G3': 'G3.mp3',
    'G4': 'G4.mp3',
    'G6': 'G6.mp3',
    'G7': 'G7.mp3'
    }, {
    'release': 2,
    'baseUrl': './audio/violin/',
    'onload':setbsynthViolin()
 }).toMaster();
};

function setbsynthPiano() {
     bsynth = new Tone.Sampler({
      'A0' : 'A0.[mp3|ogg]',
      'C1' : 'C1.[mp3|ogg]',
      'D#1' : 'Ds1.[mp3|ogg]',
      'F#1' : 'Fs1.[mp3|ogg]',
      'A1' : 'A1.[mp3|ogg]',
      'C2' : 'C2.[mp3|ogg]',
      'D#2' : 'Ds2.[mp3|ogg]',
      'F#2' : 'Fs2.[mp3|ogg]',
      'A2' : 'A2.[mp3|ogg]',
      'C3' : 'C3.[mp3|ogg]',
      'D#3' : 'Ds3.[mp3|ogg]',
      'F#3' : 'Fs3.[mp3|ogg]',
      'A3' : 'A3.[mp3|ogg]',
      'C4' : 'C4.[mp3|ogg]',
      'D#4' : 'Ds4.[mp3|ogg]',
      'F#4' : 'Fs4.[mp3|ogg]',
      'A4' : 'A4.[mp3|ogg]',
      'C5' : 'C5.[mp3|ogg]',
      'D#5' : 'Ds5.[mp3|ogg]',
      'F#5' : 'Fs5.[mp3|ogg]',
      'A5' : 'A5.[mp3|ogg]',
      'C6' : 'C6.[mp3|ogg]',
      'C6' : 'C6.[mp3|ogg]',
      'D#6' : 'Ds6.[mp3|ogg]',
      'F#6' : 'Fs6.[mp3|ogg]',
      'A6' : 'A6.[mp3|ogg]',
      'C7' : 'C7.[mp3|ogg]',
      'D#7' : 'Ds7.[mp3|ogg]',
      'F#7' : 'Fs7.[mp3|ogg]',
      'A7' : 'A7.[mp3|ogg]',
      'C8' : 'C8.[mp3|ogg]'
    }, {
      'release' : 1,
      'baseUrl' : './audio/salamander/',
      'onload': function(){bsynth.volume.value = psynth.volume.value - 10;}
  }).toMaster();
};

function setbsynthGuitar() {
  bsynth = new Tone.Sampler({
    'A3': 'A3.mp3',
    'B2': 'B2.mp3',
    'B3': 'B3.mp3',
    'B4': 'B4.mp3',
    'C#3': 'Cs3.mp3',
    'C#4': 'Cs4.mp3',
    'D#4': 'Ds4.mp3',
    'D3': 'D3.mp3',
    'D5': 'D5.mp3',
    'E2': 'E2.mp3',
    'E4': 'E4.mp3',
    'F2': 'F2.mp3',
    'C6': 'C6.mp3',
    }, {
    'release': 1,
    'baseUrl': './audio/guitar/',
    'onload': function() {bsynth.volume.value = psynth.volume.value -10}
 }).toMaster();
};



function setbsynthViolin() {
  bsynth = new Tone.Sampler({
    'A6': 'A6.mp3',
    'B3': 'B3.mp3',
    'B5': 'B5.mp3',
    'C4': 'C4.mp3',
    'C5': 'C5.mp3',
    'C6': 'C6.mp3',
    'D4': 'D4.mp3',
    'D6': 'D6.mp3',
    'D7': 'D7.mp3',
    'E4': 'E4.mp3',
    'E5': 'E5.mp3',
    'E6': 'E6.mp3',
    'F4': 'F4.mp3',
    'F5': 'F5.mp3',
    'F7': 'F7.mp3',
    'G3': 'G3.mp3',
    'G4': 'G4.mp3',
    'G6': 'G6.mp3',
    'G7': 'G7.mp3'
    }, {
    'release': 2,
    'baseUrl': './audio/violin/',
    'onload': function()  {bsynth.volume.value = psynth.olume.value -10;}
 }).toMaster();
};
setpsynthPiano();
*/
