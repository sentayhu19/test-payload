import React from 'react'

import { RichTextContent } from '@/components/RichTextContent'

type Props = {
  heading?: string
  body?: unknown
}

export function ContentBlock({ heading, body }: Props) {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 40px' }}>
      {heading && (
        <h2 style={{ fontSize: '36px', color: '#1e3a5f', marginBottom: '24px', fontWeight: 700 }}>
          {heading}
        </h2>
      )}
      <div style={{ fontSize: '18px', lineHeight: 1.8, color: '#334155' }}>
        <RichTextContent content={body} />
      </div>
    </div>
  )
}
