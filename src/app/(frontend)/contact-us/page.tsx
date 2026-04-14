import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function ContactUsPage() {
  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Sticky Sidebar Navigation */}
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
        <h2 style={{ color: '#fff', fontSize: '24px', marginBottom: '30px', fontWeight: 700 }}>
          Navigation
        </h2>
        <Link
          href="/"
          style={{
            color: '#e2e8f0',
            textDecoration: 'none',
            padding: '15px 20px',
            borderRadius: '8px',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '16px',
            fontWeight: 500,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
            e.currentTarget.style.color = '#fff'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.color = '#e2e8f0'
          }}
        >
          <span>🏠</span> Home
        </Link>
        <Link
          href="/about-us"
          style={{
            color: '#e2e8f0',
            textDecoration: 'none',
            padding: '15px 20px',
            borderRadius: '8px',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '16px',
            fontWeight: 500,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
            e.currentTarget.style.color = '#fff'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.color = '#e2e8f0'
          }}
        >
          <span>ℹ️</span> About Us
        </Link>
        <Link
          href="/contact-us"
          style={{
            background: 'rgba(255,255,255,0.15)',
            color: '#fff',
            textDecoration: 'none',
            padding: '15px 20px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '16px',
            fontWeight: 500,
          }}
        >
          <span>📧</span> Contact Us
        </Link>
      </nav>

      {/* Main Content */}
      <main style={{ flex: 1, background: '#f8fafc' }}>
        {/* Hero Section with Image */}
        <div
          style={{
            position: 'relative',
            height: '400px',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image
            src="https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=1200&h=400&fit=crop"
            alt="Contact us header"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(135deg, rgba(30, 58, 95, 0.8) 0%, rgba(13, 33, 55, 0.6) 100%)',
            }}
          />
          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', color: '#fff' }}>
            <h1 style={{ fontSize: '48px', fontWeight: 800, marginBottom: '16px' }}>
              Get In Touch
            </h1>
            <p style={{ fontSize: '20px', opacity: 0.9 }}>We would love to hear from you</p>
          </div>
        </div>

        {/* Content Grid */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px' }}>
            {/* Contact Info Cards */}
            <div>
              <h2
                style={{
                  fontSize: '32px',
                  color: '#1e3a5f',
                  marginBottom: '30px',
                  fontWeight: 700,
                }}
              >
                Contact Information
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {/* Email Card */}
                <div
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
                    📧
                  </div>
                  <div>
                    <h3 style={{ fontSize: '18px', color: '#64748b', marginBottom: '8px' }}>
                      Email
                    </h3>
                    <p style={{ fontSize: '18px', color: '#1e3a5f', fontWeight: 600 }}>
                      contact@example.com
                    </p>
                  </div>
                </div>

                {/* Phone Card */}
                <div
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
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '28px',
                    }}
                  >
                    📞
                  </div>
                  <div>
                    <h3 style={{ fontSize: '18px', color: '#64748b', marginBottom: '8px' }}>
                      Phone
                    </h3>
                    <p style={{ fontSize: '18px', color: '#1e3a5f', fontWeight: 600 }}>
                      +1 (555) 123-4567
                    </p>
                  </div>
                </div>

                {/* Address Card */}
                <div
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
                      background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '28px',
                    }}
                  >
                    📍
                  </div>
                  <div>
                    <h3 style={{ fontSize: '18px', color: '#64748b', marginBottom: '8px' }}>
                      Address
                    </h3>
                    <p style={{ fontSize: '18px', color: '#1e3a5f', fontWeight: 600 }}>
                      123 Main Street, City, State 12345
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modern Contact Form */}
            <div>
              <h2
                style={{
                  fontSize: '32px',
                  color: '#1e3a5f',
                  marginBottom: '30px',
                  fontWeight: 700,
                }}
              >
                Send a Message
              </h2>
              <form
                style={{
                  background: '#fff',
                  padding: '40px',
                  borderRadius: '20px',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                }}
              >
                <div style={{ marginBottom: '24px' }}>
                  <label
                    htmlFor="name"
                    style={{
                      display: 'block',
                      fontSize: '14px',
                      color: '#64748b',
                      marginBottom: '8px',
                      fontWeight: 500,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    style={{
                      width: '100%',
                      padding: '16px 20px',
                      borderRadius: '12px',
                      border: '2px solid #e2e8f0',
                      fontSize: '16px',
                      transition: 'all 0.3s ease',
                      outline: 'none',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#3b82f6')}
                    onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')}
                  />
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label
                    htmlFor="email"
                    style={{
                      display: 'block',
                      fontSize: '14px',
                      color: '#64748b',
                      marginBottom: '8px',
                      fontWeight: 500,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="john@example.com"
                    style={{
                      width: '100%',
                      padding: '16px 20px',
                      borderRadius: '12px',
                      border: '2px solid #e2e8f0',
                      fontSize: '16px',
                      transition: 'all 0.3s ease',
                      outline: 'none',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#3b82f6')}
                    onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')}
                  />
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label
                    htmlFor="message"
                    style={{
                      display: 'block',
                      fontSize: '14px',
                      color: '#64748b',
                      marginBottom: '8px',
                      fontWeight: 500,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Tell us how we can help..."
                    style={{
                      width: '100%',
                      padding: '16px 20px',
                      borderRadius: '12px',
                      border: '2px solid #e2e8f0',
                      fontSize: '16px',
                      transition: 'all 0.3s ease',
                      outline: 'none',
                      resize: 'vertical',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#3b82f6')}
                    onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    width: '100%',
                    padding: '18px 40px',
                    background: 'linear-gradient(135deg, #3b82f6 0%, #1e3a5f 100%)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '18px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.5)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(59, 130, 246, 0.4)'
                  }}
                >
                  Send Message →
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
