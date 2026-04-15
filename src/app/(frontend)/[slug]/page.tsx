import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

import config from '@/payload.config'
import { BlockRenderer } from '@/components/BlockRenderer'

export async function generateStaticParams() {
  const payload = await getPayload({ config })
  const pages = await payload.find({
    collection: 'pages',
    where: {
      _status: {
        equals: 'published',
      },
    },
    limit: 1000,
  })

  return pages.docs.map((page) => ({
    slug: page.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { isEnabled } = await draftMode()
  const payload = await getPayload({ config })

  const page = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
    draft: isEnabled,
  })

  const data = page.docs[0]
  if (!data) return {}

  return {
    title: data.seo?.metaTitle || data.title,
    description: data.seo?.metaDescription,
    robots: data.seo?.noIndex ? { index: false, follow: false } : { index: true, follow: true },
  }
}

export default async function DynamicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { isEnabled } = await draftMode()
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
    draft: isEnabled,
  })

  const page = result.docs[0]
  if (!page) notFound()

  const hasBlocks = Array.isArray(page.layout) && page.layout.length > 0

  return (
    <div style={{ minHeight: '100vh' }}>
      {hasBlocks ? (
        <BlockRenderer blocks={page.layout!} />
      ) : (
        <div
          style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '80px 40px',
            textAlign: 'center',
          }}
        >
          <h1 style={{ fontSize: '36px', fontWeight: 700, color: '#1e3a5f', marginBottom: '16px' }}>
            {page.title}
          </h1>
          <p style={{ fontSize: '18px', color: '#64748b' }}>
            This page has no content blocks yet. Add blocks in the admin panel.
          </p>
        </div>
      )}
    </div>
  )
}
