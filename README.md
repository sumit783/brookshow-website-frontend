# Brookshow Website Frontend

A modern, responsive website for Brookshow built with React and TypeScript.

## Tech Stack

This project is built with:

- **React** - Frontend framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern UI component library
- **React Router** - Client-side routing

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <YOUR_GIT_URL>
cd brookshow-website-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── homePage/       # Home page components
│   ├── artists/        # Artist-related components
│   ├── events/         # Event-related components
│   └── ...
├── pages/              # Page components
├── assets/             # Static assets
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── routes.tsx          # Route configuration
```

## Features

- Responsive design for all devices
- Modern UI with smooth animations
- Artist profiles and booking system
- Event listings and details
- Interactive components and forms
