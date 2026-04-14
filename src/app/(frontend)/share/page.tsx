import React from 'react'

export default function SharePage() {
  return (
    <div className="share">
      <div className="content">
        <h1>Share</h1>
        <p>
          Share our content with your friends and followers. Spread the word
          and help us grow our community.
        </p>

        <div className="share-sections">
          <div className="share-card">
            <h2>Social Media</h2>
            <p>Follow us and share our posts on your favorite platforms:</p>
            <ul>
              <li>
                <a href="https://twitter.com/share" target="_blank" rel="noopener noreferrer">
                  Twitter
                </a>
              </li>
              <li>
                <a href="https://facebook.com/share" target="_blank" rel="noopener noreferrer">
                  Facebook
                </a>
              </li>
              <li>
                <a href="https://linkedin.com/share" target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              </li>
            </ul>
          </div>

          <div className="share-card">
            <h2>Refer a Friend</h2>
            <p>
              Know someone who would benefit from our services? Share your
              unique referral link and earn rewards.
            </p>
            <div className="referral-box">
              <input
                type="text"
                value="https://example.com/ref/YOUR-CODE"
                readOnly
              />
              <button>Copy Link</button>
            </div>
          </div>

          <div className="share-card">
            <h2>Newsletter</h2>
            <p>
              Stay updated with our latest news and updates. Subscribe to our
              newsletter and share it with others.
            </p>
            <form className="newsletter-form">
              <input type="email" placeholder="Enter your email" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
