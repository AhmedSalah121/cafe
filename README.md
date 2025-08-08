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
   DATABASE_URL=postgresql://postgres:password123@localhost:5432/tortoga
   NODE_ENV=development
   NEXT_PUBLIC_APP_NAME=Tortoga
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

### Docker Commands
- `npm run docker:dev` - Start development environment with Docker
- `npm run docker:prod` - Start production environment with Docker
- `npm run docker:down` - Stop all Docker containers
- `npm run docker:clean` - Stop and remove all containers and volumes
- `npm run db:start` - Start only PostgreSQL and pgAdmin
- `npm run db:stop` - Stop PostgreSQL and pgAdmin

### Database Commands
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema changes to database
- `npm run db:migrate` - Create and apply migrations
- `npm run db:studio` - Open Prisma Studio
- `npm run db:reset` - Reset database and apply migrations

## Database

### PostgreSQL Configuration
- **Database:** tortoga
- **Username:** postgres
- **Password:** password123
- **Port:** 5432
- **pgAdmin:** http://localhost:8081 (admin@tortoga.com/password123)

### Models

#### User Model
- `id` (CUID, primary key)
- `email` (required, unique)
- `name` (required)
- `password` (required)
- `avatar` (optional)
- `role` (USER/ADMIN, default: USER)
- `isActive` (boolean, default: true)
- `createdAt`, `updatedAt` (timestamps)

#### Post Model
- `id` (CUID, primary key)
- `title` (required)
- `content` (required)
- `authorId` (required, references User)
- `tags` (array of strings)
- `isPublished` (boolean, default: false)
- `publishedAt` (date, when published)
- `createdAt`, `updatedAt` (timestamps)

## Repository Pattern

The application uses a repository pattern with an abstract `BaseRepository` class that provides:

- **save()** - Create or update entities (upsert functionality)
- **fetch()** - Get entities with filtering and pagination
- **fetchOne()** - Get a single entity
- **count()** - Count entities
- **delete()** - Delete entities

Each repository extends this base class and implements Prisma-specific operations.

## API Endpoints

### Users
- `GET /api/users` - Get all users (with pagination)
- `POST /api/users` - Create a new user
- `GET /api/users/[id]` - Get user by ID
- `PUT /api/users/[id]` - Update user
- `DELETE /api/users/[id]` - Delete user

### Posts
- `GET /api/posts` - Get published posts (with pagination)
- `POST /api/posts` - Create a new post
- `GET /api/posts/[id]` - Get post by ID
- `PUT /api/posts/[id]` - Update post
- `DELETE /api/posts/[id]` - Delete post

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
- Use the repository pattern for database operations

## Database Access

### pgAdmin (Web Interface)
- **URL:** http://localhost:8081
- **Email:** admin@tortoga.com
- **Password:** password123

### Prisma Studio
- **Command:** `npm run db:studio`
- **URL:** http://localhost:5555

### PostgreSQL Connection String
```
postgresql://postgres:password123@localhost:5432/tortoga
```
