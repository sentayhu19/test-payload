import Link from 'next/link'
import React from 'react'

import { RichTextContent } from '@/components/RichTextContent'
import type { Page } from '@/payload-types'

type Props = {
  page: Page | null
  fallbackTitle: string
  fallbackDescription?: string
}

const iconMap: Record<string, string> = {
  email: '📧',
  phone: '📞',
  location: '📍',
  clock: '🕒',
}

function getMediaUrl(page: Page | null) {
  if (!page || typeof page.heroImage !== 'object' || !page.heroImage?.url) return null

  const baseURL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

  if (page.heroImage.url.startsWith('http')) return page.heroImage.url

  return `${baseURL}${page.heroImage.url}`
}

export function PageRenderer({ page, fallbackTitle, fallbackDescription }: Props) {
  const title = page?.heroTitle || page?.title || fallbackTitle
  const description = page?.heroDescription || fallbackDescription
  const imageURL = getMediaUrl(page)
  const nav = page?.sidebarNav?.length
    ? page.sidebarNav
    : [
        { label: 'Home', url: '/' },
        { label: 'About Us', url: '/about-us' },
        { label: 'Contact Us', url: '/contact-us' },
      ]

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <nav
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '240px',
          background: 'linear-gradient(180deg, #1e3a5f 0%, #0d2137 100%)',
          padding: '40px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          boxShadow: '4px 0 15px rgba(0,0,0,0.1)',
        }}
      >
        <h2 style={{ color: '#fff', fontSize: '24px', marginBottom: '30px', fontWeight: 700 }}>Navigation</h2>
        {nav.map((item, index) => (
          <Link
            key={`${item.url}-${index}`}
            href={item.url || '#'}
            style={{
              color: '#e2e8f0',
              textDecoration: 'none',
              padding: '15px 20px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '16px',
              fontWeight: 500,
              background: page?.slug && item.url === `/${page.slug}` ? 'rgba(255,255,255,0.15)' : 'transparent',
            }}
          >
            <span>•</span> {item.label}
          </Link>
        ))}
      </nav>

      <main style={{ flex: 1, background: '#f8fafc' }}>
        <div
          style={{
            position: 'relative',
            height: '400px',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: imageURL ? undefined : 'linear-gradient(135deg, #1e3a5f 0%, #0d2137 100%)',
          }}
        >
          {imageURL ? (
            <img src={imageURL} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : null}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, rgba(30, 58, 95, 0.8) 0%, rgba(13, 33, 55, 0.6) 100%)',
            }}
          />
          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', color: '#fff', padding: '0 24px' }}>
            <h1 style={{ fontSize: '48px', fontWeight: 800, marginBottom: '16px' }}>{title}</h1>
            {description ? <p style={{ fontSize: '20px', opacity: 0.9 }}>{description}</p> : null}
          </div>
        </div>

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 40px' }}>
          {page?.slug === 'contact-us' ? (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px' }}>
              <div>
                <h2 style={{ fontSize: '32px', color: '#1e3a5f', marginBottom: '30px', fontWeight: 700 }}>Contact Information</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {(page.contactMethods || []).map((item, index) => (
                    <div
                      key={`${item.label}-${index}`}
                      style={{
                        background: '#fff',
                        padding: '30px',
                        borderRadius: '16px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '20px',
                      }}
                    >
                      <div
                        style={{
                          width: '60px',
                          height: '60px',
                          background: 'linear-gradient(135deg, #3b82f6 0%, #1e3a5f 100%)',
                          borderRadius: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '28px',
                        }}
                      >
                        {iconMap[item.icon || 'email'] || '•'}
                      </div>
                      <div>
                        <h3 style={{ fontSize: '18px', color: '#64748b', marginBottom: '8px' }}>{item.label}</h3>
                        <p style={{ fontSize: '18px', color: '#1e3a5f', fontWeight: 600 }}>{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h2 style={{ fontSize: '32px', color: '#1e3a5f', marginBottom: '30px', fontWeight: 700 }}>Page Content</h2>
                <div
                  style={{
                    background: '#fff',
                    padding: '40px',
                    borderRadius: '20px',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                  }}
                >
                  <RichTextContent content={page?.content} />
                </div>
              </div>
            </div>
          ) : page?.slug === 'share' ? (
            <div style={{ display: 'grid', gap: '24px' }}>
              <div style={{ background: '#fff', padding: '32px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
                <RichTextContent content={page?.content} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '24px' }}>
                <div style={{ background: '#fff', padding: '28px', borderRadius: '18px', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}>
                  <h2>Social Links</h2>
                  <ul>
                    {(page.shareLinks || []).map((item, index) => (
                      <li key={`${item.url}-${index}`}>
                        <a href={item.url || '#'} target="_blank" rel="noreferrer noopener">
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div style={{ background: '#fff', padding: '28px', borderRadius: '18px', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}>
                  <h2>{page.referral?.title || 'Referral'}</h2>
                  <p>{page.referral?.description}</p>
                  {page.referral?.link ? <code>{page.referral.link}</code> : null}
                </div>
                <div style={{ background: '#fff', padding: '28px', borderRadius: '18px', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}>
                  <h2>{page.newsletter?.title || 'Newsletter'}</h2>
                  <p>{page.newsletter?.description}</p>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <input placeholder={page.newsletter?.placeholder || 'Enter your email'} style={{ flex: 1, padding: '12px 14px', borderRadius: '10px', border: '1px solid #cbd5e1' }} />
                    <button type="button" style={{ padding: '12px 16px', borderRadius: '10px', border: 'none', background: '#1e3a5f', color: '#fff' }}>
                      {page.newsletter?.buttonLabel || 'Subscribe'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ background: '#fff', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 40px rgba(0,0,0,0.08)' }}>
              <RichTextContent content={page?.content} />
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
