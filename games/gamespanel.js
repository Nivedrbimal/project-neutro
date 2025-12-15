
// ============== GAMES ===============


// --------- Pi Game ---------
function changePiMode() {
  const piStart = document.getElementById("piStart");
  const piReset = document.getElementById("piReset");
  const piComment = document.getElementById("piComment");
  const mode = document.getElementById("piMode").value;
  const piTestHolder = document.getElementById("piTesterHolder");
  const piPracticeHolder = document.getElementById("piPracticeHolder");
  const piRevealHolder = document.getElementById("piRevealHolder");
  [piTestHolder, piPracticeHolder, piRevealHolder].forEach(el => {
    el.classList.add('piHidden');
    el.classList.remove('piVisible');
  });
  if (mode === 'selectPi') {
    [piTestHolder, piPracticeHolder, piRevealHolder].forEach(el => {
      el.classList.add('piHidden');
      el.classList.remove('piVisible');
    });
    piReset.classList.add('pi-reset-hidden');
    piReset.classList.remove('pi-reset-visible');
    piStart.classList.add('pi-start-hidden');
    piStart.classList.remove('pi-start-visible');
    piComment.classList.add('pi-comment-hidden');
    piComment.classList.remove('pi-comment-visible');
    document.getElementById("piComment").textContent = "";
    document.getElementById("piTestInput").value = "";
  }
  else if (mode === 'testPi') {
    piTestHolder.classList.remove('piHidden');
    piTestHolder.classList.add('piVisible');
    piReset.classList.remove('pi-reset-hidden');
    piReset.classList.add('pi-reset-visible');
    piStart.classList.remove('pi-start-hidden');
    piStart.classList.add('pi-start-visible');
    piComment.classList.remove('pi-comment-hidden');
    piComment.classList.add('pi-comment-visible');
    document.getElementById("piComment").textContent = "";
    document.getElementById("piTestInput").value = "";
  } else if (mode === 'pracPi') {
    piPracticeHolder.classList.remove('piHidden');
    piPracticeHolder.classList.add('piVisible');
    piReset.classList.remove('pi-reset-hidden');
    piReset.classList.add('pi-reset-visible');
    piStart.classList.remove('pi-start-hidden');
    piStart.classList.add('pi-start-visible');
    piComment.classList.remove('pi-comment-hidden');
    piComment.classList.add('pi-comment-visible');
    document.getElementById("piComment").textContent = "";
    document.getElementById("piTestInput").value = "";
  } else {
    piRevealHolder.classList.remove('piHidden');
    piRevealHolder.classList.add('piVisible');
    piReset.classList.add('pi-reset-hidden');
    piReset.classList.remove('pi-reset-visible');
    piStart.classList.add('pi-start-hidden');
    piStart.classList.remove('pi-start-visible');
    piComment.classList.add('pi-comment-hidden');
    piComment.classList.remove('pi-comment-visible');
    document.getElementById("piComment").textContent = "";
    document.getElementById("piTestInput").value = "";
  }
}
function piReset() {
  [document.getElementById("piTesterHolder"), document.getElementById("piPracticeHolder"), document.getElementById("piRevealHolder")].forEach(el => {
    el.classList.add('piHidden');
    el.classList.remove('piVisible');
  });
  document.getElementById("piMode").value = 'selectPi';
  document.getElementById("piReset").classList.add('pi-reset-hidden');
  document.getElementById("piStart").classList.add('pi-start-hidden');
  document.getElementById("piStart").textContent = 'Start';
  document.getElementById("piComment").classList.add('pi-comment-hidden');
  document.getElementById("piComment").classList.remove('pi-comment-visible');
  document.getElementById("piComment").textContent = "";
  document.getElementById("piTestInput").value = "";
  document.getElementById("piInputs").innerHTML = "";
  def.piIndex = 0;
  def.mistakesAllowed = 3;
}
function piStart() {
  const piStart = document.getElementById("piStart");
  const mode = document.getElementById("piMode").value;
  if (piStart.textContent === 'Start') {
    document.getElementById("piTestInput").disabled = false;
    if (mode === 'testPi') {
      startPiTest();
    }
    else {
      startPiPractice()
    }
    piStart.textContent = 'Restart';
  }
  else {
    piStart.textContent = 'Start';
    document.getElementById("piComment").textContent = "";
    document.getElementById("piTestInput").value = "";
    document.getElementById("piInputs").innerHTML = "";
    document.getElementById("piTestInput").disabled = false;
  }
}
function startPiTest() {
  const piTestInput = document.getElementById("piTestInput");
  const piComment = document.getElementById("piComment");
  let startTime = 0;
  def.piIndex = 0;
  startTime = Date.now();
  piComment.textContent = 'Start typing...';
  piTestInput.value = '';
  piTestInput.focus();
  piTestInput.oninput = () => {
    const val = piTestInput.value;
    if (val[val.length - 1] === def.piGamePi[def.piIndex]) {
      def.piIndex++;
    } else {
      const timeTaken = ((Date.now() - startTime) / 1000).toFixed(2);
      piComment.textContent = `Wrong digit at position ${def.piIndex + 1}. Time: ${timeTaken}s`;
      piTestInput.disabled = true;
      return;
    }
    if (def.piIndex >= def.piGamePi.length) {
      const totalTime = ((Date.now() - startTime) / 1000).toFixed(2);
      piComment.textContent = `Perfect! You typed all ${def.piGamePi.length} digits correctly in ${totalTime}s!`;
      piTestInput.disabled = true;
    }
  };
}
function startPiPractice() {
  def.mistakesAllowed = parseInt(document.getElementById("mistakeLimit").value || '3');
  def.piIndex = 0;
  document.getElementById("piInputs").innerHTML = "";
  createNextPracticeInput();
}
function createNextPracticeInput() {
  const inputContainer = document.getElementById("piInputs");
  const input = document.createElement("input");
  const piComment = document.getElementById("piComment");
  input.type = "text";
  input.inputMode = "numeric";
  input.className = "pi-digit-input";
  input.placeholder = `#${def.piIndex + 1}`;
  piComment.textContent = 'Start typing...';
  input.addEventListener("input", () => {
    const entered = input.value.trim();
    if (entered === "") {
      input.style.borderColor = "";
      return;
    }
    if (!/^\d$/.test(entered)) {
      piComment.textContent = "Please enter a number.";
      input.value = "";
      input.style.borderColor = "orange";
      return;
    }
    if (entered === def.piGamePi[def.piIndex]) {
      input.style.borderColor = "green";
      input.style.transition = "border-color 0.3s";
      def.piIndex++;
      setTimeout(() => {
        input.style.borderColor = "";
        input.disabled = true;
        if (def.piIndex < def.piGamePi.length) createNextPracticeInput();
        else piComment.textContent = `You completed all ${def.piGamePi.length} digits!`;
      }, 300);
    }
    else {
      input.style.borderColor = "red";
      input.style.transition = "border-color 0.3s";
      def.mistakesAllowed--;
      if (def.mistakesAllowed <= 0) {
        piComment.textContent = `You’ve reached the mistake limit. Final digit count: ${def.piIndex}`;
        disableAllInputs();
      } else {
        piComment.textContent = `Oops, you got that one wrong. Mistakes left: ${def.mistakesAllowed}. Try again!`;
      }
    }
  });
  inputContainer.appendChild(input);
  input.focus();
}
function disableAllInputs() {
  document.querySelectorAll(".pi-digit-input").forEach(inp => inp.disabled = true);
}
// -------- Math Quiz ---------
function getSelectedOperations() {
  const ops = [];
  document.querySelectorAll('.operation:checked').forEach(cb => {
    ops.push(cb.value);
  });
  return ops.length > 0 ? ops : ['+'];
}
function fg2_start() {
  const min = def.toNum(document.getElementById('fg_min').value) ?? 0;
  const max = def.toNum(document.getElementById('fg_max').value) ?? 10;
  const opsPer = def.toNum(document.getElementById('fg_ops').value) ?? 1;
  const n = def.toNum(document.getElementById('fg_n').value) ?? 5;

  if (min >= max) {
    document.getElementById('fg2_area').textContent = 'Minimum number must be less than the maximum number.';
    return;
  }

  const allowed = getSelectedOperations();
  def.fg2_state = { min, max, opsPer, n, idx: 0, score: 0, allowed };
  fg2_next();
}
function fg2_reset() {
  def.fg2_state = null;
  document.getElementById('fg2_area').textContent = 'Reset. Configure and press Start.';
}
function randInt(a, b) {
  return Math.floor(Math.random() * (b - a + 1)) + a;
}
function randChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
function makeExpr(min, max, ops, allowedOps) {
  const nums = [];
  for (let i = 0; i < ops + 1; i++) nums.push(randInt(min, max));
  let expr = '' + nums[0];
  for (let i = 0; i < ops; i++) {
    let op = randChoice(allowedOps);
    let val = nums[i + 1];
    if ((op === '÷' || op === '/' || op === '%') && val === 0) val = 1;
    switch (op) {
      case '*':
        op = '×';
        break;
      case '/':
        op = '÷';
        break;
      case '**':
        op = '^';
        break;
    }
    expr += ` ${op} ${val}`;
  }
  return expr;
}
function toggleDropdown() {
  const dd = document.getElementById('operationDropdown');
  if (!dd) return;
  dd.classList.toggle('open');
  const content = document.getElementById('opsContent');
  const toggle = document.getElementById('opsToggle');
  if (dd.classList.contains('open')) {
    content.setAttribute('aria-hidden', 'false');
    toggle.setAttribute('aria-expanded', 'true');
  } else {
    content.setAttribute('aria-hidden', 'true');
    toggle.setAttribute('aria-expanded', 'false');
  }
}
if (def.opsToggle) {
  def.opsToggle.addEventListener('click', toggleDropdown);
  def.opsToggle.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleDropdown(); } });
}
document.addEventListener('click', (e) => {
  const dd = document.getElementById('operationDropdown');
  if (!dd) return;
  if (!dd.contains(e.target)) {
    dd.classList.remove('open');
    document.getElementById('opsContent').setAttribute('aria-hidden', 'true');
    document.getElementById('opsToggle').setAttribute('aria-expanded', 'false');
  }
});
function getSelectedOperations() {
  const boxes = Array.from(document.querySelectorAll('.operation'));
  const ops = boxes.filter(cb => cb.checked).map(cb => cb.value);
  return ops.length ? ops : ['+', '-', '*', '/'];
}
function evalExpr(s) {
  if (!/^[0-9+\-x×÷*/%^().\s]+$/.test(s)) throw new Error('Invalid tokens');
  const safe = s
    .replace(/×|x/g, '*')
    .replace(/÷/g, '/')
    .replace(/\^/g, '**');
  return Function(`"use strict"; return (${safe})`)();
}
function fg2_next() {
  if (!def.fg2_state) return;

  if (def.fg2_state.idx >= def.fg2_state.n) {
    document.getElementById('fg2_area').textContent =
      `Finished! Score: ${def.fg2_state.score}/${def.fg2_state.n}`;
    return;
  }

  const expr = makeExpr(def.fg2_state.min, def.fg2_state.max, def.fg2_state.opsPer, def.fg2_state.allowed);
  let correct;
  try {
    correct = evalExpr(expr);
  } catch (e) {
    return fg2_next();
  }
  correct = Math.round(correct * 100) / 100;

  def.fg2_state.current = { expr, correct };

  const area = document.getElementById('fg2_area');
  area.innerHTML = `
    Q${def.fg2_state.idx + 1}/${def.fg2_state.n}: Solve → ${expr}
    <br><br>
    <input id="fg2_answer" type="number" step="0.01" style="padding:6px 8px;border-radius:6px;border:1px solid rgba(255,255,255,0.03);background:#071219;color:#e6eef6;font-family:var(--mono)"/>
    <button class="btn" onclick="fg2_submit()">Submit</button>
  `;

  const ansInput = document.getElementById('fg2_answer');
  if (ansInput) ansInput.focus();
}
function fg2_submit() {
  const ansInput = document.getElementById('fg2_answer');
  const ans = ansInput ? Number(ansInput.value) : NaN;

  const correct = Math.round(def.fg2_state.current.correct * 100) / 100;
  const ok = Math.abs(ans - correct) < 1e-9;

  if (ok) def.fg2_state.score++;
  def.fg2_state.idx++;

  document.getElementById('fg2_area').textContent =
    (ok ? 'Correct! ' : 'Incorrect. ') + `Answer: ${def.fmt(correct)}`;

  setTimeout(fg2_next, 2000);
}
document.addEventListener('DOMContentLoaded', () => {
  if (def.opsToggle && def.opsContent) {
    def.opsToggle.addEventListener('click', () => {
      const expanded = def.opsToggle.getAttribute('aria-expanded') === 'true';
      def.opsToggle.setAttribute('aria-expanded', !expanded);
      def.opsContent.setAttribute('aria-hidden', expanded);
      def.opsContent.classList.toggle('show');
    });
  }
});

// ---------- Number Guessing ----------

function ng_start() {
  def.ng_secret = randInt(1, 100); def.ng_tries = 0; document.getElementById('ng_out').textContent = 'I picked a number 1–100. Start guessing!';
}
function ng_try() {
  const g = def.toNum(document.getElementById('ng_guess').value);
  if (g === null) return;
  def.ng_tries++;
  if (g === def.ng_secret) { document.getElementById('ng_out').textContent = `🎉 You got it in ${def.ng_tries} tries!`; def.ng_secret = null; }
  else if (g < def.ng_secret) document.getElementById('ng_out').textContent = 'Too low.';
  else document.getElementById('ng_out').textContent = 'Too high.';
}

