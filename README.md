# 🌐 TileVista — 3D Virtual Showroom & Showroom Management System

Welcome to the official repository of **TileVista**, a virtual tile and bathware visualization, POS synchronization, and administrative showroom management system built as a highly performant Turborepo monorepo.

This architecture is built on Clean Architecture principles, leveraging modular TypeScript and React Three Fiber (R3F) 3D layers.

---

## 🏗️ System Architecture & Workspace Layout

The monorepo organizes applications (`apps/`) and reusable modular modules (`packages/`) as separate decoupled layers:

```
tile-vista/
├── apps/
│   ├── web/                     # Next.js App Router Client
│   │   └── src/
│   │       ├── app/             # Routing layouts
│   │       └── features/        # auth, products, cart, orders, packages, designer, analytics, admin
│   │
│   └── api/                     # NestJS API Backend
│       └── src/
│           ├── modules/         # auth, users, products, inventory, packages, orders, designer, analytics, notifications, pos
│           ├── common/          # security guards & auth filters
│           └── prisma/          # database client & MySQL mapping schema
│
└── packages/
    ├── types/                   # Shared TypeScript Domain Interfaces
    ├── ui/                      # Shared visual design system (Button, Card, Input)
    ├── utils/                   # Shared price/discount business formulas
    └── three-core/              # WebGL / React Three Fiber scene primitives
```

---

## ⚡ Tech Stack & Core Enablers

*   **Monorepo Pipeline:** [Turborepo](https://turbo.build/) + NPM Workspaces
*   **Frontend Client:** [Next.js 14 (App Router)](https://nextjs.org/) + [React Three Fiber (R3F)](https://r3f.docs.pmnd.rs/) + [Three.js](https://threejs.org/) + [Tailwind CSS](https://tailwindcss.com/)
*   **Backend Server:** [NestJS (Node.js framework)](https://nestjs.com/) + [Passport JWT Securing](https://passportjs.org/)
*   **Database layer ORM:** [Prisma](https://www.prisma.io/) + MySQL provider mapping

---

## 💻 Local Quickstart

### Prerequisites
*   Node.js (>= 20.0.0)
*   npm (>= 10.0.0)
*   Running MySQL Server

### 1. Installation
Install monorepo package dependencies:
```bash
npm install
```

### 2. Configure Environment Secrets
Create a `.env` file at the root matching the configurations outlined in `.env.example`:
```bash
cp .env.example .env
```

### 3. Database Schemas Mapping
Navigate to `apps/api/` and run Prisma client migrations to create your relational MySQL tables:
```bash
npx prisma generate
npx prisma migrate dev
```

### 4. Fire Up Local Development Servers
Run the unified dev script from the monorepo root to launch Next.js (Port 3000) and NestJS (Port 4000) concurrently:
```bash
npm run dev
```

---

## 📦 Building and Compiling Workspaces

To compile all TypeScript visual packages and build production-ready optimized bundles:
```bash
npm run build
```
