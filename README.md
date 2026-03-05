# 🧠 Data Science & AI Engineer Pathway

A complete, interactive 6-month roadmap to go from Python developer to production-ready AI Engineer.

## Features

- ✅ **Expandable topic cards** with descriptions, topic checklists & curated resources
- 📊 **Progress tracking** — per-topic checkboxes, per-card pills, per-phase bars, global sticky bar
- 💾 **Persistent state** — saves automatically to `localStorage` (works offline, no account needed)
- 🔥 **Optional Firebase login** — sign in with Google to sync progress across devices
- 📱 **Responsive** — works on desktop and mobile

---

## Project Structure

```
dsai-pathway/
├── index.html          ← Main HTML page (edit meta tags, OG image)
├── css/
│   └── styles.css      ← All styles (colours, layout, components)
├── js/
│   ├── app.js          ← Main app logic (UI builder, event handlers)
│   ├── auth.js         ← Firebase auth integration (fill in your config)
│   └── progress.js     ← localStorage helpers & progress calculations
├── data/
│   └── curriculum.js   ← All phases, cards, topics & resources (edit here!)
└── README.md
```

---

## Quick Start (Local)

Just open `index.html` in any browser. No build step, no server needed for basic use.

```bash
# Or serve with any static server:
npx serve .
python -m http.server 8000
```

---

## Hosting (Free)

### Option A — Vercel (recommended)
1. Push this folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com) → Import project → select your repo
3. Click Deploy — done. Vercel auto-deploys on every push.

### Option B — Netlify
1. Drag and drop this folder to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Done in 30 seconds.

### Option C — GitHub Pages
1. Push to a GitHub repo
2. Settings → Pages → Deploy from branch (main / root)

---

## Firebase Login Setup (Optional)

Enables Google Sign-In so any visitor can save their progress in the cloud.

### Step 1 — Create Firebase project
1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Click **Add project** → follow the wizard (disable Analytics if you want)

### Step 2 — Enable Google Sign-In
Firebase Console → **Authentication** → **Sign-in method** → **Google** → Enable

### Step 3 — Create Firestore database
Firebase Console → **Firestore Database** → **Create database** → **Start in test mode**

### Step 4 — Get your config
Project Settings → **Your Apps** → **Add Web App** → copy the `firebaseConfig` object

### Step 5 — Paste into auth.js
Open `js/auth.js` and replace the `FIREBASE_CONFIG` placeholder values:

```js
const FIREBASE_CONFIG = {
  apiKey:            "AIza...",
  authDomain:        "your-project.firebaseapp.com",
  projectId:         "your-project-id",
  storageBucket:     "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId:             "1:123:web:abc..."
};
```

### Step 6 — Add Firestore security rule
Before going public, replace the test-mode rule in Firebase Console → Firestore → Rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /progress/{userId} {
      allow read, write: if request.auth != null
                         && request.auth.uid == userId;
    }
  }
}
```

### Step 7 — Add your domain to authorized origins
Firebase Console → Authentication → Settings → **Authorized domains** → Add your domain.

---

## Customising the Curriculum

All content lives in `data/curriculum.js`. Edit the `CURRICULUM` array to:
- Add new phases
- Add/remove cards within a phase
- Edit topic lists
- Update or add resources

Each card follows this structure:
```js
{
  emoji: "🧠",
  title: "Card Title",
  subtitle: "One-line description shown when collapsed",
  tag: "Core",          // Label shown on the card (Essential/Core/Advanced/etc.)
  desc: "Full paragraph description shown when expanded.",
  topics: ["Topic 1", "Topic 2", ...],
  resources: [
    { icon: "🎥", name: "Resource Name", type: "YouTube", url: "https://..." },
  ]
}
```

---

## Adding Google AdSense

Once approved for AdSense, add your script in `index.html`:

```html
<!-- In <head> -->
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossorigin="anonymous"></script>

<!-- Ad unit (e.g. between header and sticky bar) -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
     data-ad-slot="XXXXXXXXXX"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
```

Recommended placements:
- Below the header, above the sticky progress bar
- Between Phase 2 and Phase 3 (natural scroll break)

---

## License

MIT — use it, share it, build on it.
