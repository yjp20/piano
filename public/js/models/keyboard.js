var whitekeys = document.getElementsByClassName("white-key");
var blackkeys = document.getElementsByClassName("black-key");
var allkeys = document.getElementsByTagName("button");
var keymapping;
var pressing = {};
function keyboardInit() {
  document.getElementById('toggleLayoutViewInput').checked = false;
  fillNotesList();
  initKeysFunction();
  addClickListeners();
  setKeyMapping(keymappingPresets[document.getElementById('layoutSelect').value.toLowerCase()]);
  addKeyboardListeners();
}
function addClickListeners() {
  for (var i = 0; i < allkeys.length-3; i ++) {
    allkeys[i].addEventListener('mousedown', function (e) {
      keyDown(e.target);
    });
    allkeys[i].addEventListener('mouseenter', function (e) {
      if (e.buttons%2 == 1) {
        keyDown(e.target);
      }
    });
    allkeys[i].addEventListener('mouseleave', function (e) {
      keyUp(e.target);
    });
    allkeys[i].addEventListener('mouseup', function (e) {
      keyUp(e.target);
    });
  }
  for (var i = 0; i < 3; i++) {
    var pedal = allkeys[allkeys.length-i-1];
    pedal.addEventListener('mousedown', function (e) {
      togglePedal(e.target);
    })
  }
}
function setKeyMapping(array) {
  keymapping = array;
  updateKeyLayout(!document.getElementById('toggleLayoutViewInput').checked);
}
function addKeyboardListeners() {
  document.addEventListener('keydown', function (e) {
    e.preventDefault();
    var key = document.getElementById(keymapping[e.keyCode]);
    try {
      if (!pressing[key.id]) keyDown(document.getElementById(keymapping[e.keyCode]));
    } catch (e) {
      console.log('unmatched key');
    }
  });
  document.addEventListener('keyup', function (e) {
    e.preventDefault();
    try {
      keyUp(document.getElementById(keymapping[e.keyCode]));
    } catch (e) {};
  });
  //volume listener
  var volumeSlider = document.getElementById('volumeSlider');
  volumeSlider.addEventListener('input', function() {
      psynth.volume.value = volumeSlider.value;
      bsynth.volume.value = psynth.volume.value -10;
      console.log(bsynth.volume.value);
    });
  //change layout
  var layoutSelect = document.getElementById('layoutSelect');
  layoutSelect.addEventListener('change', function() {
    setKeyMapping(keymappingPresets[layoutSelect.value.toLowerCase()])
  });
  //change instrument
  var instruSelect = document.getElementById('chooseInstrument');
  instruSelect.addEventListener('change', function() {
    switch(instruSelect.value){
      case 'Piano':
        setpsynthPiano();
        break;
      case 'Guitar':
        setpsynthGuitar();
        break;
      case 'Violin':
        setpsynthViolin();
        break;
    };
  });
  //show keybindings
  document.getElementById('toggleLayoutView').addEventListener('change', function(e) {
    if (!e.target.checked) {
      console.log('remove');
      updateKeyLayout(true);
    } else {
      updateKeyLayout(false);
    }
  });
}
function updateKeyLayout (remove) {
  if (remove) {
    clearKeyText();
    for (var i = 2; i <= 7; i++) {
      document.getElementById('C'+ i).innerHTML = 'C' + i;
    }
  } else {
    clearKeyText();
    for (keycode in keymapping) {
      var editKey = document.getElementById(keymapping[keycode]);
      if (keycodeToText[keycode] == null) {
        editKey.innerHTML = String.fromCharCode(keycode);
      } else {
        editKey.innerHTML = keycodeToText[keycode];
      }
    }
  }
}
function clearKeyText () {
  for (var i = 0; i < allkeys.length; i++) {
    allkeys[i].innerHTML = '';
  }
}
function keyDown(key) {
  key.setAttribute('pressed', '')
  pressing[key.id] = true;
  if(key.id[0] != 'p') {
    pianoKeys[key.id].stop();
    pianoKeys[key.id].play(getPedals());
  } else {
    pedalPressHandler(parseInt(key.id[key.id.length-1])-1);
  }
}
function keyUp(key) {
  key.removeAttribute('pressed');
  delete pressing[key.id];
  if(key.id[0] != 'p') {
    pianoKeys[key.id].stop();
  } else {
    pedalUnpressHandler(parseInt(key.id[key.id.length-1])-1);
  }
}
function togglePedal(object) {
  if (object.getAttribute('pressed') != null) {
    object.removeAttribute('pressed');
    pedalUnpressHandler(parseInt(object.id[object.id.length-1])-1);
  } else {
    object.setAttribute('pressed', '');
  }
}
function getPedals() {
  var returnArray = [];
  if (document.getElementById('pedal_1').getAttribute('pressed') != null) {
    returnArray[0] = true;
  } else {
    returnArray[0] = false;
  }
  if (document.getElementById('pedal_2').getAttribute('pressed') != null) {
    returnArray[1] = true;
  } else {
    returnArray[1] = false;
  }
  if (document.getElementById('pedal_3').getAttribute('pressed') != null) {
    returnArray[2] = true;
  } else {
    returnArray[2] = false;
  }
  return returnArray;
}
keyboardInit();
