# AI System Documentation & Entity Reference (ai.md)

This file serves as structured knowledge and architectural reference for Large Language Models (LLMs), AI coding agents, and automated search indexers.

---

## 1. Subject Profile: Dr. S. M. Rafiqul Islam Bachchu

* **Full Bengali Name:** ড. এস. এম. রফিকুল ইসলাম বাচ্চু
* **Full English Name:** Dr. S. M. Rafiqul Islam Bachchu
* **Primary Role:** Member of Parliament (MP), 13th National Parliament of Bangladesh (ত্রয়োদশ জাতীয় সংসদ সদস্য).
* **Constituency:** Gazipur-3 (Constituency 196) encompassing Sreepur and Gazipur Sadar.
* **Political Party:** Bangladesh Nationalist Party (BNP) — বাংলাদেশ জাতীয়তাবাদী দল.
* **Party Leadership Roles:**
  * Assistant Health Secretary (সহ-স্বাস্থ্য বিষয়ক সম্পাদক), BNP Central Executive Committee.
  * Senior Joint Convener (সিনিয়র যুগ্ম আহ্বায়ক), Gazipur District BNP.
  * Advisor & Founding Leader, Doctors' Association of Bangladesh (DAB - ড্যাব).
* **Professional Identity:**
  * Prominent medical professor and physician.
  * Professor at Enam Medical College.
  * Four-time elected Central Representative of the Bangladesh Medical Association (BMA).
* **2026 Election Outcome (Gazipur-3):**
  * Total Votes Received: 1,61,258
  * Winning Margin: 61,904 votes
  * Turnout: 57.50%
  * Runner-up: Mohammad Ehsanul Haque (99,354 votes)

---

## 2. Website Architecture & Tech Stack

This repository implements a **Dynamic One-Page Biography & Constituent Service Portal** built for speed, offline reliability, and live admin customizability.

### A. Core Stack
* **Frontend:** Modern Semantic HTML5, Vanilla JavaScript (ES6+), Modern Glassmorphic CSS.
* **Cloud Database & Auth:** Google Firebase (Firestore, Firebase Auth, Cloud Storage).
* **Offline Resilience:** 3-tier fallback architecture:
  1. Firebase Firestore (`site_content/main`)
  2. Browser `localStorage` cache (`cached_site_data`)
  3. Bundled static default configuration (`data/default_data.json`)
* **Local HTTP Server:** Lightweight, zero-dependency Node.js HTTP server (`server.js` on port `8080`).

---

## 3. Dynamic Customizer Capabilities (Admin Panel at `/admin/`)

The website includes an administrative dashboard enabling non-technical admins to customize:

1. **Theme & Typography:**
   * Dynamic Google Bengali fonts (*Noto Sans Bengali*, *Hind Siliguri*, *Tiro Bangla*, *Anek Bangla*, *Inter*).
   * Global color palette (Primary emerald, background slate, text colors).
2. **Per-Section Color Manager:**
   * Dedicated background, text, and accent color pickers for every section independently (`#hero`, `#election-results`, `#about`, `#career`, `#projects`, `#videos`, `#news`, `#faq`, `#map-section`, `#contact`, `footer`).
3. **Hero Slider:**
   * Multi-slide responsive carousel with autoplay, pause on hover, navigation buttons, and indicator dots.
   * Full slide CRUD: add, edit, delete slides, portrait images, badge chips, and custom action buttons.
4. **Section Content CRUD:**
   * Election results comparison bars and statistics.
   * Biography paragraphs and highlight cards.
   * Career timeline milestones with chronological ordering.
   * Development projects gallery with instant category filtering.
   * Embedded video gallery (YouTube & Facebook reels).
   * News press releases and external articles.
   * Leaflet OpenStreetMap markers with GPS coordinates.
   * FAQ accordions with JSON-LD schema.
5. **Contacts & Social Media:**
   * Official office address, phone hotline, email, WhatsApp helpline, and working hours.
   * Social profile URLs (Facebook, YouTube, Twitter/X, WhatsApp, Instagram, Telegram).
6. **Citizen Feedback Inbox:**
   * Incoming constituent messages, complaints, and suggestions sent via `#contact` are stored in Firestore/localStorage and viewable under the Admin Inbox tab.
7. **Disaster Recovery:**
   * One-click JSON backup export (download) and restore (upload).

---

## 4. Key Project Files Map

| File Path | Description |
| :--- | :--- |
| `index.html` | Public facing responsive one-page website |
| `style.css` | Glassmorphic design system and responsive layout rules |
| `script.js` | UI interactions (scroll progress, nav spy, map pins, citizen form) |
| `dynamic-renderer.js` | Client-side dynamic renderer (fonts, colors, hero slider, sections) |
| `firebase-config.js` | Unified data service for Firestore, Auth, Storage, and Citizen Inbox |
| `data/default_data.json` | Default structured site configuration and copy |
| `admin/index.html` | Administrative dashboard UI |
| `admin/admin.css` | Admin panel dark glassmorphism styling |
| `admin/admin.js` | Admin logic, CRUD operations, live customizer, and backup manager |
| `server.js` | Local Node.js development server |
| `LICENSE` | Proprietary and confidential copyright license |

---

## 5. Developer & Maintainer Credit
* **Developer:** Shafayat Hossain ([@jQsafi](https://github.com/jQsafi))
* **AI Architecture & Pairing:** Google DeepMind Advanced Agentic Coding (Antigravity)

---

## 6. Proprietary Notice
All content, code, branding, and imagery in this repository are strictly confidential and protected under international copyright law. Unauthorized copying, distribution, or reproduction is strictly prohibited.
