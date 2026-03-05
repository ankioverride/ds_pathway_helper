/* ============================================================
   DS & AI Engineer Pathway — js/progress.js
   Handles localStorage persistence and progress calculations.
   ============================================================ */

const LOCAL_KEY = 'dsai-progress-v1';

/** Load checked state from localStorage */
function loadProgress() {
  try {
    const v = localStorage.getItem(LOCAL_KEY);
    return v ? JSON.parse(v) : {};
  } catch (e) {
    return {};
  }
}

/** Save checked state to localStorage */
function saveProgress(checked) {
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(checked));
  } catch (e) {
    console.warn('Could not save progress to localStorage', e);
  }
}

/** Generate a unique key for a topic */
function topicKey(phaseId, cardIdx, topicIdx) {
  return phaseId + '-' + cardIdx + '-' + topicIdx;
}

/** Count total topics across all phases */
function countAllTopics(data) {
  let n = 0;
  data.forEach(p => p.cards.forEach(c => n += c.topics.length));
  return n;
}

/** Get done/total for a single card */
function getCardProgress(data, checked, phaseId, cardIdx) {
  const card = data.find(p => p.id === phaseId)?.cards[cardIdx];
  if (!card) return { done: 0, total: 0 };
  let done = 0;
  card.topics.forEach((_, ti) => {
    if (checked[topicKey(phaseId, cardIdx, ti)]) done++;
  });
  return { done, total: card.topics.length };
}

/** Get done/total for an entire phase */
function getPhaseProgress(data, checked, phaseId) {
  const phase = data.find(p => p.id === phaseId);
  if (!phase) return { done: 0, total: 0 };
  let done = 0, total = 0;
  phase.cards.forEach((c, ci) => {
    c.topics.forEach((_, ti) => {
      total++;
      if (checked[topicKey(phaseId, ci, ti)]) done++;
    });
  });
  return { done, total };
}
