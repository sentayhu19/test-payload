import React from 'react'

import { PageRenderer } from '../_components/PageRenderer'

import { getPageBySlug } from '@/lib/getPageBySlug'

export default async function ContactUsPage() {
  const page = await getPageBySlug('contact-us')

  return (
    <PageRenderer
      page={page}
      fallbackTitle="Contact Us"
      fallbackDescription="Manage your contact page hero, body content, navigation, and contact blocks from the admin."
    />
  )
}
