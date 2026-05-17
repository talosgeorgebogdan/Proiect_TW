--
title: MCP Showcase - Educational Presentation
--

## 1. Project Overview

This is a Next.js application built as an **educational presentation** for the **Model Context Protocol (MCP)**. The project showcases:
- What MCP is and why it matters
- The three core primitives: Tools/Skills, Resources, and Prompts
- Real-world integration use cases
- Seamless ecosystem integrations

The goal is to demonstrate how MCPs work as a universal interface between AI assistants and external systems, making AI agents capable of reading, writing, and taking actions on your data.

**Note**: The interactive chat playground has been removed to focus on a polished, performance-optimized presentation experience.

## 2. Core Architecture

-   **Framework**: Next.js 16.2.6 (App Router)
-   **Language**: TypeScript 5
-   **Styling**: Tailwind CSS v4 with PostCSS
-   **Rendering**: React Server Components (RSC) for optimal performance and SEO

The application is **presentation-only** with no backend API. All content is server-rendered and statically optimized.

## 3. Key Files & Components

-   `src/app/page.tsx`: The main landing page (Server Component). Contains all content sections from hero to footer.
-   `src/app/layout.tsx`: Root layout with Geist font family configuration.
-   `src/app/ScrollAnimate.tsx`: Reusable client component for triggering fade-in-on-scroll animations using the `IntersectionObserver` API.
-   `src/app/globals.css`: Tailwind CSS imports and theme configuration.

## 4. Content Sections

The landing page is structured as follows:

- **Header/Navigation**: Fixed sticky header with logo and navigation links
- **Hero Section**: Main value proposition with architecture diagram
- **What is MCP?**: Introduction to MCP concepts with three pillars (Standardized, Secure & Local, What to Expect)
- **The Three Primitives**: Visual cards explaining Tools, Resources, and Prompts
- **How the Protocol Works**: Step-by-step visualization of MCP request lifecycle
- **Skills Section**: Explanation of how servers expose capabilities to AI
- **Use Cases**: Real-world scenarios (Database Architect, DevOps Auto-Pilot, Design Engineer)
- **Integrations**: Showcase of available MCP servers (Vercel, GitHub, Brave, Figma, Slack, Postgres, AWS S3)
- **IDE Integration**: Information about using MCP with Cursor, Windsurf, and VS Code
- **Footer**: Navigation and project information

## 5. Development Workflow & Commands

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build (required before start)
npm start        # Run production build
npm run lint     # Run ESLint checks
```

## 6. Important Development Patterns & Gotchas

### ScrollAnimate Component
- Use `<ScrollAnimate>` wrapper to add fade-in-on-scroll animations to content sections
- Uses `IntersectionObserver` API with 10% visibility threshold
- Animations trigger once and stop observing to prevent re-triggering on scroll

### Styling & Layout
- Tailwind v4 uses `@import "tailwindcss"` in `globals.css` (not `@tailwind` directives)
- PostCSS config must be present (`postcss.config.mjs`)
- Custom colors are inline (e.g., `bg-[#043873]`) not in centralized config
- Heavy horizontal padding pattern: `lg:px-[220px]`

## 7. UI & Styling Conventions

-   **Color Palette**:
    -   Primary Background: Dark Blue (`#043873`)
    -   Accent: Yellow (`#FFE492`)
    -   Call-to-Action: Light Blue (`#4F9CF9`)
-   **Layout**: Sections use heavy horizontal padding on large screens (`lg:px-[220px]`).
-   **Animations**: Use the `<ScrollAnimate>` component to wrap new sections for a consistent fade-in-on-scroll effect.

## 8. File Structure Conventions
- API routes: Not used (presentation-only project)
- Components in `src/app/` alongside pages
- Shared utilities and types follow Next.js App Router conventions

## 9. Troubleshooting & Common Issues

### Styling Not Applying
- Tailwind v4 uses `@import "tailwindcss"` in `globals.css` (not `@tailwind` directives)
- PostCSS config must be present (`postcss.config.mjs`)
- Custom colors are inline (e.g., `bg-[#043873]`) not in config
- Clear `.next` build cache if styles don't update: `rm -rf .next`

### Build Failures
- Ensure Node.js version is compatible with Next.js 16.2.6
- Run `npm install` to ensure all dependencies are installed correctly
- Check that no unused imports remain (ESLint will flag them)</content>
<parameter name="filePath">c:\Users\talos\Desktop\Scoala\AN IV\TW\Proiect_TW\.github\copilot-instructions.md