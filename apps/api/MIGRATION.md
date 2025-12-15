# Backend Migration from Deno to NestJS

This backend has been successfully migrated from Deno to NestJS to work within the Nx monorepo.

## What Changed

### Technology Stack
- **Runtime**: Deno → Node.js (via NestJS)
- **Framework**: Custom Deno server → NestJS
- **GraphQL**: `gql` + `graphql_tools` → `@nestjs/graphql` with Apollo Server
- **Supabase**: Deno Supabase client → `@supabase/supabase-js` (Node.js)

### Structure Changes
- GraphQL resolvers converted to NestJS resolvers using decorators
- Supabase client wrapped in a NestJS service
- CORS configured via NestJS middleware
- Environment variables loaded using `dotenv`

## Setup

1. **Install dependencies** (already done):
   ```bash
   npm install
   ```

2. **Configure environment variables**:
   - Copy `apps/api/.env.example` to `apps/api/.env`
   - Fill in your Supabase credentials:
     ```
     SUPABASE_URL=your_supabase_project_url
     SUPABASE_ANON_KEY=your_supabase_anon_key
     PORT=3333
     ```

## Running the Backend

### Development
```bash
npm run start:api
```

### Production Build
```bash
npx nx build api
npx nx serve api
```

### Run Both Frontend and Backend
```bash
npm run start:all
```

## API Endpoints

- **GraphQL**: `http://localhost:3333/api/graphql`
  - GraphQL Playground available at this URL
  - Supports all queries and mutations from the original backend

- **Health Check**: `http://localhost:3333/api/health`
  - Returns "OK" if the server is running

- **Sitemap**: `http://localhost:3333/api/sitemap`
  - Generates XML sitemap with static pages and blog posts

- **Root**: `http://localhost:3333/api/`
  - Returns API status message

## GraphQL Schema

The GraphQL schema is auto-generated from the NestJS resolvers. Available operations:

### Queries
- `posts`: Get all blog posts
- `post(id: ID!)`: Get a single post by ID
- `trophies(username: String!)`: Fetch GitHub profile trophies

### Mutations
- `createPost(title: String!, content: String!, author: String)`: Create a new post (requires auth)
- `updatePost(id: ID!, title: String, content: String, author: String)`: Update a post (requires auth)
- `deletePost(id: ID!)`: Delete a post (requires auth)

## Authentication

All mutations require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

The token is automatically extracted and used to create an authenticated Supabase client.

## CORS Configuration

The following origins are allowed:
- `https://joshuasevy.com` (production)
- `http://localhost:3000`
- `http://localhost:4000`
- `http://localhost:4200` (Angular dev server)

## Old Deno Code

The original Deno code is preserved in `src/personal_blog/` for reference but is excluded from the build. You can safely remove it once you've verified everything works.

