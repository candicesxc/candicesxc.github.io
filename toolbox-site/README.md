# Cute Toolbox Portfolio Site

A personal portfolio site built with React, Vite, Tailwind CSS, and Framer Motion. This site is designed to be served under the `/homepage/test` path.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

The built files will be in the `dist` directory and should be deployed to serve under `/homepage/test`.

## Project Structure

- `/src/components` - React components (Navbar, Toolbox, ToolDrawer, ProjectCard, ProjectModal)
- `/src/pages` - Page components (HomePage, ProjectsPage, ManualPage, ContactPage)
- `/src/App.jsx` - Main app component with routing
- `/src/main.jsx` - Entry point
- `/public` - Static assets (images, SVGs)
- `/index.html` - HTML template

## Features

- Interactive toolbox with opening animation
- Tool drawer system for skill exploration
- Projects grid with modal views
- Resume/manual page with structured content
- Responsive design
- Smooth animations with Framer Motion
- Accessible navigation and interactions

## Design System

- Colors: Primary (#8BA6A9), Accent (#F4A261), Neutrals
- Typography: Plus Jakarta Sans (headings), Inter (body)
- Spacing: 8px increment scale
- Border radius: 12-16px for cards

## Routing

All routes are under `/homepage/test`:
- `/homepage/test` - Homepage with toolbox
- `/homepage/test/projects` - Projects grid
- `/homepage/test/manual` - Resume/manual page
- `/homepage/test/contact` - Contact page
