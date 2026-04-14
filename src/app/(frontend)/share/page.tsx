import React from 'react'

import { PageRenderer } from '../_components/PageRenderer'

import { getPageBySlug } from '@/lib/getPageBySlug'

export default async function SharePage() {
  const page = await getPageBySlug('share')

  return (
    <PageRenderer
      page={page}
      fallbackTitle="Share"
      fallbackDescription="Promote your brand, referral program, and newsletter from one managed page."
    />
  )
}
