# ReactJS Template Shadcn

A React + TypeScript + Vite template using Tailwind CSS v4 and shadcn/ui components.

## Getting Started

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev` - start the development server
- `npm run build` - type check and build for production
- `npm run preview` - preview the production build
- `npm run lint` - run ESLint
- `npm run typecheck` - run TypeScript checks
- `npm run format` - format files with Prettier

## Environment Variables

Copy `.env.example` to `.env` and set the available values:

```bash
cp .env.example .env
```

- `VITE_UCARE_CDN` - base URL for the CDN used by the sidebar logos

## Project Structure

```
src/
├── components/   # UI and shared components
├── hooks/        # Custom React hooks
├── interfaces/   # TypeScript interfaces
├── layout/       # Layout, theme, and navigation
├── lib/          # Utilities and helpers
├── pages/        # Route pages
├── routes/       # Application routes
├── types/        # TypeScript types
└── utils/        # Global utilities
```
