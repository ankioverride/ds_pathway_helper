/* ============================================================
   DS & AI Engineer Pathway — js/auth.js
   Firebase Google Sign-In integration.

   SETUP INSTRUCTIONS:
   1. Go to https://console.firebase.google.com
   2. Create a new project (free Spark plan)
   3. Enable Google Sign-In: Authentication → Sign-in method → Google → Enable
   4. Create Firestore DB: Firestore Database → Create → Test mode
   5. Get your config: Project Settings → Your Apps → Web App
   6. Paste your config values into FIREBASE_CONFIG below
   7. Add this Firestore security rule before going public:
      rules_version = '2';
      service cloud.firestore {
        match /databases/{database}/documents {
          match /progress/{userId} {
            allow read, write: if request.auth != null
                               && request.auth.uid == userId;
          }
        }
      }
   ============================================================ */

const FIREBASE_CONFIG = {
  apiKey:            "YOUR_API_KEY",
  authDomain:        "YOUR_PROJECT.firebaseapp.com",
  projectId:         "YOUR_PROJECT_ID",
  storageBucket:     "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId:             "YOUR_APP_ID"
};

/* ------------------------------------------------------------------
   The functions below are called by app.js.
   They return null/false if Firebase isn't configured yet,
   so the app degrades gracefully to localStorage-only mode.
------------------------------------------------------------------ */

let _auth = null;
let _db   = null;
let _firebaseReady = false;

async function initFirebase() {
  // Check if config has been filled in
  if (FIREBASE_CONFIG.apiKey === 'YOUR_API_KEY') {
    console.info('Firebase not configured — running in guest/localStorage mode.');
    return false;
  }

  try {
    const { initializeApp }   = await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js');
    const { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged }
      = await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js');
    const { getFirestore, doc, getDoc, setDoc }
      = await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js');

    const fbApp = initializeApp(FIREBASE_CONFIG);
    _auth = getAuth(fbApp);
    _db   = getFirestore(fbApp);
    _firebaseReady = true;

    // Expose helpers on the module-level object for app.js to call
    window._fb = { _auth, _db, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, doc, getDoc, setDoc };
    return true;
  } catch (e) {
    console.warn('Firebase init failed:', e);
    return false;
  }
}

async function signInWithGoogle() {
  if (!_firebaseReady || !window._fb) return null;
  const { _auth, GoogleAuthProvider, signInWithPopup } = window._fb;
  return signInWithPopup(_auth, new GoogleAuthProvider());
}

async function signOutUser() {
  if (!_firebaseReady || !window._fb) return;
  const { _auth, signOut } = window._fb;
  return signOut(_auth);
}

async function loadCloudProgress(uid) {
  if (!_firebaseReady || !window._fb) return null;
  try {
    const { _db, doc, getDoc } = window._fb;
    const snap = await getDoc(doc(_db, 'progress', uid));
    return snap.exists() ? (snap.data().checked || {}) : {};
  } catch (e) {
    console.warn('Firestore load failed:', e);
    return null;
  }
}

async function saveCloudProgress(uid, checked) {
  if (!_firebaseReady || !window._fb) return;
  try {
    const { _db, doc, setDoc } = window._fb;
    await setDoc(doc(_db, 'progress', uid), { checked, updatedAt: Date.now() });
  } catch (e) {
    console.warn('Firestore save failed:', e);
  }
}

function onAuthChange(callback) {
  if (!_firebaseReady || !window._fb) return;
  const { _auth, onAuthStateChanged } = window._fb;
  onAuthStateChanged(_auth, callback);
}
