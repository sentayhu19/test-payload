import React from 'react'

type Props = {
  heading?: string
  description?: string
  email?: string
  phone?: string
  address?: string
  formFields?: string[]
}

export function ContactFormBlock({
  heading = 'Get In Touch',
  description,
  email,
  phone,
  address,
  formFields = ['name', 'email', 'message'],
}: Props) {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 40px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px' }}>
        <div>
          <h2 style={{ fontSize: '32px', color: '#1e3a5f', marginBottom: '30px', fontWeight: 700 }}>
            {heading}
          </h2>
          {description && (
            <p style={{ fontSize: '18px', color: '#64748b', marginBottom: '30px' }}>
              {description}
            </p>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontSize: '24px' }}>📧</span>
              <a
                href={`mailto:${email}`}
                style={{ fontSize: '18px', color: '#1e3a5f', textDecoration: 'none' }}
              >
                {email}
              </a>
            </div>
            {phone && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{ fontSize: '24px' }}>📞</span>
                <a
                  href={`tel:${phone}`}
                  style={{ fontSize: '18px', color: '#1e3a5f', textDecoration: 'none' }}
                >
                  {phone}
                </a>
              </div>
            )}
            {address && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{ fontSize: '24px' }}>📍</span>
                <span style={{ fontSize: '18px', color: '#1e3a5f' }}>{address}</span>
              </div>
            )}
          </div>
        </div>
        <form
          style={{
            background: '#fff',
            padding: '40px',
            borderRadius: '20px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
          }}
        >
          {formFields.includes('name') && (
            <div style={{ marginBottom: '20px' }}>
              <label
                htmlFor="name"
                style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '14px',
                  color: '#64748b',
                  fontWeight: 500,
                }}
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: '2px solid #e2e8f0',
                  fontSize: '16px',
                }}
              />
            </div>
          )}
          {formFields.includes('email') && (
            <div style={{ marginBottom: '20px' }}>
              <label
                htmlFor="email"
                style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '14px',
                  color: '#64748b',
                  fontWeight: 500,
                }}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: '2px solid #e2e8f0',
                  fontSize: '16px',
                }}
              />
            </div>
          )}
          {formFields.includes('phone') && (
            <div style={{ marginBottom: '20px' }}>
              <label
                htmlFor="phone"
                style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '14px',
                  color: '#64748b',
                  fontWeight: 500,
                }}
              >
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: '2px solid #e2e8f0',
                  fontSize: '16px',
                }}
              />
            </div>
          )}
          {formFields.includes('subject') && (
            <div style={{ marginBottom: '20px' }}>
              <label
                htmlFor="subject"
                style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '14px',
                  color: '#64748b',
                  fontWeight: 500,
                }}
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: '2px solid #e2e8f0',
                  fontSize: '16px',
                }}
              />
            </div>
          )}
          {formFields.includes('message') && (
            <div style={{ marginBottom: '20px' }}>
              <label
                htmlFor="message"
                style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '14px',
                  color: '#64748b',
                  fontWeight: 500,
                }}
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: '2px solid #e2e8f0',
                  fontSize: '16px',
                  resize: 'vertical',
                }}
              />
            </div>
          )}
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '16px 32px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #1e3a5f 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: '12px',
              fontSize: '18px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  )
}
