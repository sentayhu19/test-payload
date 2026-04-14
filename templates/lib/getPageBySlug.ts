import { draftMode } from 'next/headers'
import { getPayload } from 'payload'

import config from '@/payload.config'
import type { Page } from '@/payload-types'

export async function getPageBySlug(slug: string): Promise<Page | null> {
  const { isEnabled } = await draftMode()
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 1,
    draft: isEnabled,
    limit: 1,
    pagination: false,
  })

  return result.docs[0] || null
}
