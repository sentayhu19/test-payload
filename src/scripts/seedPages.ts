import 'dotenv/config'

import { getPayload } from 'payload'

import config from '@/payload.config'
import type { Page } from '@/payload-types'

type RichTextContent = {
  root: {
    type: 'root'
    version: 1
    direction: 'ltr'
    format: ''
    indent: 0
    children: Array<{
      type: 'paragraph'
      version: 1
      direction: 'ltr'
      format: ''
      indent: 0
      children: Array<{
        type: 'text'
        version: 1
        detail: 0
        format: 0
        mode: 'normal'
        style: ''
        text: string
      }>
    }>
  }
}

const paragraph = (text: string): RichTextContent['root']['children'][number] => ({
  type: 'paragraph',
  version: 1,
  direction: 'ltr',
  format: '',
  indent: 0,
  children: [
    {
      type: 'text',
      version: 1,
      detail: 0,
      format: 0,
      mode: 'normal',
      style: '',
      text,
    },
  ],
})

const richText = (...paragraphs: string[]): RichTextContent => ({
  root: {
    type: 'root',
    version: 1,
    direction: 'ltr',
    format: '',
    indent: 0,
    children: paragraphs.map(paragraph),
  },
})

type PageSeed = Omit<Page, 'id' | 'createdAt' | 'updatedAt' | 'collection' | 'heroImage'> & {
  heroImage?: number | null
}

const pages: PageSeed[] = [
  {
    title: 'Home',
    slug: 'home',
    layout: [
      {
        blockType: 'hero',
        title: 'Welcome to Your Site',
        subtitle: 'Build and manage your homepage content directly from the Payload admin panel.',
        ctaText: 'Get Started',
        ctaLink: '/contact-us',
      },
      {
        blockType: 'content',
        heading: 'Welcome',
        body: richText(
          'This is your homepage. Use the Payload admin to update the hero section, featured messaging, and page content.',
          'You can draft changes, preview them, and publish when ready.',
        ),
      },
    ],
  },
  {
    title: 'About Us',
    slug: 'about-us',
    layout: [
      {
        blockType: 'hero',
        title: 'About Us',
        subtitle: 'Share your story, mission, values, and what makes your brand unique.',
      },
      {
        blockType: 'content',
        heading: 'Our Story',
        body: richText(
          'Welcome to our company. We are dedicated to delivering exceptional products and services that meet the needs of our customers.',
          'Founded with a vision to make a difference, we continue to create value through quality, integrity, and customer-focused solutions.',
        ),
      },
    ],
  },
  {
    title: 'Contact Us',
    slug: 'contact-us',
    layout: [
      {
        blockType: 'hero',
        title: 'Get In Touch',
        subtitle: 'We would love to hear from you. Reach out and start the conversation.',
      },
      {
        blockType: 'contactForm',
        heading: 'Contact Information',
        email: 'contact@example.com',
        phone: '+1 (555) 123-4567',
        address: '123 Main Street, City, State 12345',
      },
    ],
  },
  {
    title: 'Share',
    slug: 'share',
    layout: [
      {
        blockType: 'hero',
        title: 'Share',
        subtitle: 'Promote your brand, links, referrals, and newsletter from one place.',
      },
      {
        blockType: 'content',
        heading: 'Share Our Content',
        body: richText(
          'Encourage visitors to share your content, join your newsletter, and participate in referral campaigns.',
          'All sections on this page can be edited directly from the Payload admin.',
        ),
      },
    ],
  },
]

async function seedPages() {
  const payload = await getPayload({ config })

  for (const page of pages) {
    const existing = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: page.slug,
        },
      },
      limit: 1,
      pagination: false,
    })

    if (existing.docs.length > 0) {
      console.log(`Skipping existing page: ${page.slug}`)
      continue
    }

    await payload.create({
      collection: 'pages',
      data: {
        ...page,
        _status: 'published',
      },
    })

    console.log(`Created page: ${page.slug}`)
  }
}

seedPages()
  .then(() => {
    console.log('Page seeding complete')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Failed to seed pages', error)
    process.exit(1)
  })
