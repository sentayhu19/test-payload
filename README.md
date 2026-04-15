# Payload Next.js Starter

A block-based page builder powered by PayloadCMS for Next.js. Install this package into any Next.js project to add a full CMS with dynamic page content that can be shared across multiple applications.

## Features

- **Block-Based Page Builder** — Hero, Content, Contact Form, Features, Pricing, Testimonials, CTA, Team, FAQ, Image Gallery
- **Multi-App Support** — Share one PostgreSQL database across multiple Next.js apps
- **Admin Panel** — Visual editor for managing pages and content
- **Dynamic Routes** — Automatic page rendering at `/[slug]`
- **SEO Fields** — Meta titles, descriptions, images per page
- **Draft Mode** — Preview changes before publishing
- **TypeScript** — Full type safety with generated types

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

The setup script will:
1. Copy Payload admin routes to `src/app/(payload)/`
2. Copy API routes to `src/app/api/[...payload]/`
3. Copy collections (Users, Media, Pages) to `src/collections/`
4. Copy block components to `src/components/blocks/`
5. Copy BlockRenderer and RichTextContent components
6. Copy dynamic `[slug]` page renderer to `src/app/(frontend)/[slug]/`
7. Copy seed script to `src/scripts/seedPages.ts`
8. Install required dependencies
9. Update `next.config.ts` with Payload plugin
10. Add scripts to `package.json`
11. Create `.env.example` with required variables

## After Installation

1. Copy `.env.example` to `.env` and fill in your values:
   ```bash
   DATABASE_URL=postgresql://user:password@host:5432/database?sslmode=require
   PAYLOAD_SECRET=your-secret-key-min-16-chars
   NEXT_PUBLIC_SERVER_URL=http://localhost:3000
   ```

2. Generate Payload import maps:
   ```bash
   npm run generate:importmap
   ```

3. Generate TypeScript types:
   ```bash
   npm run generate:types
   ```

4. Start your dev server:
   ```bash
   npm run dev
   ```

5. Visit `http://localhost:3000/admin` to create your first admin user

6. Seed sample pages (optional):
   ```bash
   npm run seed:pages
   ```

## Using in Another Next.js App

This package is designed to be installed in multiple Next.js apps that share the same database. See [CONSUMER_GUIDE.md](./CONSUMER_GUIDE.md) for detailed instructions on:

- Installing the package in a consumer app
- Configuring the shared database connection
- Rendering dynamic pages with BlockRenderer
- Using individual block components
- Managing content across multiple apps

## Collections Included

- **Users** — Authentication-enabled collection with admin access
- **Media** — Uploads collection with image handling
- **Pages** — Block-based page builder with SEO fields

## Available Blocks

| Block | Description |
|-------|-------------|
| `HeroBlock` | Hero section with title, subtitle, CTA |
| `ContentBlock` | Rich text content with heading |
| `ContactFormBlock` | Contact form with info display |
| `FeaturesBlock` | Feature grid with icons |
| `PricingBlock` | Pricing plans table |
| `TestimonialsBlock` | Customer testimonials |
| `CTABlock` | Call-to-action banner |
| `TeamBlock` | Team member cards |
| `FAQBlock` | Accordion FAQ section |
| `ImageGalleryBlock` | Image grid gallery |

## Sample Pages

After running `npm run seed:pages`, the following sample pages are created:

| Route | Content |
|-------|---------|
| `/home` | Hero → Features → Testimonials → CTA |
| `/about-us` | Hero → Story → Values → Team → CTA |
| `/contact-us` | Hero → Contact Form → FAQ |
| `/services` | Hero → Services → How We Work → CTA |
| `/pricing` | Hero → Pricing → FAQ → CTA |
| `/faq` | Hero → General FAQ → Technical FAQ → CTA |
| `/share` | Hero → Share Ways → Referral → Testimonials → CTA |

## Requirements

- Next.js 13+ with App Router
- Node.js 18.20+ or 20.9+
- PostgreSQL database (Neon, Supabase, or any managed Postgres)

## Deploying

Deploy to Vercel, Railway, or any platform supporting Next.js:

```bash
npm run build
```

Ensure these environment variables are set in production:
- `DATABASE_URL`
- `PAYLOAD_SECRET`
- `NEXT_PUBLIC_SERVER_URL`

## Customization

Edit `src/payload.config.ts` to add:
- More collections
- Globals
- Hooks
- Access control
- Custom block types

Edit block components in `src/components/blocks/` to customize styling and behavior.

## License

MIT

## Support

- [GitHub Issues](https://github.com/sentayhu19/test-payload/issues)
- [Consumer Guide](./CONSUMER_GUIDE.md) — For using in other Next.js apps
- [Payload Docs](https://payloadcms.com/docs)

