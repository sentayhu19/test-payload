# Consumer Guide: Using payload-next-starter in Another Next.js App

This guide explains how to install and use `payload-next-starter` in a separate Next.js application to render dynamic content from a shared Payload CMS database.

## Architecture Overview

```
┌─────────────────────┐
│  Payload CMS App    │  ← This repo (manages content)
│  - Admin Panel      │
│  - Database: Neon   │
└──────────┬──────────┘
           │ Shared PostgreSQL DB
           │ (DATABASE_URL)
           │
┌──────────▼──────────┐
│  Consumer App 1     │  ← Your app (renders content)
│  - Next.js App      │
│  - BlockRenderer   │
│  - Dynamic [slug]  │
└─────────────────────┘

┌─────────────────────┐
│  Consumer App 2     │  ← Another app (same DB)
│  - Next.js App      │
│  - Different UI     │
└─────────────────────┘
```

## Quick Start

### 1. Install the Package

```bash
# In your Next.js project
npm install payload-next-starter
# or
pnpm add payload-next-starter
# or
yarn add payload-next-starter
```

### 2. Run the Setup Script

The setup script copies all necessary files (collections, components, routes) into your project:

```bash
npx payload-next-starter
```

This will:
- Copy `src/payload.config.ts` (with Pages collection)
- Copy `src/collections/` (Users, Media, Pages)
- Copy `src/components/` (BlockRenderer, RichTextContent, all block components)
- Copy `src/app/(payload)/` (admin panel routes)
- Copy `src/app/(frontend)/[slug]/page.tsx` (dynamic page renderer)
- Copy `src/scripts/seedPages.ts` (sample page seeder)
- Copy `src/app/next/preview/route.ts` (draft mode support)
- Install required dependencies
- Add scripts to your `package.json`

### 3. Configure Environment Variables

Create or update your `.env` file to point to the **same database** as the Payload CMS app:

```env
# Use the EXACT same DATABASE_URL as the CMS app
DATABASE_URL=postgresql://user:password@host:5432/database?sslmode=require

# Use the EXACT same PAYLOAD_SECRET as the CMS app
PAYLOAD_SECRET=your-secret-key-at-least-16-chars

# Your app's public URL (for preview links)
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

**Important:** All apps sharing content must use the same `DATABASE_URL` and `PAYLOAD_SECRET`.

### 4. Generate Payload Types

```bash
npm run generate:importmap
npm run generate:types
```

### 5. Update Next.js Config

If the setup script didn't update your `next.config.ts`, add `withPayload`:

```typescript
// next.config.ts
import { withPayload } from '@payloadcms/next/withPayload'

const nextConfig = {
  // your existing config
}

export default withPayload(nextConfig)
```

### 6. Start Your Dev Server

```bash
npm run dev
```

## How It Works

### Data Flow

1. **Admin Panel** (in CMS app): Content editors add/edit pages with blocks
2. **Database**: All content stored in PostgreSQL (shared across apps)
3. **Consumer App**: Fetches pages from DB using Payload's Local API
4. **BlockRenderer**: Renders each block component (Hero, Features, Pricing, etc.)

### Page Rendering

The dynamic route `src/app/(frontend)/[slug]/page.tsx` fetches pages from the database:

```typescript
// Automatically fetches page by slug from shared DB
const result = await payload.find({
  collection: 'pages',
  where: { slug: { equals: slug } },
  limit: 1,
})

// Renders blocks using BlockRenderer
<BlockRenderer blocks={page.layout} />
```

### Available Routes

After setup, your app will have these routes:

| Route | Purpose |
|-------|---------|
| `/admin` | Payload CMS admin panel (edit content) |
| `/[slug]` | Dynamic page renderer (e.g., `/home`, `/about-us`) |
| `/next/preview` | Draft mode preview endpoint |

## Using the Components

### BlockRenderer (for custom pages)

You can use the BlockRenderer in your own pages:

```tsx
import { BlockRenderer } from '@/components/BlockRenderer'

export default async function MyCustomPage() {
  const payload = await getPayload({ config })
  
  const page = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    limit: 1,
  })
  
  return (
    <main>
      <BlockRenderer blocks={page.docs[0].layout} />
    </main>
  )
}
```

### Individual Block Components

Import and use individual blocks:

```tsx
import { HeroBlock } from '@/components/blocks'
import { FeaturesBlock } from '@/components/blocks'

export default function CustomSection() {
  return (
    <>
      <HeroBlock
        title="Custom Hero"
        subtitle="Your content here"
        ctaText="Learn More"
        ctaLink="/about"
        alignment="center"
      />
      <FeaturesBlock
        heading="Our Features"
        columns="3"
        items={[
          { icon: '🚀', title: 'Fast', description: 'Blazing fast' },
          { icon: '🎨', title: 'Beautiful', description: 'Great design' },
        ]}
      />
    </>
  )
}
```

### RichTextContent

For rendering rich text from Payload:

```tsx
import { RichTextContent } from '@/components/RichTextContent'

export default function ContentSection({ content }) {
  return <RichTextContent content={content} />
}
```

## Available Blocks

All block components are available in `src/components/blocks/`:

| Block | Purpose |
|-------|---------|
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

## Seeding Sample Pages

To create sample pages in the database (only if they don't already exist):

```bash
npm run seed:pages
```

**Safe Mode (default):** Only creates pages that don't exist. Never overwrites existing content.

**Force Mode (dev only):** Update existing pages:
```bash
npm run seed:pages --force
```

This is useful for:
- Initial setup of a new database
- Adding sample content to test rendering
- **Not** for production data (use the admin panel instead)

## Content Management

### Editing Content

1. Go to `/admin` in your app
2. Log in with admin credentials
3. Navigate to **Pages** collection
4. Edit any page — add/remove/rearrange blocks
5. Save and publish

### Draft Mode

To preview draft pages:

1. Enable draft mode by visiting `/next/preview?secret=YOUR_PAYLOAD_SECRET&slug=/your-page`
2. View draft content before publishing
3. Disable draft mode when done

### SEO Metadata

Each page has SEO fields:
- `metaTitle` - Page title
- `metaDescription` - Page description
- `metaImage` - Social share image
- `noIndex` - Hide from search engines

## Customization

### Adding Custom Blocks

1. Define block in `src/collections/Pages.ts`:

```typescript
const CustomBlock: Block = {
  slug: 'custom',
  fields: [
    { name: 'title', type: 'text' },
    { name: 'content', type: 'richText' },
  ],
}
```

2. Add to Pages layout blocks array
3. Create component: `src/components/blocks/CustomBlock.tsx`
4. Add to BlockRenderer map
5. Run `npm run generate:types`

### Styling

Blocks use inline styles for simplicity. To customize:

1. Edit individual block components in `src/components/blocks/`
2. Or wrap BlockRenderer in your own styled container
3. Or use CSS-in-JS libraries (Tailwind, styled-components, etc.)

### Custom Layouts

You can create custom page layouts:

```tsx
// src/app/custom-page/page.tsx
import { getPayload } from 'payload'
import config from '@/payload.config'
import { BlockRenderer } from '@/components/BlockRenderer'

export default async function CustomPage() {
  const payload = await getPayload({ config })
  const page = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'custom' } },
    limit: 1,
  })
  
  return (
    <div className="my-custom-layout">
      <header>My Header</header>
      <BlockRenderer blocks={page.docs[0].layout} />
      <footer>My Footer</footer>
    </div>
  )
}
```

## Deployment

### Environment Variables

Ensure these are set in production:

```env
DATABASE_URL=postgresql://user:pass@host/db?sslmode=require
PAYLOAD_SECRET=your-production-secret
NEXT_PUBLIC_SERVER_URL=https://your-domain.com
```

### Database

- Use a managed PostgreSQL service (Neon, Supabase, RDS)
- Ensure SSL is enabled (`sslmode=require`)
- All apps must point to the same database

### Build

```bash
npm run build
npm start
```

## Troubleshooting

### Pages show "no content blocks yet"

Run the seed script to populate the database:
```bash
npm run seed:pages
```

### "Cannot find module" errors

Run type generation:
```bash
npm run generate:importmap
npm run generate:types
```

### Admin panel not accessible

Ensure `DATABASE_URL` and `PAYLOAD_SECRET` match the CMS app exactly.

### Content not updating across apps

- All apps must share the same `DATABASE_URL`
- Check database connection string is identical
- Verify pages are published (not draft)

## Best Practices

1. **One Source of Truth:** Only use the admin panel in one app to edit content. Other apps are read-only consumers.

2. **Seed Once:** Run `seed:pages` once per database to create sample content. Use `--force` only in development.

3. **Version Control:** Commit the setup files to your repo. Don't commit `.env`.

4. **Preview Before Publish:** Use draft mode to preview changes before going live.

5. **SEO:** Fill in meta titles and descriptions for all pages.

6. **Images:** Upload images through the admin panel for consistent sizing and optimization.

## Support

- Issues: https://github.com/sentayhu19/test-payload/issues
- Payload Docs: https://payloadcms.com/docs
- Next.js Docs: https://nextjs.org/docs
