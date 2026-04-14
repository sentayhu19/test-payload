import Image from 'next/image'
import React from 'react'

type GalleryImage = {
  image?: { url: string; alt?: string }
  caption?: string
}

type Props = {
  heading?: string
  images?: GalleryImage[]
  columns?: '2' | '3' | '4'
}

export function ImageGalleryBlock({ heading, images, columns = '3' }: Props) {
  const gridCols = {
    '2': 'repeat(2, minmax(0, 1fr))',
    '3': 'repeat(3, minmax(0, 1fr))',
    '4': 'repeat(4, minmax(0, 1fr))',
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 40px' }}>
      {heading && (
        <h2
          style={{
            fontSize: '36px',
            color: '#1e3a5f',
            marginBottom: '40px',
            fontWeight: 700,
            textAlign: 'center',
          }}
        >
          {heading}
        </h2>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: gridCols[columns], gap: '24px' }}>
        {(images || []).map((item, index) => (
          <div
            key={index}
            style={{
              position: 'relative',
              aspectRatio: '16/9',
              borderRadius: '12px',
              overflow: 'hidden',
            }}
          >
            {item.image && (
              <Image
                src={item.image.url || ''}
                alt={item.image.alt || item.caption || ''}
                fill
                style={{ objectFit: 'cover' }}
              />
            )}
            {item.caption && (
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '16px',
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                  color: '#fff',
                  fontSize: '14px',
                }}
              >
                {item.caption}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
