# Seylon — Website Project

Bespoke Sri Lanka travel curation platform.
Built for Claude Code development.

---

## Project Structure

```
seylon/
├── index.html              # Homepage
├── README.md               # This file
│
├── pages/
│   ├── journeys.html       # All three journey types
│   ├── contact.html        # Contact form + inquiry
│   ├── about.html          # About Seylon (TODO)
│   ├── how-it-works.html   # Process page (TODO)
│   └── _nav.html           # Nav HTML snippet (reference only)
│
├── css/
│   ├── main.css            # Core styles, variables, components
│   ├── nav.css             # Navigation & mobile menu
│   └── modal.css           # Quiz modal overlay
│
├── js/
│   ├── main.js             # Nav scroll, fade animations, mobile menu
│   └── quiz.js             # Full quiz logic, persona detection, results
│
└── assets/
    ├── images/             # Photography (add here)
    └── fonts/              # Custom fonts if needed
```

---

## Brand

- **Name:** Seylon
- **Tagline:** "The island as it was meant to be discovered."
- **Primary colour:** Forest `#0e1a14`
- **Accent:** Gold `#c8b97a`
- **Fonts:** Cormorant Garamond (display) · Jost (body)

---

## Pages to Build Next

- [ ] `pages/about.html` — founder story, brand values
- [ ] `pages/how-it-works.html` — detailed process page
- [ ] `pages/itinerary.html` — sample 10-day Private Ceylon
- [ ] `pages/blog/` — travel stories & destination guides

---

## Key CSS Variables (in `css/main.css`)

```css
--forest:    #0e1a14   /* primary background */
--jungle:    #1a3d26   /* secondary background */
--gold:      #c8b97a   /* brand accent */
--parchment: #f5f0e8   /* light background */
--sand:      #e8e0d0   /* primary text on dark */
--spice:     #993c1d   /* CTA / alert */
```

---

## JS Architecture

- `main.js` — initialises on DOMContentLoaded. Handles nav scroll, fade-up observer, mobile menu, escape key.
- `quiz.js` — self-contained quiz module. State managed in `quizState` object. Persona detection via `detectPersona()`. Call `openQuiz()` from anywhere.

---

## Contact Form

Currently uses a JS simulation. To go live, replace `handleSubmit()` in `contact.html` with one of:
- **Formspree:** `action="https://formspree.io/f/YOUR_ID"` on the form
- **Netlify Forms:** add `data-netlify="true"` to the form tag
- **EmailJS:** free tier, 200 emails/month

---

## Deployment

1. Drop the entire `seylon/` folder into [netlify.com/drop](https://netlify.com/drop)
2. Or push to GitHub and connect to Netlify for auto-deploy
3. Custom domain: add in Netlify → Domain Settings

---

## Email to update

Search and replace `hello@seylon.co` with your real email across all files before going live.
# Seylon
