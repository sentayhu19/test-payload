import React from 'react'

import { PageRenderer } from './_components/PageRenderer'

import { getPageBySlug } from '@/lib/getPageBySlug'

export default async function HomePage() {
  const page = await getPageBySlug('home')

  return (
    <PageRenderer
      page={page}
      fallbackTitle="Welcome"
      fallbackDescription="Create your homepage content from the Payload admin and publish when you're ready."
    />
  )
}
