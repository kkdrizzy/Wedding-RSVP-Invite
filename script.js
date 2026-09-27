/* ═══════════════════════════════════════════════════════════
   KAUSTUBH & DRISHTI — WEDDING INVITATION
   script.js  —  All interactive features
   ═══════════════════════════════════════════════════════════ */

/* ─── 0. ENVELOPE INTRO ──────────────────────────────────── */
(function initEnvelope() {
  const screen = document.getElementById('envelope-screen');
  if (!screen) return;

  // Prevent scrolling while envelope is shown
  document.body.style.overflow = 'hidden';

  function openEnvelope() {
    // Step 1: flap opens + seal shrinks + letter rises
    screen.classList.add('flap-open');

    // Step 2: after 1.4s fade out the whole screen
    setTimeout(() => {
      screen.classList.add('open-complete');
      document.body.style.overflow = '';
    }, 1400);
  }

  screen.addEventListener('click', openEnvelope);
  screen.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openEnvelope(); });
})();

/* ─── 1. COUNTDOWN — target 11 Dec 2026 11:30 IST ──────────*/
(function initCountdown() {
  const TARGET = new Date('2026-12-11T11:30:00+05:30').getTime();
  const els = {
    days:  document.getElementById('cd-days'),
    hours: document.getElementById('cd-hours'),
    mins:  document.getElementById('cd-mins'),
    secs:  document.getElementById('cd-secs'),
  };
  function pad(n) { return String(n).padStart(2, '0'); }
  function tick() {
    const diff = TARGET - Date.now();
    if (diff <= 0) { Object.values(els).forEach(e => e && (e.textContent = '00')); return; }
    els.days.textContent  = pad(Math.floor(diff / 86400000));
    els.hours.textContent = pad(Math.floor(diff % 86400000 / 3600000));
    els.mins.textContent  = pad(Math.floor(diff % 3600000  / 60000));
    els.secs.textContent  = pad(Math.floor(diff % 60000    / 1000));
  }
  tick(); setInterval(tick, 1000);
})();

/* ─── 4. STICKY NAV + ACTIVE LINKS ─────────────────────────*/
(function initNav() {
  const nav    = document.getElementById('navigation');
  const toggle = document.querySelector('.nav-toggle');
  const drawer = document.querySelector('.header-nav');
  const links  = document.querySelectorAll('.primary-nav a[href^="#"]');
  const sections = Array.from(links).map(l => document.querySelector(l.getAttribute('href'))).filter(Boolean);

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
    let cur = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 90) cur = '#' + s.id; });
    links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === cur));
  }, { passive: true });

  toggle.addEventListener('click', () => {
    const open = drawer.classList.toggle('open');
    toggle.classList.toggle('active', open);
    toggle.setAttribute('aria-expanded', open);
  });
  // Close nav on link click (mobile)
  document.querySelectorAll('.header-nav a').forEach(a => {
    a.addEventListener('click', () => {
      drawer.classList.remove('open');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', false);
    });
  });
})();

/* ─── 5. SMOOTH SCROLL ──────────────────────────────────────*/
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ─── 6. MUSIC TOGGLE ───────────────────────────────────────*/
(function initMusic() {
  const btn   = document.getElementById('musicBtn');
  const audio = document.getElementById('bgMusic');
  audio.volume = 0.3;
  let playing = false;
  if (!btn) return;

  function startMusic() {
    audio.play().then(() => { btn.classList.add('playing'); playing = true; }).catch(() => {});
  }

  // Auto-start on first user interaction anywhere on the page
  function onFirstInteraction() {
    document.removeEventListener('click',   onFirstInteraction);
    document.removeEventListener('scroll',  onFirstInteraction);
    document.removeEventListener('keydown', onFirstInteraction);
    if (!playing) startMusic();
  }
  document.addEventListener('click',   onFirstInteraction);
  document.addEventListener('scroll',  onFirstInteraction);
  document.addEventListener('keydown', onFirstInteraction);

  // Music toggle button
  btn.addEventListener('click', e => {
    e.stopPropagation(); // don't double-trigger onFirstInteraction
    if (playing) {
      audio.pause();
      btn.classList.remove('playing');
      playing = false;
    } else {
      startMusic();
    }
  });
})();

/* ─── 7. STORY CAROUSEL DOTS ────────────────────────────────*/
(function initStoryCarousel() {
  const grid = document.querySelector('.story-grid');
  const dots = document.querySelectorAll('.story-dot');
  if (!grid || !dots.length) return;
  // only wire up when the carousel layout is active
  const mq = window.matchMedia('(max-width: 900px)');
  function updateDot() {
    if (!mq.matches) return;
    const idx = Math.round(grid.scrollLeft / grid.offsetWidth);
    dots.forEach((d, i) => d.classList.toggle('active', i === idx));
  }
  dots[0].classList.add('active'); // first dot active by default
  grid.addEventListener('scroll', updateDot, { passive: true });
  mq.addEventListener('change', () => { if (mq.matches) updateDot(); });
  // dot click → scroll to that slide
  dots.forEach((d, i) => {
    d.addEventListener('click', () => grid.scrollTo({ left: i * grid.offsetWidth, behavior: 'smooth' }));
  });
})();

/* ─── 8. PETAL ANIMATION ────────────────────────────────────*/
(function initPetals() {
  const canvas = document.getElementById('petals-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const COLORS = [
    'rgba(212,140,60,.45)',  /* marigold orange */
    'rgba(232,196,80,.42)',  /* gold */
    'rgba(200,90,100,.38)',  /* rose */
    'rgba(245,210,140,.50)', /* pale gold */
    'rgba(228,168,100,.40)', /* warm amber */
    'rgba(255,220,180,.35)', /* soft peach */
  ];
  let W, H, petals = [];
  const N = 36;
  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
  function mkPetal(fromTop = false) {
    return {
      x: Math.random() * (W || 800),
      y: fromTop ? -20 : Math.random() * (H || 600),
      r: 4 + Math.random() * 7,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      vx: (Math.random() - .5) * .6,
      vy: .4 + Math.random() * .8,
      rot: Math.random() * Math.PI * 2,
      vrot: (Math.random() - .5) * .03,
      wob: Math.random() * Math.PI * 2,
      wobS: .015 + Math.random() * .02,
    };
  }
  function draw(p) {
    ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot);
    ctx.beginPath(); ctx.ellipse(0, 0, p.r, p.r * 1.7, 0, 0, Math.PI * 2);
    ctx.fillStyle = p.color; ctx.fill(); ctx.restore();
  }
  function loop() {
    ctx.clearRect(0, 0, W, H);
    petals.forEach((p, i) => {
      p.wob += p.wobS; p.x += p.vx + Math.sin(p.wob) * .4; p.y += p.vy; p.rot += p.vrot;
      if (p.y > H + 20 || p.x < -30 || p.x > W + 30) petals[i] = mkPetal(true);
      draw(p);
    });
    requestAnimationFrame(loop);
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });
  for (let i = 0; i < N; i++) petals.push(mkPetal(false));
  loop();
})();

/* ─── 8. WAYPOINT SCROLL REVEAL ────────────────────────────*/
(function initWaypoints() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('wp-visible'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.wp1,.wp2,.wp2b,.wp3,.wp4,.wp5,.wp6,.wp7').forEach(el => io.observe(el));
})();

/* ─── 9. MODALS ─────────────────────────────────────────────*/
(function initModals() {
  document.querySelectorAll('[data-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = 'modal-' + btn.dataset.modal;
      document.getElementById(id)?.classList.add('open');
    });
  });
  document.querySelectorAll('[data-modal-close]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = 'modal-' + btn.dataset.modalClose;
      document.getElementById(id)?.classList.remove('open');
    });
  });
  // Close on backdrop click
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', e => { if (e.target === overlay) overlay.classList.remove('open'); });
  });
})();

/* ─── 10. ADD-TO-CALENDAR (ouical.js) ──────────────────────
   Shown after RSVP success. Supports Google, iCal, Outlook, Yahoo.
   ─────────────────────────────────────────────────────────── */
function buildCalendarWidget() {
  const container = document.getElementById('add-to-cal');
  if (!container || typeof createCalendar !== 'function') return;
  container.innerHTML = '';          // clear any previous render
  const cal = createCalendar({
    options: { class: '', id: 'kd-wedding-cal' },
    data: {
      title:       "Kaustubh & Drishti's Wedding",
      start:       new Date('Dec 11, 2026 11:30'),
      end:         new Date('Dec 12, 2026 23:59'),
      address:     'Kaara, Kherki Daula, Gurugram, Haryana 122012',
      description: "Celebrate the wedding of Kaustubh Katti & Drishti Singhal. For queries: +91 93117 68636",
    },
  });
  container.appendChild(cal);       // cal is a DOM element, not a string
}

/* ─── 11. RSVP — Google Sheets via Apps Script ──────────────
   SETUP:
   1. Create a Google Sheet.
   2. In Apps Script editor, paste the Code.gs from this repo and deploy as Web App
      (Execute as: Me, Who can access: Anyone).
   3. Replace GOOGLE_SCRIPT_URL below with your deployed script URL.
   ─────────────────────────────────────────────────────────── */
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw5dJS4ukgi6bxhLPQ19SbyiZu7rt6LFXFMyMamD8YP2-IPux3WJfox0NK7mP1LfSH4/exec';

(function initRSVP() {
  const form    = document.getElementById('rsvp-form');
  const btn     = document.getElementById('rsvpBtn');
  const alertEl = document.getElementById('rsvp-alert');

  if (!form) return;

  function showAlert(msg, type) {
    alertEl.textContent = msg;
    alertEl.className   = 'alert-' + type;
  }

  form.addEventListener('submit', async e => {
    e.preventDefault();

    // Basic validation
    const name  = form.querySelector('[name="name"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const attending = form.querySelector('[name="attending"]:checked');
    const side      = form.querySelector('[name="side"]:checked');
    const guests = form.querySelector('[name="guests"]').value;
    if (!name || !email) { showAlert('Please enter your name and email.', 'error'); return; }
    if (!attending)      { showAlert('Please select if you are attending.', 'error'); return; }
    if (!side)           { showAlert('Please select Groom\'s Side or Bride\'s Side.', 'error'); return; }
    if (!guests || guests < 1) { showAlert('Please enter the number of guests.', 'error'); return; }

    btn.disabled    = true;
    btn.innerHTML   = '<i class="fa-solid fa-spinner fa-spin"></i> &nbsp; Sending…';
    showAlert('Just a second — saving your RSVP…', 'loading');

    // Gather form data
    const events = Array.from(form.querySelectorAll('[name="events"]:checked')).map(c => c.value).join(', ');
    const payload = {
      name,
      email,
      phone:    form.querySelector('[name="phone"]').value.trim(),
      guests,
      attending: attending.value,
      side:     side.value,
      events,
      message:  form.querySelector('[name="message"]').value.trim(),
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    };

    try {
      // Google Apps Script requires form-encoded POST
      const body = Object.entries(payload)
        .map(([k, v]) => encodeURIComponent(k) + '=' + encodeURIComponent(v))
        .join('&');

      const res = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
        mode: 'no-cors', // required for Apps Script
      });

      // With no-cors we can't read the response — treat any non-throw as success
      alertEl.textContent = '';
      alertEl.className   = '';
      buildCalendarWidget();
      document.getElementById('modal-rsvp-success').classList.add('open');

    } catch (err) {
      showAlert('Something went wrong. Please check your connection and try again.', 'error');
      btn.disabled  = false;
      btn.innerHTML = 'Send RSVP &nbsp;<i class="fa-solid fa-paper-plane"></i>';
    }
  });
})();


