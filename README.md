# Payload Next.js Starter

Quickly add PayloadCMS to any existing Next.js project. This package scaffolds PayloadCMS with PostgreSQL support into your Next.js application.

## Installation

Run the setup command in your Next.js project:

```bash
npx payload-next-starter
```

Or install globally:

```bash
npm install -g payload-next-starter
payload-next-starter
```

## What it does

This CLI tool will:
1. Copy Payload admin routes to `src/app/(payload)/`
2. Copy API routes to `src/app/api/[...payload]/`
3. Copy collections (Users, Media) to `src/collections/`
4. Install required dependencies
5. Update `next.config.ts` with Payload plugin
6. Create `.env.example` with required variables

## After installation

1. Copy `.env.example` to `.env` and fill in your values:
   ```bash
   DATABASE_URI=postgresql://user:password@host:5432/database
   PAYLOAD_SECRET=your-secret-key-min-16-chars
   NEXT_PUBLIC_SERVER_URL=http://localhost:3000
   ```

2. Generate Payload import maps:
   ```bash
   npx payload generate:importmap
   ```

3. Generate TypeScript types:
   ```bash
   npx payload generate:types
   ```

4. Start your dev server:
   ```bash
   npm run dev
   ```

5. Visit `http://localhost:3000/admin` to create your first admin user

## Requirements

- Next.js 13+ with App Router
- Node.js 18.20+ or 20.9+
- PostgreSQL database

## Collections included

- **Users** - Authentication-enabled collection with admin access
- **Media** - Uploads collection with image handling

## Deploying

Deploy to Vercel, Railway, or any platform supporting Next.js:

```bash
npm run build
```

Ensure these environment variables are set in production:
- `DATABASE_URI`
- `PAYLOAD_SECRET`
- `NEXT_PUBLIC_SERVER_URL`

## Customization

Edit `src/payload.config.ts` to add:
- More collections
- Globals
- Hooks
- Access control
- Custom components

## License

MIT

## Support

[GitHub Issues](https://github.com/sentayhu19/test-payload/issues)
