/* ============================================================
   DS & AI Engineer Pathway — js/app.js
   Main application logic: builds UI, wires events, manages state.
   ============================================================ */

// ── State ─────────────────────────────────────────────────────────────────────
let checked = {};
let currentUser = null;
let saveTimer = null;

// ── Toast ─────────────────────────────────────────────────────────────────────
function showToast(msg, type) {
  const t = document.createElement('div');
  t.className = 'toast' + (type === 'error' ? ' toast-error' : type === 'success' ? ' toast-success' : '');
  t.textContent = msg;
  document.body.appendChild(t);
  requestAnimationFrame(() => t.classList.add('toast-show'));
  setTimeout(() => { t.classList.remove('toast-show'); setTimeout(() => t.remove(), 400); }, 3200);
}

// ── Nudge guest ───────────────────────────────────────────────────────────────
let nudgeShown = false;
function nudgeSignIn() {
  if (nudgeShown || currentUser) return;
  nudgeShown = true;
  setTimeout(() => showToast('💡 Sign in with Google to sync your progress across devices'), 1000);
}

// ── Save (debounced) ──────────────────────────────────────────────────────────
function scheduleSave() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    saveProgress(checked);
    if (currentUser && typeof saveCloudProgress === 'function') {
      saveCloudProgress(currentUser.uid, checked);
    }
  }, 400);
}

// ── Auth UI ───────────────────────────────────────────────────────────────────
function setAuthUI(user) {
  const login  = document.getElementById('auth-login');
  const info   = document.getElementById('auth-info');
  const avatar = document.getElementById('auth-avatar');
  const name   = document.getElementById('auth-name');
  const cloud  = document.getElementById('auth-cloud');

  if (user) {
    login.style.display = 'none';
    info.style.display  = 'flex';
    if (user.photoURL) { avatar.src = user.photoURL; avatar.style.display = 'block'; }
    else avatar.style.display = 'none';
    name.textContent    = user.displayName || user.email || 'Signed in';
    cloud.textContent   = '☁ Synced';
    cloud.className     = 'auth-cloud synced';
  } else {
    login.style.display = 'flex';
    info.style.display  = 'none';
  }
}

// ── Reset sign-in button to default state ─────────────────────────────────────
function resetSignInBtn() {
  const btn = document.getElementById('btn-signin');
  btn.disabled = false;
  btn.innerHTML =
    '<svg width="16" height="16" viewBox="0 0 24 24">' +
      '<path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>' +
      '<path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>' +
      '<path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>' +
      '<path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>' +
    '</svg>Sign in to sync';
}

// ── Progress UI ───────────────────────────────────────────────────────────────
function updateGlobalProgress() {
  const done  = Object.values(checked).filter(Boolean).length;
  const total = countAllTopics(CURRICULUM);
  const pct   = total ? Math.round(done / total * 100) : 0;
  document.getElementById('prog-fill').style.width      = pct + '%';
  document.getElementById('prog-label').textContent     = done + ' / ' + total + ' topics';
  document.getElementById('prog-pct').textContent       = pct + '%';
}

function updateCardProgress(phaseId, cardIdx) {
  const { done, total } = getCardProgress(CURRICULUM, checked, phaseId, cardIdx);
  const pill = document.querySelector('[data-card-prog="' + phaseId + '-' + cardIdx + '"]');
  if (pill) {
    pill.textContent = done + '/' + total;
    pill.classList.toggle('prog-done', done === total && total > 0);
  }
  const el = document.querySelector('[data-card="' + phaseId + '-' + cardIdx + '"]');
  if (el) el.classList.toggle('card-completed', done === total && total > 0);
}

function updatePhaseProgress(phaseId) {
  const { done, total } = getPhaseProgress(CURRICULUM, checked, phaseId);
  const pct = total ? Math.round(done / total * 100) : 0;
  const bar = document.querySelector('[data-phase-prog="' + phaseId + '"]');
  if (bar) {
    bar.querySelector('.phase-prog-fill').style.width     = pct + '%';
    bar.querySelector('.phase-prog-text').textContent     = done + '/' + total;
  }
}

function applyCheckedToUI() {
  CURRICULUM.forEach(phase => {
    phase.cards.forEach((card, ci) => {
      card.topics.forEach((_, ti) => {
        const key = topicKey(phase.id, ci, ti);
        const lbl = document.querySelector('[data-key="' + key + '"]');
        if (lbl) lbl.classList.toggle('ticked', !!checked[key]);
      });
      updateCardProgress(phase.id, ci);
    });
    updatePhaseProgress(phase.id);
  });
  updateGlobalProgress();
}

// ── Resource type filter ──────────────────────────────────────────────────────
function buildResourceFilter(cardEl, resources) {
  // Collect types present in this card
  const types = new Set();
  resources.forEach(r => {
    if (r.icon === '🎥') types.add('video');
    else if (r.icon === '📖') types.add('reading');
    else if (r.icon === '🧑‍💻') types.add('hands-on');
  });
  if (types.size < 2) return; // No filter needed if only one type

  const wrap = document.createElement('div');
  wrap.className = 'res-filter';

  const filters = [{ key: 'all', label: 'All' }];
  if (types.has('video'))    filters.push({ key: 'video',    label: '🎥 Video' });
  if (types.has('reading'))  filters.push({ key: 'reading',  label: '📖 Reading' });
  if (types.has('hands-on')) filters.push({ key: 'hands-on', label: '🧑‍💻 Hands-on' });

  filters.forEach(f => {
    const btn = document.createElement('button');
    btn.className = 'res-filter-btn' + (f.key === 'all' ? ' active' : '');
    btn.textContent = f.label;
    btn.dataset.filter = f.key;
    btn.addEventListener('click', e => {
      e.stopPropagation();
      wrap.querySelectorAll('.res-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const grid = cardEl.querySelector('.resources-grid');
      grid.querySelectorAll('.resource').forEach(r => {
        const icon = r.dataset.restype;
        r.style.display = (f.key === 'all' || icon === f.key) ? '' : 'none';
      });
    });
    wrap.appendChild(btn);
  });
  return wrap;
}

// ── Build timeline DOM ────────────────────────────────────────────────────────
function buildTimeline() {
  const container = document.getElementById('timeline');

  CURRICULUM.forEach((phase, pi) => {
    const phaseEl = document.createElement('div');
    phaseEl.className = 'phase';
    const idx = phase.id === 0 ? '00' : '0' + phase.id;

    phaseEl.innerHTML =
      '<div class="phase-header">' +
        '<span class="phase-index">' + idx + '</span>' +
        '<h2 class="phase-name">' + phase.phase + '</h2>' +
        (phase.id === 0 ? '<span class="phase-ref-badge">quick reference</span>' : '') +
        '<div class="phase-prog-wrap" data-phase-prog="' + phase.id + '">' +
          '<div class="phase-prog-bar"><div class="phase-prog-fill" style="background:' + phase.color + '"></div></div>' +
          '<span class="phase-prog-text">0/0</span>' +
        '</div>' +
        '<span class="phase-weeks">' + phase.weeks + '</span>' +
      '</div>';

    phase.cards.forEach((card, ci) => {
      const cardEl = document.createElement('div');
      cardEl.className = 'card';
      cardEl.dataset.card = phase.id + '-' + ci;
      cardEl.style.setProperty('--c', phase.color);

      // Build topics checklist HTML
      let topicsHTML = '';
      card.topics.forEach((t, ti) => {
        topicsHTML +=
          '<label class="topic-check" data-key="' + topicKey(phase.id, ci, ti) + '">' +
            '<span class="tc-box">' +
              '<svg class="tc-check" viewBox="0 0 12 12" fill="none">' +
                '<polyline points="2,6 5,9 10,3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
              '</svg>' +
            '</span>' +
            '<span class="tc-label">' + t + '</span>' +
          '</label>';
      });

      // Build resources HTML
      let resourcesHTML = '';
      card.resources.forEach(r => {
        let restype = 'hands-on';
        if (r.icon === '🎥') restype = 'video';
        else if (r.icon === '📖') restype = 'reading';
        resourcesHTML +=
          '<a class="resource" href="' + r.url + '" target="_blank" rel="noopener noreferrer" data-restype="' + restype + '">' +
            '<span class="resource-icon">' + r.icon + '</span>' +
            '<div class="resource-info">' +
              '<div class="resource-name">' + r.name + '</div>' +
              '<div class="resource-type">' + r.type + '</div>' +
            '</div>' +
          '</a>';
      });

      cardEl.innerHTML =
        '<div class="card-bar"></div>' +
        '<div class="card-top">' +
          '<div class="card-top-left">' +
            '<div class="card-emoji">' + card.emoji + '</div>' +
            '<div class="card-meta">' +
              '<div class="card-title">' + card.title + '</div>' +
              '<div class="card-subtitle">' + card.subtitle + '</div>' +
            '</div>' +
          '</div>' +
          '<div class="card-right">' +
            '<span class="card-prog-pill" data-card-prog="' + phase.id + '-' + ci + '">0/' + card.topics.length + '</span>' +
            '<span class="tag">' + card.tag + '</span>' +
            '<div class="chevron">' +
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">' +
                '<polyline points="6 9 12 15 18 9"></polyline>' +
              '</svg>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="card-body">' +
          '<div class="card-inner">' +
            '<p class="card-desc-full">' + card.desc + '</p>' +
            '<div class="section-label" style="margin-bottom:12px">Topics — click to mark as studied</div>' +
            '<div class="topics-checklist">' + topicsHTML + '</div>' +
            '<div class="checklist-actions">' +
              '<button class="cl-btn" data-phase="' + phase.id + '" data-card="' + ci + '" data-action="all">Mark all done</button>' +
              '<button class="cl-btn cl-btn-ghost" data-phase="' + phase.id + '" data-card="' + ci + '" data-action="none">Clear</button>' +
            '</div>' +
            '<div class="res-header">' +
              '<div class="section-label">Resources &amp; where to learn it</div>' +
              '<div class="res-filter-slot"></div>' +
            '</div>' +
            '<div class="resources-grid">' + resourcesHTML + '</div>' +
          '</div>' +
        '</div>';

      // Inject resource filter chips
      const filterWrap = buildResourceFilter(cardEl, card.resources);
      if (filterWrap) cardEl.querySelector('.res-filter-slot').appendChild(filterWrap);

      // Expand/collapse
      cardEl.querySelector('.card-top').addEventListener('click', () => cardEl.classList.toggle('open'));

      // Topic checkboxes
      cardEl.querySelectorAll('.topic-check').forEach(label => {
        label.addEventListener('click', e => {
          e.stopPropagation();
          const key = label.dataset.key;
          checked[key] = !checked[key];
          label.classList.toggle('ticked', checked[key]);
          updateCardProgress(phase.id, ci);
          updatePhaseProgress(phase.id);
          updateGlobalProgress();
          scheduleSave();
          nudgeSignIn();
        });
      });

      // Mark all / Clear buttons
      cardEl.querySelectorAll('.cl-btn').forEach(btn => {
        btn.addEventListener('click', e => {
          e.stopPropagation();
          const pid = parseInt(btn.dataset.phase), cid = parseInt(btn.dataset.card);
          const ph  = CURRICULUM.find(p => p.id === pid);
          const c2  = ph && ph.cards[cid];
          if (!c2) return;
          const setTo = btn.dataset.action === 'all';
          c2.topics.forEach((_, ti) => {
            const k = topicKey(pid, cid, ti);
            checked[k] = setTo;
            const lbl = cardEl.querySelector('[data-key="' + k + '"]');
            if (lbl) lbl.classList.toggle('ticked', setTo);
          });
          updateCardProgress(pid, cid);
          updatePhaseProgress(pid);
          updateGlobalProgress();
          scheduleSave();
          nudgeSignIn();
        });
      });

      phaseEl.appendChild(cardEl);
    });

    container.appendChild(phaseEl);

    // Connector dots between phases
    if (pi < CURRICULUM.length - 1) {
      const conn = document.createElement('div');
      conn.className = 'connector';
      conn.innerHTML = '<div class="connector-dot"></div><div class="connector-dot"></div><div class="connector-dot"></div>';
      container.appendChild(conn);
    }
  });
}

// ── Update dynamic stats ───────────────────────────────────────────────────────
function updateStats() {
  const totalResources = CURRICULUM.reduce((sum, p) => sum + p.cards.reduce((s, c) => s + c.resources.length, 0), 0);
  const el = document.getElementById('stat-resources');
  if (el) el.innerHTML = Math.floor(totalResources / 10) * 10 + '<span>+</span>';
}

// ── Boot ──────────────────────────────────────────────────────────────────────
async function boot() {
  // 1. Load local progress and build DOM immediately — no waiting
  checked = loadProgress();
  buildTimeline();
  applyCheckedToUI();
  updateStats();

  // 2. Scroll reveal
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.08 });
  document.querySelectorAll('.phase, #finishCard').forEach(el => io.observe(el));

  // 3. Collapse All button
  document.getElementById('btn-collapse-all').addEventListener('click', () => {
    document.querySelectorAll('.card.open').forEach(c => c.classList.remove('open'));
  });

  // 3b. About modal
  const aboutModal  = document.getElementById('aboutModal');
  const openAbout   = () => { aboutModal.classList.add('open'); document.body.style.overflow = 'hidden'; };
  const closeAbout  = () => { aboutModal.classList.remove('open'); document.body.style.overflow = ''; };
  document.getElementById('btn-about').addEventListener('click', openAbout);
  document.getElementById('btn-modal-close').addEventListener('click', closeAbout);
  aboutModal.addEventListener('click', e => { if (e.target === aboutModal) closeAbout(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && aboutModal.classList.contains('open')) closeAbout(); });

  // 4. Wire sign-in button
  document.getElementById('btn-signin').addEventListener('click', async () => {
    // If Firebase not configured at all, give immediate feedback
    if (typeof firebaseReady === 'function' && !firebaseReady()) {
      showToast('Configure Firebase in js/auth.js to enable sign-in', 'error');
      return;
    }

    const btn = document.getElementById('btn-signin');
    btn.textContent = 'Signing in…';
    btn.disabled = true;

    try {
      const result = await signInWithGoogle();
      if (result === null) {
        // Not configured or blocked silently
        showToast('Configure Firebase in js/auth.js to enable sign-in', 'error');
        resetSignInBtn();
      }
      // On success, onAuthChange callback handles the rest
    } catch (err) {
      if (err.code !== 'auth/popup-closed-by-user') {
        showToast('Sign-in error: ' + (err.code || err.message), 'error');
        console.error('[Firebase Auth]', err);
      }
      resetSignInBtn();
    }
  });

  document.getElementById('btn-signout').addEventListener('click', async () => {
    if (typeof signOutUser === 'function') await signOutUser();
    currentUser = null;
    setAuthUI(null);
    showToast('Signed out — progress saved locally.');
  });

  // 5. Try to init Firebase (async, non-blocking)
  if (typeof initFirebase === 'function') {
    const ok = await initFirebase();
    if (ok && typeof onAuthChange === 'function') {
      onAuthChange(async user => {
        currentUser = user;
        setAuthUI(user);
        if (user) {
          const cloudData = await loadCloudProgress(user.uid);
          if (cloudData !== null) {
            checked = Object.assign({}, loadProgress(), cloudData);
            await saveCloudProgress(user.uid, checked);
          }
          applyCheckedToUI();
          showToast('Welcome back, ' + (user.displayName?.split(' ')[0] || 'there') + '! Progress synced.');
        }
      });
      // Handle redirect-based sign-in result (fires after a signInWithRedirect flow)
      if (typeof checkRedirectResult === 'function') {
        checkRedirectResult().catch(() => {});
      }
    }
  }
}

// Start
document.addEventListener('DOMContentLoaded', boot);
