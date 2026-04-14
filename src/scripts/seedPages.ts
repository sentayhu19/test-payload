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
    heroTitle: 'Welcome to Your Site',
    heroDescription:
      'Build and manage your homepage content directly from the Payload admin panel.',
    content: richText(
      'This is your homepage. Use the Payload admin to update the hero section, featured messaging, and page content.',
      'You can draft changes, preview them, and publish when ready.',
    ),
  },
  {
    title: 'About Us',
    slug: 'about-us',
    heroTitle: 'About Us',
    heroDescription: 'Share your story, mission, values, and what makes your brand unique.',
    content: richText(
      'Welcome to our company. We are dedicated to delivering exceptional products and services that meet the needs of our customers.',
      'Founded with a vision to make a difference, we continue to create value through quality, integrity, and customer-focused solutions.',
    ),
  },
  {
    title: 'Contact Us',
    slug: 'contact-us',
    heroTitle: 'Get In Touch',
    heroDescription: 'We would love to hear from you. Reach out and start the conversation.',
    content: richText(
      'Use this page to share your business contact details, support guidance, and any extra instructions for visitors.',
      'You can fully edit the sidebar navigation, hero area, and contact cards from the admin.',
    ),
    sidebarNav: [
      { label: 'Home', url: '/' },
      { label: 'About Us', url: '/about-us' },
      { label: 'Contact Us', url: '/contact-us' },
    ],
    contactMethods: [
      { icon: 'email', label: 'Email', value: 'contact@example.com' },
      { icon: 'phone', label: 'Phone', value: '+1 (555) 123-4567' },
      { icon: 'location', label: 'Address', value: '123 Main Street, City, State 12345' },
    ],
  },
  {
    title: 'Share',
    slug: 'share',
    heroTitle: 'Share',
    heroDescription: 'Promote your brand, links, referrals, and newsletter from one place.',
    content: richText(
      'Encourage visitors to share your content, join your newsletter, and participate in referral campaigns.',
      'All sections on this page can be edited directly from the Payload admin.',
    ),
    shareLinks: [
      { label: 'Twitter', url: 'https://twitter.com/share' },
      { label: 'Facebook', url: 'https://facebook.com/share' },
      { label: 'LinkedIn', url: 'https://linkedin.com/shareArticle' },
      { label: 'Instagram', url: 'https://instagram.com' },
    ],
    referral: {
      title: 'Refer a Friend',
      description: 'Share your referral link and reward supporters for spreading the word.',
      link: 'https://example.com/ref/YOUR-CODE',
    },
    newsletter: {
      title: 'Newsletter',
      description: 'Let visitors subscribe to updates, launches, and new announcements.',
      placeholder: 'Enter your email',
      buttonLabel: 'Subscribe',
    },
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
