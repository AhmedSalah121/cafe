# [Restaurant]

A clean Next.js application with PostgreSQL integration and Docker support.

## Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── api/            # API Routes
│   │   ├── users/      # User API endpoints
│   │   └── posts/      # Post API endpoints
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
├── components/          # Reusable components
│   └── ui/             # UI components
│       └── Button.tsx  # Example button component
├── hooks/              # Custom React hooks
│   └── useLocalStorage.ts
├── lib/                # Library code and utilities
│   ├── constants.ts    # Application constants
│   └── db/             # Database configuration
│       └── repository.ts
├── repositories/       # Database repositories
│   ├── userRepository.ts
│   └── postRepository.ts
├── services/           # Business logic layer
│   ├── userService.ts  # User operations
│   └── postService.ts  # Post operations
├── types/              # TypeScript type definitions
│   └── index.ts        # Common types
├── utils/              # Utility functions
│   └── index.ts        # Common utilities
└── styles/             # Additional styles (if needed)
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- Docker and Docker Compose
- npm or pnpm

### Quick Start with Docker

1. **Start the entire application with Docker:**
   ```bash
   npm run docker:dev
   ```
   This will start:
   - Next.js app on http://localhost:3000
   - PostgreSQL on localhost:5432
   - pgAdmin (database admin) on http://localhost:8081

2. **Start only the database:**
   ```bash
   npm run db:start
   ```

3. **Stop the database:**
   ```bash
   npm run db:stop
   ```

### Manual Setup

1. **Start PostgreSQL with Docker:**
   ```bash
   npm run db:start
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file:
   ```env
   DATABASE_URL=postgresql://postgres:password@localhost:5432/development
   NODE_ENV=development
   NEXT_PUBLIC_APP_NAME=App Name
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Generate Prisma client:**
   ```bash
   npm run db:generate
   ```

5. **Push database schema:**
   ```bash
   npm run db:push
   ```

6. **Run the development server:**
   ```bash
   npm run dev
   ```

7. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

## Available Scripts

### Development
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **PostgreSQL** - Relational database
- **Prisma** - Modern ORM for TypeScript
- **Tailwind CSS** - Styling
- **Docker** - Containerization
- **ESLint** - Code linting

## Development Guidelines

- Follow the established folder structure
- Use TypeScript for all new files
- Create reusable components in `src/components`
- Add custom hooks in `src/hooks`
- Define types in `src/types`
- Use utility functions from `src/utils`
- Keep constants in `src/lib/constants.ts`
- Add new repositories in `src/repositories`
- Create services in `src/services`
- Add API routes in `src/app/api`
