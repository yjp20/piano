var pianoKeys = {};
var notesList = [];
var globalNoRelease;

function fillNotesList() {
  var fronts = ['C','C#','D','D#','E', 'F','F#', 'G','G#', 'A','A#', 'B'];
  var octaves = ['2','3','4','5','6','7'];
  for(var i = 0; i<octaves.length; i++){
    for(var v = 0; v<fronts.length; v++){
      notesList.push(fronts[v].concat(octaves[i]))
    }
  }
};


//pianoKey['A3'].playerobject != pianoKey['A4'].playerobject != psynth

function initKeysFunction () {
  for(var i = 0;i<notesList.length;i++){
    pianoKeys[notesList[i]] = {
      altSound: false,
      noRelease: false,
      name: notesList[i],
      play: function(array) {
        this.noRelease = false;
        this.stop();
        if(!array[0]) {
          psynth.triggerAttack(this.name);
        } else {
          bsynth.triggerAttack(this.name);
        };
      },
      stop: function() {
        if(!globalNoRelease) {
          if(!this.noRelease){
            psynth.triggerRelease(this.name);
            bsynth.triggerRelease(this.name);
          };
        }
      }
    }
  }
};

function pedalPressHandler(pedalnum) {
  console.log(pedalnum);
  if(pedalnum == 1) {
    for (note in pressing) {
      pianoKeys[note].noRelease = true;
    }
  }
  if(pedalnum == 2) {
     globalNoRelease = true;
  }
}
function pedalUnpressHandler(pedalnum) {
  console.log(pedalnum);
  if(pedalnum == 1) {
    for (note in pianoKeys) {
      if (pianoKeys[note].noRelease) {
        console.log('stop')
        pianoKeys[note].noRelease = false;
        pianoKeys[note].stop();
      }
    }
  }
  if(pedalnum == 2) {
    globalNoRelease = false;
    for (note in pianoKeys) {
      pianoKeys[note].stop();
    }
  }
};


