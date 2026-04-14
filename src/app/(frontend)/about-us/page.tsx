import React from 'react'

import { PageRenderer } from '../_components/PageRenderer'

import { getPageBySlug } from '@/lib/getPageBySlug'

export default async function AboutUsPage() {
  const page = await getPageBySlug('about-us')

  return (
    <PageRenderer
      page={page}
      fallbackTitle="About Us"
      fallbackDescription="Tell your story, mission, and what makes your brand different."
    />
  )
}
