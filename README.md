# Daniel Ribes - Professional Portfolio Website

[![Live Website](https://img.shields.io/badge/Live-danribes.github.io-0E5468?style=for-the-badge)](https://danribes.github.io)
[![GitHub Pages](https://img.shields.io/badge/Hosted%20on-GitHub%20Pages-222?style=for-the-badge&logo=github)](https://pages.github.com/)

Personal website of Daniel Ribes, Senior Health Economist and AI / GenAI Engineer: HEOR modeling,
HTA submissions, market access and generative-AI systems for evidence work.

**Live site:** [https://danribes.github.io](https://danribes.github.io)

## Content

Content follows the latest CV (`Daniel_Ribes_CV_Oct2026`). Sections, in page order:

- Hero with an illustrative Kaplan–Meier figure (two survival curves and the survival gained between them)
- About
- Expertise: competencies, services, therapeutic areas
- Selected work: case studies, led by the Master's final project *España en escenarios*
- Publications
- Experience
- Education (including the Master's in Data Science & AI, with First-class Honors) and languages
- Contact

## Files

```
index.html      Single-page site
css/site.css    All styles: colour and type tokens at the top, light and dark themes
js/site.js      Mobile menu only
Daniel_Ribes_CV.pdf  Current CV, linked from "Download CV" (replace this file to update it)
privacy.html    Privacy policy (self-contained styles)
terms.html      Terms of service (self-contained styles)
```

## Design

- **Type:** Schibsted Grotesk for headings, Source Serif 4 for body text (Google Fonts)
- **Colour:** cool off-white paper, deep ink, petrol blue as the main colour, amber for the survival curve and highlights; dark mode follows the system setting
- **Layout:** each section is a row with a sticky title on the left and content on the right, separated by rules
- **Motion:** one moment only, the Kaplan–Meier curves drawing in on load; disabled when the system asks for reduced motion

The figure's step paths are generated, not traced: two exponential survival functions with random event
times, plotted on a 0–10 year axis. They are illustrative and not trial data.

## Updating

Edit `index.html` and push to `main`; GitHub Pages publishes automatically. No build step.
To change colours or fonts, edit the tokens at the top of `css/site.css`.

## Contact

- **Email:** danribes@iies.es
- **LinkedIn:** [Daniel Ribes](https://www.linkedin.com/in/daniel-ribes-health-economics-data-scientist-engineer-ai-blockchain/)
- **GitHub:** [@danribes](https://github.com/danribes)
