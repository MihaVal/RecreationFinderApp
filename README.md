# Recreation Finder

A simple Next.js app to find and create recreational activities.

## Features

- 🏀 Browse upcoming events
- 👤 User registration and login  
- ➕ Create new events
- 🤝 Join events
- 📱 Simple, clean interface

## Tech Stack

- **Next.js 14** with TypeScript
- **PostgreSQL** (Neon database)
- **JWT** authentication
- **Simple CSS** styling

## Database Schema

Uses the provided Neon database with tables:
- `users` - User accounts
- `events` - Recreational events
- `event_attendees` - Join table for event participation
- `ratings` - Event ratings (future feature)

## Environment Variables

Create `.env.local`:

```
DATABASE_URL="your_neon_connection_string"
JWT_SECRET="your_jwt_secret"
NODE_ENV="development"
```

## Deployment

Perfect for Vercel deployment:

1. Push to GitHub
2. Connect to Vercel
3. Set environment variables
4. Deploy!

The app will automatically use Neon database in production.