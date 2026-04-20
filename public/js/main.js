function copyCode(btn) {
  const code = btn.closest('.code-block').querySelector('code').textContent;
  navigator.clipboard.writeText(code).then(() => {
    btn.textContent = 'Copied!';
    setTimeout(() => { btn.textContent = 'Copy'; }, 2000);
  });
}

/* ── Read Aloud (Web Speech API) ── */

var raState = { speaking: false, paused: false, sectionIndex: 0 };

function getSections() {
  return Array.from(document.querySelectorAll('.content-section'));
}

function sectionText(el) {
  var heading = el.querySelector('h2').textContent;
  var body = el.querySelector('.section-body').innerText;
  return heading + '.\n\n' + body;
}

function highlightSection(index) {
  getSections().forEach(function (s, i) {
    s.classList.toggle('reading', i === index);
  });
  var target = document.getElementById('section-' + index);
  if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function updateStatus(msg) {
  var el = document.getElementById('raStatus');
  if (el) el.textContent = msg;
}

function setPauseIcon(paused) {
  var btn = document.getElementById('raPauseBtn');
  if (!btn) return;
  btn.innerHTML = paused
    ? '<i class="ph-duotone ph-play"></i>'
    : '<i class="ph-duotone ph-pause"></i>';
  btn.title = paused ? 'Resume' : 'Pause';
}

function speakSection(index) {
  var sections = getSections();
  if (index >= sections.length) {
    raStop();
    return;
  }
  raState.sectionIndex = index;
  var text = sectionText(sections[index]);
  var heading = sections[index].querySelector('h2').textContent;

  highlightSection(index);
  updateStatus(heading);

  var utter = new SpeechSynthesisUtterance(text);
  utter.rate = 1;
  utter.pitch = 1;

  utter.onend = function () {
    if (raState.speaking && !raState.paused) {
      speakSection(index + 1);
    }
  };

  speechSynthesis.speak(utter);
}

function toggleReadAloud() {
  var btn = document.getElementById('readAloudBtn');
  var bar = document.getElementById('readAloudBar');
  btn.classList.add('active');
  bar.classList.add('visible');

  raState.speaking = true;
  raState.paused = false;
  raState.sectionIndex = 0;
  setPauseIcon(false);
  speakSection(0);
}

function raPause() {
  if (!raState.speaking) return;
  if (raState.paused) {
    speechSynthesis.resume();
    raState.paused = false;
    setPauseIcon(false);
    updateStatus(getSections()[raState.sectionIndex].querySelector('h2').textContent);
  } else {
    speechSynthesis.pause();
    raState.paused = true;
    setPauseIcon(true);
    updateStatus('Paused');
  }
}

function raStop() {
  speechSynthesis.cancel();
  raState.speaking = false;
  raState.paused = false;

  getSections().forEach(function (s) { s.classList.remove('reading'); });
  updateStatus('');

  var btn = document.getElementById('readAloudBtn');
  var bar = document.getElementById('readAloudBar');
  btn.classList.remove('active');
  bar.classList.remove('visible');
}

function raNextSection() {
  if (!raState.speaking) return;
  speechSynthesis.cancel();
  raState.paused = false;
  setPauseIcon(false);
  speakSection(raState.sectionIndex + 1);
}

function raPrevSection() {
  if (!raState.speaking) return;
  speechSynthesis.cancel();
  raState.paused = false;
  setPauseIcon(false);
  speakSection(Math.max(0, raState.sectionIndex - 1));
}
