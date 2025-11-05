# KaizanShop

A modern e-commerce platform built with Next.js 15, MongoDB, and NextAuth.js.

## Features

- 🔐 Multiple authentication methods (Credentials, Google, GitHub)
- 📦 MongoDB database integration
- 🎨 Tailwind CSS styling
- 🖋️ Rich text editor with TipTap
- 📱 Responsive design
- 🔄 SWR for data fetching

## Prerequisites

- Node.js 18+ or Bun
- MongoDB database (local or MongoDB Atlas)
- Google OAuth credentials (optional, for Google login)
- GitHub OAuth credentials (optional, for GitHub login)

## Environment Variables

Create a `.env` file in the root directory with the following variables:

### Required Variables

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/kaizanshop
# For MongoDB Atlas:
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/kaizanshop?retryWrites=true&w=majority

# NextAuth Configuration
NEXTAUTH_SECRET=your-secret-key-here-use-openssl-rand-base64-32
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_URL_INTERNAL=http://localhost:3000

# Node Environment
NODE_ENV=development
```

### Optional OAuth Variables (for Social Login)

```env
# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/callback/google

# GitHub OAuth
AUTH_GITHUB_ID=your-github-client-id
AUTH_GITHUB_SECRET=your-github-client-secret

# Google Drive (if using)
GOOGLE_DRIVE_FOLDER_ID=your-folder-id
REFRESH_TOKEN=your-refresh-token
```

### Generating Secrets

Generate a secure `NEXTAUTH_SECRET`:
```bash
openssl rand -base64 32
```

## MongoDB Setup

### Option 1: Local MongoDB

1. Install MongoDB locally
2. Start MongoDB service:
   ```bash
   sudo systemctl start mongod
   ```
3. Use connection string:
   ```env
   MONGODB_URI=mongodb://localhost:27017/kaizanshop
   ```

### Option 2: MongoDB Atlas (Cloud)

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Create a database user (Database Access)
4. Whitelist your IP address (Network Access)
5. Get connection string from "Connect" → "Connect your application"
6. Replace `<username>`, `<password>`, and database name:
   ```env
   MONGODB_URI=mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/kaizanshop?retryWrites=true&w=majority
   ```

### Database Collections

The app automatically creates these collections:
- `users` - User accounts from OAuth providers
- `user_credentials` - Email/password credentials
- `accounts` - OAuth account linkings
- `sessions` - User sessions (if using database sessions)

## OAuth Setup

### Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Set authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Client Secret to `.env`

### GitHub OAuth

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Set callback URL: `http://localhost:3000/api/auth/callback/github`
4. Copy Client ID and Client Secret to `.env`

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd kaizanshop
   ```

2. Install dependencies:
   ```bash
   pnpm install
   # or
   npm install
   # or
   bun install
   ```

3. Set up environment variables (see above)

4. Run the development server:
   ```bash
   pnpm dev
   # or
   npm run dev
   # or
   bun dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production
- `pnpm start` - Start production server

## Project Structure

```
kaizanshop/
├── app/              # Next.js app directory
├── lib/              # Utility libraries
│   ├── mongodb.ts    # MongoDB client
│   └── users.ts      # User management
├── types/            # TypeScript type definitions
├── utils/            # Helper functions
├── public/           # Static assets
├── auth.config.ts    # NextAuth configuration
├── middleware.ts     # Next.js middleware
└── .env              # Environment variables
```

## Authentication Flow

1. **Credentials**: Email/password stored in `user_credentials` collection
2. **Google/GitHub**: OAuth flow handled by NextAuth with MongoDB adapter
3. **Sessions**: JWT-based sessions for scalability

## Troubleshooting

### MongoDB Connection Issues

- Check MongoDB is running: `sudo systemctl status mongod`
- Verify connection string format
- For Atlas: Check IP whitelist and credentials

### OAuth Issues

- Verify redirect URIs match exactly
- Check client ID and secret are correct
- Ensure OAuth app is not in testing mode (for Google)

### NextAuth Issues

- Regenerate `NEXTAUTH_SECRET`
- Clear browser cookies
- Check `NEXTAUTH_URL` matches your domain

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)

## Deploy on Vercel

1. Push your code to GitHub
2. Import project to [Vercel](https://vercel.com/new)
3. Add environment variables in Vercel dashboard
4. Update `NEXTAUTH_URL` to your production domain
5. Deploy!

For MongoDB Atlas, ensure your connection string uses SRV format and whitelist Vercel's IP ranges (or use 0.0.0.0/0 for all IPs).
