import Link from 'next/link'
import React from 'react'

type Props = {
  heading?: string
  description?: string
  buttonText?: string
  buttonLink?: string
  secondaryButtonText?: string
  secondaryButtonLink?: string
  style?: 'primary' | 'secondary' | 'accent'
}

export function CTABlock({
  heading,
  description,
  buttonText,
  buttonLink,
  secondaryButtonText,
  secondaryButtonLink,
  style = 'primary',
}: Props) {
  const backgrounds = {
    primary: 'linear-gradient(135deg, #1e3a5f 0%, #0d2137 100%)',
    secondary: 'linear-gradient(135deg, #475569 0%, #334155 100%)',
    accent: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
  }

  return (
    <div
      style={{
        padding: '80px 40px',
        background: backgrounds[style],
        textAlign: 'center',
        color: '#fff',
      }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '36px', marginBottom: '16px', fontWeight: 700 }}>{heading}</h2>
        {description && (
          <p style={{ fontSize: '20px', marginBottom: '32px', opacity: 0.9 }}>{description}</p>
        )}
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {buttonText && buttonLink && (
            <Link
              href={buttonLink}
              style={{
                padding: '16px 32px',
                background: '#fff',
                color: '#1e3a5f',
                textDecoration: 'none',
                borderRadius: '12px',
                fontSize: '18px',
                fontWeight: 600,
              }}
            >
              {buttonText}
            </Link>
          )}
          {secondaryButtonText && secondaryButtonLink && (
            <Link
              href={secondaryButtonLink}
              style={{
                padding: '16px 32px',
                background: 'transparent',
                color: '#fff',
                textDecoration: 'none',
                borderRadius: '12px',
                fontSize: '18px',
                fontWeight: 600,
                border: '2px solid #fff',
              }}
            >
              {secondaryButtonText}
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
