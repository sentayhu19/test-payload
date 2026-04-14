'use client'

import React, { useState } from 'react'

type Question = {
  question: string
  answer: string
}

type Props = {
  heading?: string
  questions?: Question[]
}

export function FAQBlock({ heading = 'Frequently Asked Questions', questions }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '80px 40px' }}>
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {(questions || []).map((item, index) => (
          <div
            key={index}
            style={{
              background: '#fff',
              borderRadius: '12px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
              overflow: 'hidden',
            }}
          >
            <button
              onClick={() => toggle(index)}
              style={{
                width: '100%',
                padding: '20px 24px',
                background: 'none',
                border: 'none',
                textAlign: 'left',
                fontSize: '18px',
                color: '#1e3a5f',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              {item.question}
              <span
                style={{
                  fontSize: '20px',
                  transition: 'transform 0.3s',
                  transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
              >
                ▼
              </span>
            </button>
            {openIndex === index && (
              <div
                style={{
                  padding: '0 24px 24px',
                  fontSize: '16px',
                  color: '#64748b',
                  lineHeight: 1.7,
                }}
              >
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
