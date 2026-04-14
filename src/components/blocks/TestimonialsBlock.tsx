import Image from 'next/image'
import React from 'react'

type Testimonial = {
  name: string
  role?: string
  company?: string
  quote: string
  avatar?: { url: string; alt?: string }
  rating?: string
}

type Props = {
  heading?: string
  testimonials?: Testimonial[]
}

export function TestimonialsBlock({ heading = 'What Our Customers Say', testimonials }: Props) {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 40px' }}>
      {heading && (
        <h2
          style={{
            fontSize: '36px',
            color: '#1e3a5f',
            marginBottom: '48px',
            fontWeight: 700,
            textAlign: 'center',
          }}
        >
          {heading}
        </h2>
      )}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '32px',
        }}
      >
        {(testimonials || []).map((testimonial, index) => (
          <div
            key={index}
            style={{
              background: '#fff',
              padding: '32px',
              borderRadius: '20px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            }}
          >
            <div style={{ marginBottom: '24px' }}>
              {testimonial.rating && (
                <div style={{ color: '#fbbf24', fontSize: '20px', marginBottom: '12px' }}>
                  {'★'.repeat(parseInt(testimonial.rating))}
                </div>
              )}
              <p
                style={{ fontSize: '18px', color: '#334155', lineHeight: 1.7, fontStyle: 'italic' }}
              >
                "{testimonial.quote}"
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              {testimonial.avatar && (
                <div
                  style={{ width: '56px', height: '56px', borderRadius: '50%', overflow: 'hidden' }}
                >
                  <Image
                    src={testimonial.avatar.url || ''}
                    alt={testimonial.avatar.alt || testimonial.name}
                    width={56}
                    height={56}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              )}
              <div>
                <div style={{ fontSize: '18px', color: '#1e3a5f', fontWeight: 600 }}>
                  {testimonial.name}
                </div>
                <div style={{ fontSize: '14px', color: '#64748b' }}>
                  {testimonial.role && testimonial.company
                    ? `${testimonial.role} at ${testimonial.company}`
                    : testimonial.role || testimonial.company || ''}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
