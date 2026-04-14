import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {
  title?: string
  subtitle?: string
  backgroundImage?: { url: string; alt?: string }
  ctaText?: string
  ctaLink?: string
  alignment?: 'left' | 'center' | 'right'
}

export function HeroBlock({
  title,
  subtitle,
  backgroundImage,
  ctaText,
  ctaLink,
  alignment = 'center',
}: Props) {
  const alignmentStyles: Record<
    string,
    { textAlign: 'left' | 'center' | 'right'; alignItems: string }
  > = {
    left: { textAlign: 'left', alignItems: 'flex-start' },
    center: { textAlign: 'center', alignItems: 'center' },
    right: { textAlign: 'right', alignItems: 'flex-end' },
  }

  const style = alignmentStyles[alignment]

  return (
    <div
      style={{
        position: 'relative',
        height: '400px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: style.alignItems,
      }}
    >
      {backgroundImage && (
        <Image
          src={backgroundImage.url || ''}
          alt={backgroundImage.alt || title || ''}
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      )}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(135deg, rgba(30, 58, 95, 0.8) 0%, rgba(13, 33, 55, 0.6) 100%)',
        }}
      />
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          textAlign: style.textAlign,
          color: '#fff',
          padding: '0 24px',
          maxWidth: '1200px',
          width: '100%',
        }}
      >
        <h1 style={{ fontSize: '48px', fontWeight: 800, marginBottom: '16px' }}>
          {title || 'Untitled'}
        </h1>
        {subtitle && (
          <p style={{ fontSize: '20px', opacity: 0.9, marginBottom: '24px' }}>{subtitle}</p>
        )}
        {ctaText && ctaLink && (
          <Link
            href={ctaLink}
            style={{
              display: 'inline-block',
              padding: '16px 32px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #1e3a5f 100%)',
              color: '#fff',
              textDecoration: 'none',
              borderRadius: '12px',
              fontSize: '18px',
              fontWeight: 600,
              boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)',
            }}
          >
            {ctaText}
          </Link>
        )}
      </div>
    </div>
  )
}
