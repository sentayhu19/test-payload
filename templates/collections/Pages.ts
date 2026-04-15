import type { CollectionConfig, Block } from 'payload'

const getPreviewPath = (slug?: string) => {
  const baseURL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
  const path = slug === 'home' || !slug ? '/' : `/${slug}`
  const previewSecret = process.env.PAYLOAD_SECRET || ''

  return `${baseURL}/next/preview?secret=${encodeURIComponent(previewSecret)}&slug=${encodeURIComponent(path)}`
}

const HeroBlock: Block = {
  slug: 'hero',
  labels: {
    singular: 'Hero Section',
    plural: 'Hero Sections',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'subtitle', type: 'textarea' },
    { name: 'backgroundImage', type: 'upload', relationTo: 'media' },
    { name: 'ctaText', type: 'text', admin: { description: 'Call to action button text' } },
    { name: 'ctaLink', type: 'text', admin: { description: 'Call to action button link' } },
    {
      name: 'alignment',
      type: 'select',
      defaultValue: 'center',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
    },
  ],
}

const ContentBlock: Block = {
  slug: 'content',
  labels: {
    singular: 'Content Section',
    plural: 'Content Sections',
  },
  fields: [
    { name: 'heading', type: 'text' },
    { name: 'body', type: 'richText', required: true },
  ],
}

const ContactFormBlock: Block = {
  slug: 'contactForm',
  labels: {
    singular: 'Contact Form',
    plural: 'Contact Forms',
  },
  fields: [
    { name: 'heading', type: 'text', defaultValue: 'Get In Touch' },
    { name: 'description', type: 'textarea' },
    { name: 'email', type: 'text', required: true },
    { name: 'phone', type: 'text' },
    { name: 'address', type: 'textarea' },
    {
      name: 'formFields',
      type: 'select',
      hasMany: true,
      defaultValue: ['name', 'email', 'message'],
      options: [
        { label: 'Name', value: 'name' },
        { label: 'Email', value: 'email' },
        { label: 'Phone', value: 'phone' },
        { label: 'Subject', value: 'subject' },
        { label: 'Message', value: 'message' },
      ],
    },
  ],
}

const FeaturesBlock: Block = {
  slug: 'features',
  labels: {
    singular: 'Features Section',
    plural: 'Features Sections',
  },
  fields: [
    { name: 'heading', type: 'text' },
    { name: 'subheading', type: 'textarea' },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'icon', type: 'text', admin: { description: 'Emoji or icon name' } },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
      ],
    },
    {
      name: 'columns',
      type: 'select',
      defaultValue: '3',
      options: [
        { label: '2 Columns', value: '2' },
        { label: '3 Columns', value: '3' },
        { label: '4 Columns', value: '4' },
      ],
    },
  ],
}

const ImageGalleryBlock: Block = {
  slug: 'imageGallery',
  labels: {
    singular: 'Image Gallery',
    plural: 'Image Galleries',
  },
  fields: [
    { name: 'heading', type: 'text' },
    {
      name: 'images',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'caption', type: 'text' },
      ],
    },
    {
      name: 'columns',
      type: 'select',
      defaultValue: '3',
      options: [
        { label: '2 Columns', value: '2' },
        { label: '3 Columns', value: '3' },
        { label: '4 Columns', value: '4' },
      ],
    },
  ],
}

const PricingBlock: Block = {
  slug: 'pricing',
  labels: {
    singular: 'Pricing Section',
    plural: 'Pricing Sections',
  },
  fields: [
    { name: 'heading', type: 'text', defaultValue: 'Pricing Plans' },
    { name: 'subheading', type: 'textarea' },
    {
      name: 'plans',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'price', type: 'text', required: true },
        { name: 'period', type: 'text', defaultValue: '/month' },
        { name: 'description', type: 'textarea' },
        {
          name: 'features',
          type: 'array',
          fields: [{ name: 'feature', type: 'text', required: true }],
        },
        { name: 'ctaText', type: 'text', defaultValue: 'Get Started' },
        { name: 'ctaLink', type: 'text' },
        { name: 'highlighted', type: 'checkbox', defaultValue: false },
      ],
    },
  ],
}

const TestimonialsBlock: Block = {
  slug: 'testimonials',
  labels: {
    singular: 'Testimonials Section',
    plural: 'Testimonials Sections',
  },
  fields: [
    { name: 'heading', type: 'text', defaultValue: 'What Our Customers Say' },
    {
      name: 'testimonials',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'role', type: 'text' },
        { name: 'company', type: 'text' },
        { name: 'quote', type: 'textarea', required: true },
        { name: 'avatar', type: 'upload', relationTo: 'media' },
        {
          name: 'rating',
          type: 'select',
          options: [
            { label: '5 Stars', value: '5' },
            { label: '4 Stars', value: '4' },
            { label: '3 Stars', value: '3' },
          ],
        },
      ],
    },
  ],
}

const CTABlock: Block = {
  slug: 'cta',
  labels: {
    singular: 'Call to Action',
    plural: 'Call to Actions',
  },
  fields: [
    { name: 'heading', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
    { name: 'buttonText', type: 'text', required: true },
    { name: 'buttonLink', type: 'text', required: true },
    { name: 'secondaryButtonText', type: 'text' },
    { name: 'secondaryButtonLink', type: 'text' },
    {
      name: 'style',
      type: 'select',
      defaultValue: 'primary',
      options: [
        { label: 'Primary (Blue)', value: 'primary' },
        { label: 'Secondary (Gray)', value: 'secondary' },
        { label: 'Accent (Gradient)', value: 'accent' },
      ],
    },
  ],
}

const TeamBlock: Block = {
  slug: 'team',
  labels: {
    singular: 'Team Section',
    plural: 'Team Sections',
  },
  fields: [
    { name: 'heading', type: 'text', defaultValue: 'Meet Our Team' },
    { name: 'subheading', type: 'textarea' },
    {
      name: 'members',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'role', type: 'text', required: true },
        { name: 'bio', type: 'textarea' },
        { name: 'photo', type: 'upload', relationTo: 'media' },
        { name: 'linkedin', type: 'text' },
        { name: 'twitter', type: 'text' },
      ],
    },
  ],
}

const FAQBlock: Block = {
  slug: 'faq',
  labels: {
    singular: 'FAQ Section',
    plural: 'FAQ Sections',
  },
  fields: [
    { name: 'heading', type: 'text', defaultValue: 'Frequently Asked Questions' },
    {
      name: 'questions',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'textarea', required: true },
      ],
    },
  ],
}

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
    livePreview: {
      url: ({ data }) => {
        const pageData = data as { slug?: string } | undefined
        return getPreviewPath(pageData?.slug)
      },
    },
    preview: ({ data }) => {
      const pageData = data as { slug?: string } | undefined
      return getPreviewPath(pageData?.slug)
    },
  },
  versions: {
    drafts: {
      autosave: {
        interval: 300,
      },
      schedulePublish: true,
    },
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'slug',
              type: 'text',
              required: true,
              unique: true,
              index: true,
              admin: {
                description: 'URL path (e.g., "contact-us", "about", "pricing")',
              },
            },
            {
              name: 'layout',
              type: 'blocks',
              blocks: [
                HeroBlock,
                ContentBlock,
                ContactFormBlock,
                FeaturesBlock,
                ImageGalleryBlock,
                PricingBlock,
                TestimonialsBlock,
                CTABlock,
                TeamBlock,
                FAQBlock,
              ],
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'seo',
              type: 'group',
              fields: [
                {
                  name: 'metaTitle',
                  type: 'text',
                  admin: { description: 'Defaults to page title if empty' },
                },
                { name: 'metaDescription', type: 'textarea' },
                { name: 'metaImage', type: 'upload', relationTo: 'media' },
                { name: 'noIndex', type: 'checkbox', defaultValue: false },
              ],
            },
          ],
        },
      ],
    },
  ],
}
