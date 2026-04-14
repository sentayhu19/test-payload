import React from 'react'

type FeatureItem = {
  icon?: string
  title: string
  description?: string
}

type Props = {
  heading?: string
  subheading?: string
  items?: FeatureItem[]
  columns?: '2' | '3' | '4'
}

export function FeaturesBlock({ heading, subheading, items, columns = '3' }: Props) {
  const gridCols = {
    '2': 'repeat(2, minmax(0, 1fr))',
    '3': 'repeat(3, minmax(0, 1fr))',
    '4': 'repeat(4, minmax(0, 1fr))',
  }

  return (
    <div
      style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 40px', background: '#f8fafc' }}
    >
      {heading && (
        <h2
          style={{
            fontSize: '36px',
            color: '#1e3a5f',
            marginBottom: '16px',
            fontWeight: 700,
            textAlign: 'center',
          }}
        >
          {heading}
        </h2>
      )}
      {subheading && (
        <p
          style={{
            fontSize: '18px',
            color: '#64748b',
            marginBottom: '48px',
            textAlign: 'center',
            maxWidth: '700px',
            margin: '0 auto 48px',
          }}
        >
          {subheading}
        </p>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: gridCols[columns], gap: '32px' }}>
        {(items || []).map((item, index) => (
          <div
            key={index}
            style={{
              background: '#fff',
              padding: '32px',
              borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              textAlign: 'center',
            }}
          >
            {item.icon && <div style={{ fontSize: '48px', marginBottom: '16px' }}>{item.icon}</div>}
            <h3
              style={{ fontSize: '20px', color: '#1e3a5f', marginBottom: '12px', fontWeight: 600 }}
            >
              {item.title}
            </h3>
            {item.description && (
              <p style={{ fontSize: '16px', color: '#64748b', lineHeight: 1.6 }}>
                {item.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
