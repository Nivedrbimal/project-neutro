


// ------ Customize ------
function updateColor(varName, color) {
  def.root.style.setProperty(varName, color);
}
window.addEventListener('load', () => {
  ['accent1', 'accent2', 'background1', 'background2', 'accent5', 'accent6'].forEach(key => {
    const value = localStorage.getItem(key);
    if (value) {
      const varName =
        key === 'accent1' ? '--accent1' :
        key === 'accent2' ? '--accent2' :
        key === 'background1' ? '--background1' :
        key === 'background2' ? '--background2' :
        key === 'accent5' ? '--accent5' :
        '--accent6';
      updateColor(varName, value);
      const input = document.getElementById(
        key === 'accent5' ? 'card1Picker' :
        key === 'accent6' ? 'card2Picker' :
        key + 'Picker'
      );
      if (input) input.value = value;
    }
  });
});
[def.accent1Picker, def.accent2Picker, def.background1Picker, def.background2Picker, def.card1Picker, def.card2Picker].forEach(picker => {
  picker.addEventListener('input', e => {
    const id = e.target.id;
    const varName =
      id === 'accent1Picker' ? '--accent1' :
      id === 'accent2Picker' ? '--accent2' :
      id === 'background1Picker' ? '--background1' :
      id === 'background2Picker' ? '--background2' :
      id === 'card1Picker' ? '--accent5' :
      '--accent6';
    const key =
      id === 'card1Picker' ? 'accent5' :
      id === 'card2Picker' ? 'accent6' :
      id.replace('Picker', '');
    updateColor(varName, e.target.value);
    localStorage.setItem(key, e.target.value);
  });
});
def.accent1Picker.addEventListener('input', (e) => {
  updateColor('--accent1', e.target.value);
  localStorage.setItem('accent1', e.target.value);
});
def.accent2Picker.addEventListener('input', (e) => {
  updateColor('--accent2', e.target.value);
  localStorage.setItem('accent2', e.target.value);
});
def.background1Picker.addEventListener('input', (e) => {
  updateColor('--background1', e.target.value);
  localStorage.setItem('background1', e.target.value);
});
def.background2Picker.addEventListener('input', (e) => {
  updateColor('--background2', e.target.value);
  localStorage.setItem('background2', e.target.value);
});
def.card1Picker.addEventListener('input', (e) => {
  updateColor('--accent5', e.target.value);
  localStorage.setItem('accent5', e.target.value);
});
def.card2Picker.addEventListener('input', (e) => {
  updateColor('--accent6', e.target.value);
  localStorage.setItem('accent6', e.target.value);
});