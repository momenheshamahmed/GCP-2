# Saudi Mining Platform 🏔️

A modern Next.js 14+ application for exploring mining investment opportunities in Saudi Arabia. Built with TypeScript, Tailwind CSS, and a comprehensive UI component library.

## 🚀 Features

- **App Router** - Next.js 14+ with modern file-based routing
- **TypeScript** - Full type safety throughout the codebase
- **Tailwind CSS** - Utility-first styling with custom Saudi Arabia brand colors
- **Shadcn/ui** - Beautiful, accessible UI components
- **Framer Motion** - Smooth animations and transitions
- **React Query** - Powerful data fetching and caching
- **Zustand** - Lightweight state management
- **Leaflet Maps** - Interactive map visualizations

## 📁 Project Structure

```
├── app/
│   ├── (public)/          # Public pages
│   │   ├── page.tsx       # Landing page
│   │   ├── geology/       # Geological data
│   │   ├── minerals/      # Mineral resources
│   │   ├── investment/    # Investment opportunities
│   │   ├── tenders/       # Active tenders
│   │   ├── infrastructure/# Infrastructure
│   │   └── companies/     # Mining companies
│   ├── (dashboard)/       # Admin dashboard
│   │   └── admin/
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/               # Shadcn UI components
│   ├── maps/             # Map components
│   ├── charts/           # Chart components
│   ├── cards/            # Card components
│   └── navigation/       # Navigation components
├── lib/
│   ├── data/             # Sample data
│   ├── utils/            # Utility functions
│   ├── hooks/            # Custom hooks
│   ├── store/            # Zustand store
│   └── providers/        # React providers
├── types/                # TypeScript types
└── public/
    ├── images/
    ├── icons/
    └── maps/
```

## 🎨 Brand Colors

The platform uses official Saudi Arabia brand colors:

- **Saudi Green**: `#006C35` - Primary brand color
- **Saudi Gold**: `#D4AF37` - Accent color
- Full color palette with shades available in Tailwind config

## 🛠️ Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd saudi-mining-platform
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🗺️ Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page with overview |
| `/geology` | Geological data and maps |
| `/minerals` | Mineral resources catalog |
| `/investment` | Investment opportunities |
| `/tenders` | Active tenders and licenses |
| `/infrastructure` | Mining infrastructure |
| `/companies` | Mining companies directory |
| `/admin` | Admin dashboard |

## 📦 Key Dependencies

- **next** - React framework
- **react** & **react-dom** - UI library
- **typescript** - Type checking
- **tailwindcss** - Styling
- **framer-motion** - Animations
- **@tanstack/react-query** - Data fetching
- **zustand** - State management
- **leaflet** & **react-leaflet** - Maps
- **@radix-ui/**** - Accessible UI primitives
- **lucide-react** - Icons

## 🌐 Environment Variables

Create a `.env.local` file in the root directory:

```env
# Add any required environment variables here
NEXT_PUBLIC_API_URL=your-api-url
```

## 📄 License

This project is part of the Saudi Arabia Vision 2030 mining initiative.

---

Built with ❤️ for Saudi Arabia's mining sector

