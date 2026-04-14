import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type TeamMember = {
  name: string
  role: string
  bio?: string
  photo?: { url: string; alt?: string }
  linkedin?: string
  twitter?: string
}

type Props = {
  heading?: string
  subheading?: string
  members?: TeamMember[]
}

export function TeamBlock({ heading = 'Meet Our Team', subheading, members }: Props) {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 40px' }}>
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
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '32px',
        }}
      >
        {(members || []).map((member, index) => (
          <div
            key={index}
            style={{
              background: '#fff',
              padding: '32px',
              borderRadius: '20px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              textAlign: 'center',
            }}
          >
            {member.photo && (
              <div
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  margin: '0 auto 20px',
                }}
              >
                <Image
                  src={member.photo.url || ''}
                  alt={member.photo.alt || member.name}
                  width={120}
                  height={120}
                  style={{ objectFit: 'cover' }}
                />
              </div>
            )}
            <h3
              style={{ fontSize: '20px', color: '#1e3a5f', marginBottom: '8px', fontWeight: 600 }}
            >
              {member.name}
            </h3>
            <p style={{ fontSize: '16px', color: '#64748b', marginBottom: '16px' }}>
              {member.role}
            </p>
            {member.bio && (
              <p
                style={{
                  fontSize: '14px',
                  color: '#334155',
                  lineHeight: 1.6,
                  marginBottom: '16px',
                }}
              >
                {member.bio}
              </p>
            )}
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              {member.linkedin && (
                <Link
                  href={member.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  style={{ fontSize: '20px', textDecoration: 'none' }}
                >
                  LinkedIn
                </Link>
              )}
              {member.twitter && (
                <Link
                  href={member.twitter}
                  target="_blank"
                  rel="noreferrer"
                  style={{ fontSize: '20px', textDecoration: 'none' }}
                >
                  Twitter
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
