# 💍 Kaustubh & Drishti — Wedding Invitation Website

A lavender × gold Indian wedding electronic invitation.  
**11 – 12 December 2026 · Kaara, Gurugram**

---

## ✨ Features

| Feature | Status |
|---|---|
| Fancy Indian aesthetic (gradient hero, mandala SVG, paisley pattern tiles) | ✅ |
| Animated falling petals | ✅ |
| Live countdown to 11 Dec 2026 | ✅ |
| Full-screen sticky navigation with mobile hamburger | ✅ |
| Event cards by day (Day 1 & Day 2) with dress-code chips | ✅ |
| Dress Code modal | ✅ |
| Our Story section | ✅ |
| Journey photo gallery (6 placeholder slots) | ✅ |
| **YouTube venue video** embed | ✅ |
| **Google Maps** embed with lavender-styled map + gold pin | ✅ |
| Distance guide (Expressway, City, Airport) | ✅ |
| **Book Uber** deep-link button (1 tap to the venue) | ✅ |
| Contact phone links | ✅ |
| **RSVP → Google Sheets** (no backend server) | ✅ |
| **Email alert** to you when someone RSVPs | ✅ |
| **Add to Calendar** (Google, Apple, Outlook, Yahoo) after RSVP | ✅ |
| Background music toggle (♪ button) | ✅ |
| Scroll-reveal waypoint animations | ✅ |
| Fully responsive (mobile, tablet, desktop) | ✅ |
| 100% free hosting via GitHub Pages | ✅ |

---

## 📁 File Structure

```
├── index.html                  ← Main invitation page
├── styles.css                  ← Full lavender×gold Indian theme
├── script.js                   ← All JavaScript
├── Code.gs                     ← Google Apps Script (RSVP backend → Sheets)
├── js/
│   └── vendor/
│       └── ouical.js           ← Add-to-Calendar widget (from inspiration repo)
├── assets/
│   ├── music/
│   │   └── background.mp3      ← "Shut Up and Dance" instrumental
│   └── images/                 ← Your couple/journey photos
└── README.md
```

---

## 🚀 Quick Start

1. Open `index.html` in your browser — everything works locally
2. Complete the 4 one-time setups below before going live

---

## ⚙️ One-Time Setup Steps

### 1. RSVP → Google Sheets

1. Go to [sheets.google.com](https://sheets.google.com) → create a new spreadsheet
2. Open **Extensions → Apps Script**
3. Delete all default code, paste the contents of [`Code.gs`](Code.gs)
4. Change `NOTIFY_EMAIL` to your email address
5. Click **Deploy → New Deployment**:
   - Type: **Web App**
   - Execute as: **Me**
   - Who has access: **Anyone**
6. Copy the **Web App URL**
7. In [`script.js`](script.js), replace:
   ```js
   const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL';
   ```
   with the URL you copied.

RSVPs will now appear in the sheet automatically, and you'll get an email for each one.

---

### 2. Google Maps

1. Get a free API key at [console.cloud.google.com](https://console.cloud.google.com)
   - Enable: **Maps JavaScript API**
   - Restrict the key to your GitHub Pages domain (e.g. `yourusername.github.io`)
2. In `index.html`, replace `YOUR_GOOGLE_MAPS_API_KEY`:
   ```html
   src="https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&callback=initMap"
   ```

---

### 3. YouTube Venue Video

1. Find the YouTube video for Kaara
2. Copy the video ID from the URL (the part after `?v=`)
3. In `index.html`, replace `YOUR_VIDEO_ID`:
   ```html
   src="https://www.youtube.com/embed/YOUR_VIDEO_ID?rel=0&modestbranding=1"
   ```

---

### 4. Background Music

1. Download an instrumental of "Shut Up and Dance" (Walk the Moon)
2. Save as `assets/music/background.mp3`
3. The ♪ button (bottom-right) plays/pauses it

---

## 📸 Adding Journey Photos

Replace the placeholder cards in the **Our Journey** section of `index.html`:
```html
<!-- Replace <div class="journey-placeholder">...</div> with: -->
<img src="assets/images/photo1.jpg" alt="Caption" />
```

---

## 🚀 Deploy to GitHub Pages (Free Hosting)

1. Push this folder to a GitHub repository
2. Go to **Settings → Pages**
3. Source: `main` branch, `/ (root)` folder
4. Live at: `https://yourusername.github.io/repo-name/`

---

## 📅 Event Schedule

| Event | Date & Time | Location |
|---|---|---|
| Mehendi | Fri 11 Dec · 11:30 AM | Poolside, Ground Floor |
| Haldi | Fri 11 Dec · 11:30 AM | Poolside, Ground Floor |
| Sangeet | Fri 11 Dec · 7:00 PM | Hall |
| Engagement | Fri 11 Dec · 7:00 PM | Hall |
| Baraat | Sat 12 Dec · 11:00 AM | Lawn |
| Varmaala ✨ | Sat 12 Dec · 12:35 PM | Lawn |
| Wedding | Sat 12 Dec · 1:00 PM | Lawn |

**RSVP Deadline:** 20 November 2026

---
