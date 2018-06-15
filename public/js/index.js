import PianoKeyboard from './models/PianoKeyboard';

document.addEventListener('DOMContentLoaded', () => {
  const $keyboard = document.getElementById('keyboard');
  const keyboard = new PianoKeyboard($keyboard);
});
