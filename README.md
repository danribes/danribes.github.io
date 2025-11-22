# Daniel Ribes - Professional Portfolio Website

[![Live Website](https://img.shields.io/badge/Live-danribes.github.io-blue?style=for-the-badge)](https://danribes.github.io)
[![GitHub Pages](https://img.shields.io/badge/Hosted%20on-GitHub%20Pages-222?style=for-the-badge&logo=github)](https://pages.github.com/)

A modern, responsive professional portfolio website showcasing the expertise and services of Daniel Ribes, Senior Health Economist with 10+ years of experience in economic modeling, HTA submissions, and market access strategies.

## 🎯 Purpose

This website serves as a comprehensive professional portfolio and digital CV, designed to:

- **Showcase Professional Expertise** - Highlight 10+ years of experience in health economics and outcomes research (HEOR)
- **Present Portfolio Projects** - Feature major projects including GSK Arexvy RSV models, Neuroendocrine Tumor pricing strategies, and rare disease economic evaluations
- **Demonstrate Technical Skills** - Display proficiency in economic modeling, advanced programming (R, Python, Julia, VBA, C++), and AI integration
- **Facilitate Professional Networking** - Provide easy access to contact information, LinkedIn profile, and downloadable CV
- **Support Career Opportunities** - Serve as a landing page for LinkedIn profile visitors and potential clients/employers

## 🌐 Live Website

**Visit the live site:** [https://danribes.github.io](https://danribes.github.io)

## 🏗️ Architecture & Technology Stack

### Core Technologies

This is a **static website** built with vanilla web technologies for optimal performance, accessibility, and maintainability:

- **HTML5** - Semantic markup with modern best practices
- **CSS3** - Custom styling with CSS Grid, Flexbox, and CSS Variables
- **Vanilla JavaScript (ES6+)** - Progressive enhancement and interactive features

### Why Static HTML/CSS/JS?

- ✅ **Zero Build Process** - No compilation or bundling required
- ✅ **Lightning Fast** - Pure HTML/CSS loads instantly
- ✅ **GitHub Pages Native** - Direct deployment without build steps
- ✅ **Maximum Compatibility** - Works everywhere without dependencies
- ✅ **Easy Maintenance** - Simple to update and modify
- ✅ **SEO Optimized** - Search engines can crawl content directly
- ✅ **Lightweight** - Minimal file size for fast loading

### Design System

#### Typography
- **Primary Font:** Inter (Google Fonts) - Clean, professional sans-serif
- **Heading Font:** Poppins (Google Fonts) - Bold, modern headings
- **Responsive scaling** using rem units

#### Color Palette
```css
Primary Blue:     #2563eb (Professional, trustworthy)
Secondary Green:  #10b981 (Success, growth)
Accent Orange:    #f59e0b (Energy, innovation)
Text Primary:     #1f2937 (High readability)
Text Secondary:   #6b7280 (Subtle information)
Background:       #ffffff, #f9fafb (Clean, spacious)
```

#### Layout Patterns
- **Container Width:** Max 1200px for optimal readability
- **Grid System:** CSS Grid for complex layouts, Flexbox for simpler ones
- **Spacing Scale:** 0.5rem, 1rem, 2rem, 4rem, 6rem (consistent rhythm)
- **Border Radius:** 0.5rem, 1rem, 1.5rem (soft, approachable)

### Key Features

#### 🎨 Responsive Design
- **Mobile-First Approach** - Optimized for all screen sizes
- **Breakpoints:**
  - Desktop: > 1024px
  - Tablet: 768px - 1024px
  - Mobile: < 768px
- **Hamburger Menu** - Collapsible navigation on mobile devices

#### ⚡ Performance Optimizations
- **Minimal Dependencies** - Only Google Fonts (async loaded)
- **Optimized CSS** - Single stylesheet, no unused code
- **Lazy Loading Ready** - Infrastructure for image lazy loading
- **Debounced Scroll Events** - Optimized scroll performance

#### 🎭 Interactive Elements
- **Smooth Scrolling** - Navigation with offset for fixed header
- **Animated Counters** - Statistics animate on scroll into view
- **Intersection Observer** - Progressive content reveals
- **Hover Effects** - Engaging micro-interactions
- **Active Navigation** - Highlights current section

#### ♿ Accessibility
- **Semantic HTML** - Proper heading hierarchy and landmarks
- **ARIA Attributes** - Enhanced screen reader support
- **Keyboard Navigation** - Full keyboard accessibility
- **Focus States** - Clear focus indicators
- **Color Contrast** - WCAG AA compliant

#### 🔍 SEO Optimization
- **Meta Tags** - Title, description, keywords
- **Open Graph** - Social media preview ready
- **Structured Data** - Schema.org markup ready
- **Semantic HTML** - Search engine friendly structure

## 📁 Project Structure

```
danribes.github.io/
├── index.html              # Main HTML file with all content
├── css/
│   └── style.css          # Complete stylesheet
├── js/
│   └── script.js          # Interactive features and animations
├── images/                 # Image assets directory (empty, ready for use)
├── .nojekyll              # Prevents GitHub Pages Jekyll processing
└── README.md              # This file
```

### File Organization

#### `index.html` - Single Page Application Structure
```
- <head> - Meta tags, fonts, CSS
- <nav> - Sticky navigation bar
- <section id="home"> - Hero section with CTA buttons
- <section id="about"> - Professional summary
- <section id="expertise"> - Core competencies (6 cards)
- <section id="services"> - Professional services (6 cards)
- <section class="therapeutic-areas"> - Disease area expertise
- <section id="portfolio"> - Featured projects (4 major projects)
- <section class="publications"> - Peer-reviewed research
- <section class="experience"> - Career timeline
- <section class="education"> - Academic background
- <section class="languages"> - Language proficiency
- <section id="contact"> - Contact information
- <footer> - Site footer with links
```

#### `css/style.css` - Modular CSS Architecture
```css
1. Variables & Reset         - CSS custom properties, normalize
2. Typography                 - Font styles, sizes, weights
3. Utility Classes            - Reusable components
4. Navigation                 - Header, menu, mobile nav
5. Hero Section              - Landing area with stats
6. About Section             - Professional summary
7. Expertise Section         - Skills grid
8. Services Section          - Offerings cards
9. Portfolio Section         - Project showcases
10. Publications Section     - Research papers
11. Experience Timeline      - Career history
12. Education Section        - Academic credentials
13. Languages Section        - Language skills
14. Contact Section          - Contact information
15. Footer                   - Site footer
16. Responsive Media Queries - Mobile, tablet, desktop
17. Animations               - Fade-in effects
```

#### `js/script.js` - Feature Modules
```javascript
- Mobile Navigation Toggle
- Smooth Scrolling
- Navbar Background on Scroll
- Intersection Observer (Animations)
- Active Navigation Highlighting
- Counter Animations
- Email Copy-to-Clipboard
- Dynamic Year in Footer
- External Links Security
- Lazy Loading Infrastructure
- Debounced Scroll Events
- Print-Friendly Styles
```

## 🚀 Deployment

### Hosting Platform
**GitHub Pages** - Free static site hosting from GitHub

### Deployment Process
1. Code is pushed to `main` branch
2. GitHub Pages automatically serves `index.html` from root
3. `.nojekyll` file prevents Jekyll processing
4. Site updates typically deploy within 1-2 minutes

### Custom Domain Ready
The site is configured to work with custom domains. To add a custom domain:
1. Add `CNAME` file with your domain
2. Configure DNS records at your domain provider
3. Enable HTTPS in GitHub Pages settings

## 🛠️ Local Development

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional, but recommended)

### Running Locally

#### Option 1: Python HTTP Server
```bash
python3 -m http.server 8080
# Visit http://localhost:8080
```

#### Option 2: Node.js HTTP Server
```bash
npx http-server -p 8080
# Visit http://localhost:8080
```

#### Option 3: VS Code Live Server
- Install "Live Server" extension
- Right-click `index.html`
- Select "Open with Live Server"

### Making Changes

1. **Edit HTML** - Modify content in `index.html`
2. **Edit Styles** - Update styles in `css/style.css`
3. **Edit Scripts** - Modify functionality in `js/script.js`
4. **Test Changes** - View in browser (hard refresh: Ctrl/Cmd + Shift + R)
5. **Commit & Push** - Changes automatically deploy to GitHub Pages

## 📝 Content Sections

### 1. Hero Section
- Name and professional title
- Key statistics (10+ years, 5 markets, 6 languages, 2 publications)
- Call-to-action buttons (Contact, Resume, Portfolio)

### 2. About Section
- Professional summary
- Unique multidisciplinary profile (Health Economist + Engineer + Blockchain Developer)
- Key highlights (International experience, Innovation, Track record)

### 3. Core Competencies (6 Cards)
1. Economic Modeling & HTA
2. Survival & Statistical Analysis
3. Evidence Synthesis
4. Pricing & Market Access
5. Advanced Programming (R, Python, Julia, VBA, C++)
6. AI & Blockchain Integration

### 4. Professional Services (6 Cards)
1. HTA Submissions & Dossiers
2. Economic Modeling
3. Pricing & Market Access Strategy
4. Evidence Synthesis & Analysis
5. Advanced Analytics & AI Integration
6. Custom Tool Development

### 5. Therapeutic Areas
- Oncology, Rare Diseases, Vaccines, Autoimmune, MedTech, Cardiometabolic

### 6. Featured Projects
1. **GSK Arexvy - RSV Dynamic Transmission Model** (Lead Modeler, 2021-2024)
2. **RSV Static Cost-Effectiveness Model** (Model Developer, CHESS collaboration)
3. **NET Portfolio Budget Impact Model** (HEOR Manager, Novartis 2020-2021)
4. **Cushing's Syndrome Semi-Markov Model** (Model Developer, Osilodrostat)

### 7. Publications
1. Kidney International Reports (2021) - AKI Cost-Effectiveness
2. Current Medical Research and Opinion (2018) - Schizophrenia UAE

### 8. Professional Journey
Timeline from 2018-2025 covering roles at:
- IQVIA (2025)
- AXIS Consulting UK (2024-2025)
- Freelance/GSK (2021-2024)
- Novartis Oncology (2020-2021)
- Wellmera AG (2018-2020)

### 9. Education & Certifications
- Master in Blockchain Development (2024)
- Advanced Modelling Methods - York (2017)
- MSc Health Economics - City London (2014-2015, Distinction)
- Management Development - IESE (2005-2006)
- MSc Agricultural Engineering - UPC & Wageningen (1986-1993)

### 10. Language Proficiency
Spanish (Native), Catalan (Native), English (Fluent), French (Advanced), Italian (Advanced), German (Basic)

### 11. Contact Information
- Email: danribes@iies.es
- Phone: +34 696 62 83 77
- Location: Barcelona, Spain (Remote-Ready)
- LinkedIn: [daniel-ribes](https://www.linkedin.com/in/daniel-ribes/)
- Resume: [Download CV](https://drive.google.com/file/d/1_syLG7xnnlKG63AipAUNYFiR4CaOWueQ/view?usp=drive_link)

## 🎨 Design Principles

### Visual Hierarchy
- **Primary Actions** - Blue gradient buttons (Get In Touch, Contact)
- **Secondary Actions** - Outlined buttons (Download Resume)
- **Tertiary Actions** - Text links (Portfolio navigation)

### Content Strategy
- **Above the Fold** - Immediate professional identity and key stats
- **Progressive Disclosure** - Detailed information as user scrolls
- **Call-to-Action Placement** - Strategic placement throughout journey
- **Social Proof** - Publications, projects, and timeline establish credibility

### User Experience
- **Fast Load Time** - Minimal assets, optimized delivery
- **Intuitive Navigation** - Clear sections, sticky header
- **Mobile-Friendly** - Touch-optimized, readable on small screens
- **Scannable Content** - Headlines, cards, bullet points

## 🔐 Security

- **External Links** - `target="_blank"` with `rel="noopener noreferrer"`
- **No Backend** - Static site eliminates server vulnerabilities
- **HTTPS** - Served over secure connection via GitHub Pages
- **No Cookies** - Privacy-friendly, no tracking

## 📊 Analytics Ready

The site structure is ready for analytics integration:
- Google Analytics (add tracking code to `<head>`)
- Microsoft Clarity (add clarity code)
- LinkedIn Insight Tag (for LinkedIn campaigns)

## 🔄 Version History

### v1.2.0 (Current)
- Added resume/CV download links (navigation, hero, contact)
- Added `btn-outline` button style
- Enhanced contact section with resume card

### v1.1.0
- Removed Astro build system
- Converted to pure HTML/CSS/JS
- Added `.nojekyll` for GitHub Pages
- Cleaned repository structure

### v1.0.0
- Initial release
- Complete portfolio website
- Responsive design
- Interactive features
- All content sections

## 🤝 Contributing

This is a personal portfolio website. However, if you notice any issues or have suggestions:

1. Open an issue on GitHub
2. Fork the repository
3. Create a feature branch
4. Submit a pull request

## 📄 License

Copyright © 2025 Daniel Ribes. All rights reserved.

This website and its content are proprietary. The code structure and design patterns may be used as inspiration, but direct copying or replication is not permitted without explicit permission.

## 📞 Contact

**Daniel Ribes**  
Senior Health Economist  

- 🌐 Website: [danribes.github.io](https://danribes.github.io)
- 📧 Email: danribes@iies.es
- 📱 Phone: +34 696 62 83 77
- 💼 LinkedIn: [daniel-ribes](https://www.linkedin.com/in/daniel-ribes/)
- 📄 Resume: [Download CV](https://drive.google.com/file/d/1_syLG7xnnlKG63AipAUNYFiR4CaOWueQ/view?usp=drive_link)

---

**Built with ❤️ using vanilla HTML, CSS, and JavaScript**  
*No frameworks, no dependencies, just clean code.*
