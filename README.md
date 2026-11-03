# Kindora

**Kindora** is a community-focused social development events platform
that helps people discover and participate in initiatives that create
positive change.

Built as a portfolio-quality full-stack application using Next.js,
Express.js, TypeScript, and MongoDB.

## Features

-   Browse upcoming community events.
-   View event descriptions, dates, locations, and categories.
-   Create and manage events.
-   Join and leave events.
-   View events created by the user and events they have joined.
-   Authentication with Better Auth.
-   Protected backend API routes with JWT verification.
-   Responsive interface with light and dark themes.
-   Request validation with Zod.

> Kindora is under active development. Features and implementation
> details may change.

## Tech Stack

### Frontend

-   Next.js App Router
-   React
-   TypeScript
-   Tailwind CSS
-   shadcn/ui
-   Lucide React
-   Better Auth
-   Sonner
-   next-themes

### Backend

-   Node.js
-   Express.js
-   TypeScript
-   MongoDB official Node.js driver
-   Zod
-   jose

### Deployment

-   Frontend: Vercel
-   Backend: Render
-   Database: MongoDB

## Project Structure

The frontend and backend are maintained as separate projects.

``` text
kindora/
├── app/
├── components/
├── lib/
├── types/
└── ...

kindora-server/
└── src/
    ├── config/
    ├── middleware/
    ├── routes/
    └── ...
```

The exact structure may evolve during development.

## Getting Started

### Prerequisites

-   Node.js
-   npm
-   MongoDB database (local or MongoDB Atlas)
-   Git

### 1. Clone the repositories

If frontend and backend are in separate repositories, clone each
repository:

``` bash
git clone <frontend-repository-url>
git clone <backend-repository-url>
```

Replace the placeholders with your repository URLs.

### 2. Install dependencies

Run inside both project directories:

``` bash
npm install
```

### 3. Backend environment variables

Create a `.env` file in the backend project:

``` env
PORT=5000
DB_NAME=kindora
MONGO_URI=your_mongodb_connection_string
BETTER_AUTH_URL=http://localhost:3000
CLIENT_URL=http://localhost:3000
```

### 4. Frontend environment variables

Create a `.env.local` file in the frontend project:

``` env
NEXT_PUBLIC_API_URL=http://localhost:5000
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_DB_NAME=
BETTER_AUTH_SECRET=
BETTER_AUTH_MONGO_URL=
BETTER_AUTH_GOOGLE_CLIENT_ID=
BETTER_AUTH_GOOGLE_CLIENT_SECRET=
```

Use the variable names required by your current application
configuration. Never commit real credentials or secret values.

### 5. Run the backend

From the backend directory:

``` bash
npm run dev
```

### 6. Run the frontend

From the frontend directory:

``` bash
npm run dev
```

Open <http://localhost:3000>.

The commands assume both projects define a `dev` script in
`package.json`. Adjust them if your scripts differ.

## Authentication and Security

Better Auth handles authentication in the Next.js application. The
Express backend verifies access tokens using `jose` and the Better Auth
JWKS endpoint.

Security practices:

-   Store secrets and database credentials in environment variables.
-   Never expose private credentials in frontend code.
-   Validate incoming data on the backend.
-   Enforce event ownership and participation rules on the backend.
-   Configure CORS and Better Auth trusted origins for local and
    production domains.

## Event Data

Event records currently include information such as:

-   Title
-   Description
-   Event type
-   Image URL
-   Location
-   Event date
-   Creator ID

The backend schema and validation define the authoritative data
structure.

## Deployment

### Frontend

Deploy the Next.js application to Vercel and configure its production
environment variables.

### Backend

Deploy the Express API to Render and configure its production
environment variables.

For production, update the API URL, Better Auth URL, CORS allowed
origins, and Better Auth trusted origins to match the deployed domains.

Do not put production secrets in this README or commit them to version
control.

## Development Guidelines

-   Keep frontend API calls in the existing API helper modules.
-   Keep authorization checks in backend middleware and route handlers.
-   Prefer reusable components and consistent TypeScript types.
-   Keep frontend and backend validation rules aligned.
-   Test protected routes with authenticated and unauthenticated
    requests.

## Roadmap

-   Complete event creation and management workflows.
-   Improve event details and organizer profile information.
-   Complete joined-events and user-profile experiences.
-   Strengthen authorization, validation, and error handling.
-   Improve accessibility and responsive behavior.
-   Add Bengali language support.

## Contributing

Kindora is currently under active development.

1.  Fork or clone the repository.
2.  Create a feature branch.
3.  Make focused changes.
4.  Test your changes.
5.  Submit a pull request with a clear description.

## License

No license has been specified yet. All rights are reserved by the
project owner unless a license is added to this repository.
