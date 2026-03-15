/* ============================================================
   SEYLON — Quiz JavaScript
   Handles: full quiz modal logic, persona detection, results
   ============================================================ */

/* ── Quiz Data ─────────────────────────────────────────────── */
const QUESTIONS = [
  {
    q:    "What draws you to <em>Sri Lanka?</em>",
    hint: "Choose the one that speaks loudest to you.",
    opts: [
      { t: "Ancient wonder",    d: "Temples, ruins, civilisations older than memory",  k: "cultural"   },
      { t: "Wild & untamed",    d: "Jungle, wildlife, open seas and raw nature",        k: "adventure"  },
      { t: "Slow luxury",       d: "Unhurried mornings, beautiful spaces, no agenda",  k: "luxury"     },
      { t: "Deep connection",   d: "Local families, real food, living the island life", k: "authentic"  },
    ]
  },
  {
    q:    "How do you <em>move through a place?</em>",
    hint: "There is no wrong answer.",
    opts: [
      { t: "Slowly, deeply",    d: "Two or three places, fully understood",            k: "slow"       },
      { t: "Broadly, curiously",d: "North to south, coast to highlands",               k: "broad"      },
      { t: "Spontaneously",     d: "A loose plan, open to what the day offers",        k: "spontaneous"},
      { t: "Purposefully",      d: "Every detail considered in advance",               k: "planned"    },
    ]
  },
  {
    q:    "Who are you <em>travelling with?</em>",
    hint: "This shapes everything — pace, stays, experience type.",
    opts: [
      { t: "My partner",        d: "Romance, privacy, shared wonder",                  k: "couple"     },
      { t: "Just me",           d: "Freedom, serendipity, personal discovery",         k: "solo"       },
      { t: "Close friends",     d: "Laughter, shared meals, group adventure",          k: "friends"    },
      { t: "My family",         d: "Memories for everyone, easy logistics",            k: "family"     },
    ]
  },
  {
    q:    "What is your <em>ideal pace?</em>",
    hint: "Pick the day you'd choose with no obligations.",
    opts: [
      { t: "Dawn hike, long slow lunch, evening veranda",  d: "Unhurried and restorative", k: "slow_pace"     },
      { t: "Three sites, local lunch, afternoon swim",     d: "Energised and full",        k: "full_pace"     },
      { t: "No plan — let the day decide",                 d: "Fluid and free",            k: "open_pace"     },
      { t: "One deep experience, done perfectly",          d: "Quality over quantity",     k: "focused_pace"  },
    ]
  },
  {
    q:    "How long is <em>your journey?</em>",
    hint: "We'll design around what you have — every length has its magic.",
    opts: [
      { t: "5 – 7 days",   d: "A tight, curated highlight",         k: "short"    },
      { t: "8 – 10 days",  d: "The sweet spot — depth and breadth", k: "medium"   },
      { t: "11 – 14 days", d: "The full arc of the island",         k: "long"     },
      { t: "15+ days",     d: "Truly unhurried. Let Ceylon breathe.",k: "extended" },
    ]
  }
];

const PERSONAS = {
  luxury: {
    name: "The Private Ceylon",
    tags: ["Private villa", "Curated dining", "Hidden beaches", "Exclusive access"],
    desc: "A deeply personal journey through the island's most intimate corners — private tea bungalows, secret coastal coves, and unhurried mornings designed entirely around you.",
  },
  cultural: {
    name: "The Ancient Way",
    tags: ["Heritage sites", "Local guides", "Temple circuits", "Cultural immersion"],
    desc: "Walking the ancient routes of Ceylon — from the sacred rock of Sigiriya to the Temple of the Tooth. History not as a spectacle, but as a living, breathing inheritance.",
  },
  adventure: {
    name: "The Untamed Isle",
    tags: ["Wildlife safaris", "Highland trails", "Surf coast", "Wild camps"],
    desc: "Yala at first light. The Knuckles Range at dusk. Arugam Bay's long left-handers. Ceylon in its wildest, most alive form — for those who need to feel the ground beneath their feet.",
  },
  authentic: {
    name: "The Living Ceylon",
    tags: ["Homestays", "Village life", "Local markets", "Family tables"],
    desc: "Not a tour. A belonging. Village kitchens, family tables, spice gardens tended by the same hands for generations. The Sri Lanka that most travellers never find.",
  },
};

/* ── State ─────────────────────────────────────────────────── */
let quizState = {
  current:  0,
  answers:  [],
  selected: null,
};

/* ── Open / Close ──────────────────────────────────────────── */
function openQuiz() {
  quizState = { current: 0, answers: [], selected: null };
  const overlay = document.getElementById('quiz-modal');
  if (!overlay) return;
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  renderQuizQuestion();
}

function closeQuiz() {
  const overlay = document.getElementById('quiz-modal');
  if (!overlay) return;
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

function handleOverlayClick(e) {
  if (e.target === document.getElementById('quiz-modal')) closeQuiz();
}

/* ── Render Question ───────────────────────────────────────── */
function renderQuizQuestion() {
  const { current, answers } = quizState;
  const q = QUESTIONS[current];

  // Show quiz area, hide result
  const quizArea = document.getElementById('modal-quiz-area');
  const resultArea = document.getElementById('modal-result');
  if (quizArea)  quizArea.style.display = 'block';
  if (resultArea) resultArea.classList.remove('show');

  // Title & hint
  const titleEl = document.getElementById('m-title');
  const hintEl  = document.getElementById('m-hint');
  if (titleEl) titleEl.innerHTML = q.q;
  if (hintEl)  hintEl.textContent = q.hint;

  // Progress dots
  const progressEl = document.getElementById('m-progress');
  if (progressEl) {
    progressEl.innerHTML = QUESTIONS.map((_, i) =>
      `<div class="m-prog-dot ${i <= current ? 'active' : ''}"></div>`
    ).join('');
  }

  // Options
  const optionsEl = document.getElementById('m-options');
  if (optionsEl) {
    optionsEl.innerHTML = q.opts.map((opt, i) => `
      <div class="m-opt ${answers[current]?.k === opt.k ? 'sel' : ''}"
           onclick="quizSelectOption(${i})">
        <div class="m-opt__title">${opt.t}</div>
        <div class="m-opt__desc">${opt.d}</div>
      </div>
    `).join('');
  }

  // Restore selection if navigating back
  quizState.selected = answers[current] || null;

  // Back button
  const backBtn = document.getElementById('m-back');
  if (backBtn) {
    backBtn.style.opacity = current === 0 ? '0' : '1';
    backBtn.style.pointerEvents = current === 0 ? 'none' : 'auto';
  }

  // Next button text & state
  const nextBtn = document.getElementById('m-next');
  if (nextBtn) {
    nextBtn.textContent = current === QUESTIONS.length - 1 ? 'See my journey →' : 'Continue →';
    nextBtn.classList.toggle('ready', !!quizState.selected);
  }
}

/* ── Select Option ─────────────────────────────────────────── */
function quizSelectOption(index) {
  quizState.selected = QUESTIONS[quizState.current].opts[index];
  quizState.answers[quizState.current] = quizState.selected;

  document.querySelectorAll('.m-opt').forEach((el, i) => {
    el.classList.toggle('sel', i === index);
  });

  const nextBtn = document.getElementById('m-next');
  if (nextBtn) nextBtn.classList.add('ready');
}

/* ── Navigate ──────────────────────────────────────────────── */
function quizNext() {
  if (!quizState.selected) return;
  quizState.answers[quizState.current] = quizState.selected;

  if (quizState.current < QUESTIONS.length - 1) {
    quizState.current++;
    quizState.selected = quizState.answers[quizState.current] || null;
    renderQuizQuestion();
  } else {
    showQuizResult();
  }
}

function quizBack() {
  if (quizState.current > 0) {
    quizState.current--;
    quizState.selected = quizState.answers[quizState.current] || null;
    renderQuizQuestion();
  }
}

function quizRestart() {
  quizState = { current: 0, answers: [], selected: null };
  renderQuizQuestion();
}

/* ── Persona Detection ─────────────────────────────────────── */
function detectPersona() {
  const keys = quizState.answers.map(a => a?.k).filter(Boolean);
  if (keys.includes('luxury')   || keys.includes('slow_pace')  || keys.includes('couple'))    return 'luxury';
  if (keys.includes('cultural') || keys.includes('planned')    || keys.includes('focused_pace')) return 'cultural';
  if (keys.includes('adventure')|| keys.includes('full_pace'))                                 return 'adventure';
  if (keys.includes('authentic')|| keys.includes('open_pace')  || keys.includes('solo'))      return 'authentic';
  return 'luxury';
}

/* ── Show Result ───────────────────────────────────────────── */
function showQuizResult() {
  const personaKey = detectPersona();
  const persona    = PERSONAS[personaKey];

  // Hide quiz, show result
  const quizArea   = document.getElementById('modal-quiz-area');
  const resultArea = document.getElementById('modal-result');
  if (quizArea)   quizArea.style.display = 'none';
  if (resultArea) resultArea.classList.add('show');

  // Title
  const titleEl = document.getElementById('r-title');
  if (titleEl) {
    const nameParts = persona.name.split(' ');
    titleEl.innerHTML = `${nameParts[0]} <em>${nameParts.slice(1).join(' ')}</em>`;
  }

  // Description
  const descEl = document.getElementById('r-desc');
  if (descEl) descEl.textContent = persona.desc;

  // Tags
  const tagsEl = document.getElementById('r-tags');
  if (tagsEl) {
    tagsEl.innerHTML = persona.tags.map(t => `<span class="tag">${t}</span>`).join('');
  }

  // CTA email link
  const ctaEl = document.getElementById('r-cta');
  if (ctaEl) {
    const subj = encodeURIComponent(`Seylon Journey Inquiry — ${persona.name}`);
    const body = encodeURIComponent(
      `Hello,\n\nI completed the Seylon quiz and my result is: ${persona.name}.\n\nI'd love to learn more about planning this journey.\n\nThank you.`
    );
    ctaEl.href = `mailto:hello@seylon.co?subject=${subj}&body=${body}`;
  }

  // Update progress bar to full
  const progressEl = document.getElementById('m-progress');
  if (progressEl) {
    progressEl.innerHTML = QUESTIONS.map(() =>
      `<div class="m-prog-dot active"></div>`
    ).join('');
  }
}

/* ── Preview Quiz (inline section on homepage) ─────────────── */
function selectPreviewOpt(el) {
  document.querySelectorAll('.quiz-opt').forEach(o => o.classList.remove('sel'));
  el.classList.add('sel');
}
