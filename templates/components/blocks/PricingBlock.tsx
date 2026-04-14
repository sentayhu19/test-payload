import React from 'react'

type PlanFeature = {
  feature: string
}

type Plan = {
  name: string
  price: string
  period?: string
  description?: string
  features: PlanFeature[]
  ctaText?: string
  ctaLink?: string
  highlighted?: boolean
}

type Props = {
  heading?: string
  subheading?: string
  plans?: Plan[]
}

export function PricingBlock({ heading = 'Pricing Plans', subheading, plans }: Props) {
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
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '32px',
        }}
      >
        {(plans || []).map((plan, index) => (
          <div
            key={index}
            style={{
              background: '#fff',
              padding: '40px',
              borderRadius: '20px',
              boxShadow: plan.highlighted
                ? '0 10px 40px rgba(59, 130, 246, 0.2)'
                : '0 4px 20px rgba(0,0,0,0.08)',
              border: plan.highlighted ? '2px solid #3b82f6' : 'none',
              position: 'relative',
            }}
          >
            {plan.highlighted && (
              <div
                style={{
                  position: 'absolute',
                  top: '-12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #1e3a5f 100%)',
                  color: '#fff',
                  padding: '4px 16px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: 600,
                }}
              >
                Popular
              </div>
            )}
            <h3
              style={{ fontSize: '24px', color: '#1e3a5f', marginBottom: '8px', fontWeight: 700 }}
            >
              {plan.name}
            </h3>
            <div style={{ marginBottom: '24px' }}>
              <span style={{ fontSize: '48px', color: '#1e3a5f', fontWeight: 800 }}>
                {plan.price}
              </span>
              {plan.period && (
                <span style={{ fontSize: '18px', color: '#64748b', marginLeft: '4px' }}>
                  {plan.period}
                </span>
              )}
            </div>
            {plan.description && (
              <p
                style={{
                  fontSize: '16px',
                  color: '#64748b',
                  marginBottom: '24px',
                  lineHeight: 1.6,
                }}
              >
                {plan.description}
              </p>
            )}
            <ul style={{ marginBottom: '32px', listStyle: 'none', padding: 0 }}>
              {plan.features.map((feature, idx) => (
                <li
                  key={idx}
                  style={{
                    fontSize: '16px',
                    color: '#334155',
                    marginBottom: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <span style={{ color: '#3b82f6' }}>✓</span> {feature.feature}
                </li>
              ))}
            </ul>
            {plan.ctaText && plan.ctaLink && (
              <a
                href={plan.ctaLink}
                style={{
                  display: 'block',
                  textAlign: 'center',
                  padding: '16px 32px',
                  background: plan.highlighted
                    ? 'linear-gradient(135deg, #3b82f6 0%, #1e3a5f 100%)'
                    : '#1e3a5f',
                  color: '#fff',
                  textDecoration: 'none',
                  borderRadius: '12px',
                  fontSize: '18px',
                  fontWeight: 600,
                }}
              >
                {plan.ctaText}
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
