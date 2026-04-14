import type { CollectionConfig } from 'payload'

const getPreviewPath = (slug?: string) => {
  const baseURL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
  const path = slug === 'home' || !slug ? '/' : `/${slug}`
  const previewSecret = process.env.PAYLOAD_SECRET || ''

  return `${baseURL}/next/preview?secret=${encodeURIComponent(previewSecret)}&slug=${encodeURIComponent(path)}`
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
        description: 'Use one of: home, about-us, contact-us, share',
      },
    },
    {
      name: 'heroTitle',
      type: 'text',
    },
    {
      name: 'heroDescription',
      type: 'textarea',
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'sidebarNav',
      type: 'array',
      admin: {
        condition: (_, siblingData) => siblingData?.slug === 'contact-us',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'contactMethods',
      type: 'array',
      admin: {
        condition: (_, siblingData) => siblingData?.slug === 'contact-us',
      },
      fields: [
        {
          name: 'icon',
          type: 'select',
          required: true,
          options: [
            { label: 'Email', value: 'email' },
            { label: 'Phone', value: 'phone' },
            { label: 'Location', value: 'location' },
            { label: 'Clock', value: 'clock' },
          ],
        },
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'value',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'shareLinks',
      type: 'array',
      admin: {
        condition: (_, siblingData) => siblingData?.slug === 'share',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'referral',
      type: 'group',
      admin: {
        condition: (_, siblingData) => siblingData?.slug === 'share',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'link',
          type: 'text',
        },
      ],
    },
    {
      name: 'newsletter',
      type: 'group',
      admin: {
        condition: (_, siblingData) => siblingData?.slug === 'share',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'placeholder',
          type: 'text',
        },
        {
          name: 'buttonLabel',
          type: 'text',
        },
      ],
    },
  ],
}
