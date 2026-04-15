import 'dotenv/config'

import { getPayload } from 'payload'

import config from '@/payload.config'

// ── Rich Text helpers ──────────────────────────────────────────────────
type LexicalNode = {
  type: string
  version: number
  [key: string]: unknown
}

const textNode = (text: string, format: number = 0): LexicalNode => ({
  type: 'text',
  version: 1,
  detail: 0,
  format,
  mode: 'normal',
  style: '',
  text,
})

const paragraph = (...parts: Array<string | LexicalNode>): LexicalNode => ({
  type: 'paragraph',
  version: 1,
  direction: 'ltr',
  format: '',
  indent: 0,
  children: parts.map((p) => (typeof p === 'string' ? textNode(p) : p)),
})

const heading = (text: string, tag: string = 'h2'): LexicalNode => ({
  type: 'heading',
  version: 1,
  direction: 'ltr',
  format: '',
  indent: 0,
  tag,
  children: [textNode(text)],
})

const richText = (...nodes: LexicalNode[]) => ({
  root: {
    type: 'root',
    version: 1,
    direction: 'ltr',
    format: '',
    indent: 0,
    children: nodes,
  },
})

// ── Page seed data ─────────────────────────────────────────────────────
type PageSeed = {
  title: string
  slug: string
  layout: Record<string, unknown>[]
  seo?: {
    metaTitle?: string
    metaDescription?: string
    noIndex?: boolean
  }
}

const pages: PageSeed[] = [
  // ─── HOME ──────────────────────────────────────────────────────────
  {
    title: 'Home',
    slug: 'home',
    seo: {
      metaTitle: 'Home — Your Dynamic Site',
      metaDescription:
        'Welcome to our dynamic website powered by Payload CMS. Manage every section from the admin panel.',
    },
    layout: [
      {
        blockType: 'hero',
        title: 'Build Beautiful Sites with Dynamic Content',
        subtitle:
          'Manage every section of your website from a powerful admin panel. No code changes required — just edit, preview, and publish.',
        ctaText: 'Explore Features',
        ctaLink: '/services',
        alignment: 'center',
      },
      {
        blockType: 'features',
        heading: 'Why Choose Us',
        subheading: 'Everything you need to build and manage a modern website, all in one place.',
        columns: '3',
        items: [
          {
            icon: '🚀',
            title: 'Lightning Fast',
            description:
              'Built on Next.js with server-side rendering for blazing performance and SEO.',
          },
          {
            icon: '🎨',
            title: 'Fully Customizable',
            description:
              'Every section is a block you can add, remove, or rearrange from the admin panel.',
          },
          {
            icon: '📱',
            title: 'Responsive Design',
            description:
              'Looks great on every device — desktop, tablet, and mobile out of the box.',
          },
          {
            icon: '🔒',
            title: 'Secure & Reliable',
            description: 'Role-based access control, draft previews, and version history built in.',
          },
          {
            icon: '🌍',
            title: 'Multi-App Ready',
            description:
              'Share one database across multiple Next.js apps. Install via npm and render dynamic content anywhere.',
          },
          {
            icon: '⚡',
            title: 'Real-Time Previews',
            description: 'See your changes before publishing with live preview and draft mode.',
          },
        ],
      },
      {
        blockType: 'testimonials',
        heading: 'What People Are Saying',
        testimonials: [
          {
            name: 'Sarah Johnson',
            role: 'CTO',
            company: 'TechFlow Inc.',
            quote:
              'This CMS transformed how we manage content across three separate apps. The block-based editor is incredibly intuitive.',
            rating: '5',
          },
          {
            name: 'Marcus Chen',
            role: 'Lead Developer',
            company: 'Digital Wave',
            quote:
              'Installing it as an npm package and sharing the same database across projects saved us weeks of development time.',
            rating: '5',
          },
          {
            name: 'Emily Rodriguez',
            role: 'Product Manager',
            company: 'Startup Labs',
            quote:
              'Our marketing team can now update pages without filing tickets. The draft and publish workflow is seamless.',
            rating: '4',
          },
        ],
      },
      {
        blockType: 'cta',
        heading: 'Ready to Get Started?',
        description:
          'Join hundreds of teams building better websites with dynamic content management.',
        buttonText: 'Contact Us',
        buttonLink: '/contact-us',
        secondaryButtonText: 'View Pricing',
        secondaryButtonLink: '/pricing',
        style: 'accent',
      },
    ],
  },

  // ─── ABOUT US ──────────────────────────────────────────────────────
  {
    title: 'About Us',
    slug: 'about-us',
    seo: {
      metaTitle: 'About Us — Our Mission & Team',
      metaDescription: 'Learn about our mission, values, and the team behind our platform.',
    },
    layout: [
      {
        blockType: 'hero',
        title: 'About Our Company',
        subtitle:
          'We believe in empowering teams to build exceptional digital experiences with the tools they already love.',
        alignment: 'center',
      },
      {
        blockType: 'content',
        heading: 'Our Story',
        body: richText(
          paragraph(
            'We started with a simple idea: content management should be flexible, developer-friendly, and powerful enough to serve multiple applications from a single source of truth.',
          ),
          paragraph(
            'Today, our platform powers websites, apps, and digital experiences for companies of all sizes. Built on top of Payload CMS and Next.js, we provide a block-based page builder that lets non-technical users create beautiful pages while developers maintain full control over the codebase.',
          ),
          paragraph(
            'Our approach is different — instead of locking you into a proprietary ecosystem, we give you an npm package that integrates seamlessly into any Next.js project. Your content lives in a shared PostgreSQL database, and every page section can be managed through an intuitive admin panel.',
          ),
        ),
      },
      {
        blockType: 'features',
        heading: 'Our Values',
        columns: '3',
        items: [
          {
            icon: '💡',
            title: 'Innovation',
            description:
              'We constantly push boundaries to deliver cutting-edge solutions that anticipate future needs.',
          },
          {
            icon: '🤝',
            title: 'Collaboration',
            description:
              'We work closely with our community to build features that matter and solve real problems.',
          },
          {
            icon: '✨',
            title: 'Quality',
            description:
              'Every feature is thoroughly tested. We ship production-ready code, not prototypes.',
          },
        ],
      },
      {
        blockType: 'team',
        heading: 'Meet Our Team',
        subheading: 'The talented people behind our platform who make it all possible.',
        members: [
          {
            name: 'Alex Thompson',
            role: 'CEO & Founder',
            bio: 'Passionate about developer tools and open-source. Previously led engineering at a top SaaS company.',
          },
          {
            name: 'Maria Garcia',
            role: 'Head of Product',
            bio: 'Expert in user experience and product strategy. Believes great software should be invisible.',
          },
          {
            name: 'David Kim',
            role: 'Lead Engineer',
            bio: 'Full-stack developer specializing in Next.js and headless CMS architectures.',
          },
          {
            name: 'Olivia Brown',
            role: 'Designer',
            bio: 'Creates intuitive interfaces that make complex tools feel simple and delightful to use.',
          },
        ],
      },
      {
        blockType: 'cta',
        heading: 'Want to Join Our Team?',
        description:
          "We're always looking for talented people who share our passion for great software.",
        buttonText: 'Get In Touch',
        buttonLink: '/contact-us',
        style: 'primary',
      },
    ],
  },

  // ─── CONTACT US ────────────────────────────────────────────────────
  {
    title: 'Contact Us',
    slug: 'contact-us',
    seo: {
      metaTitle: 'Contact Us — Get In Touch',
      metaDescription:
        'Have a question or want to work together? Reach out and we will get back to you promptly.',
    },
    layout: [
      {
        blockType: 'hero',
        title: 'Get In Touch',
        subtitle:
          "Whether you have a question, feedback, or just want to say hello — we'd love to hear from you.",
        alignment: 'center',
      },
      {
        blockType: 'contactForm',
        heading: 'Send Us a Message',
        description:
          'Fill out the form and our team will respond within 24 hours. For urgent matters, call us directly.',
        email: 'hello@example.com',
        phone: '+1 (555) 123-4567',
        address: '123 Innovation Drive, Suite 400\nSan Francisco, CA 94107',
        formFields: ['name', 'email', 'subject', 'message'],
      },
      {
        blockType: 'faq',
        heading: 'Common Questions',
        questions: [
          {
            question: 'What is the typical response time?',
            answer:
              'We aim to respond to all inquiries within 24 hours during business days. Urgent requests are handled within 4 hours.',
          },
          {
            question: 'Do you offer technical support?',
            answer:
              'Yes! We offer email support for all users and priority support with dedicated response times for premium plans.',
          },
          {
            question: 'Can I schedule a demo?',
            answer:
              'Absolutely. Use the contact form above or email us directly at hello@example.com to set up a personalized demo.',
          },
        ],
      },
    ],
  },

  // ─── SERVICES ──────────────────────────────────────────────────────
  {
    title: 'Services',
    slug: 'services',
    seo: {
      metaTitle: 'Our Services',
      metaDescription:
        'Explore our range of services from web development to content strategy and ongoing support.',
    },
    layout: [
      {
        blockType: 'hero',
        title: 'Our Services',
        subtitle:
          'From strategy to deployment and beyond — we offer everything you need to succeed online.',
        ctaText: 'Get a Quote',
        ctaLink: '/contact-us',
        alignment: 'center',
      },
      {
        blockType: 'features',
        heading: 'What We Offer',
        subheading: 'Comprehensive solutions tailored to your needs, powered by modern technology.',
        columns: '3',
        items: [
          {
            icon: '🖥️',
            title: 'Web Development',
            description:
              'Custom Next.js applications with server-side rendering, API routes, and headless CMS integration.',
          },
          {
            icon: '📝',
            title: 'Content Strategy',
            description:
              'Block-based page building and content architecture that empowers your marketing team.',
          },
          {
            icon: '🔧',
            title: 'CMS Setup & Migration',
            description:
              'Expert Payload CMS configuration, data migration, and custom field development.',
          },
          {
            icon: '📊',
            title: 'Analytics & SEO',
            description:
              'Built-in SEO fields, meta tags, and structured data to help your pages rank higher.',
          },
          {
            icon: '🛡️',
            title: 'Security & Compliance',
            description:
              'Role-based access control, audit logs, and secure authentication out of the box.',
          },
          {
            icon: '🔄',
            title: 'Ongoing Support',
            description:
              'Dedicated maintenance, updates, and support to keep your site running smoothly.',
          },
        ],
      },
      {
        blockType: 'content',
        heading: 'How We Work',
        body: richText(
          heading('1. Discovery', 'h3'),
          paragraph(
            'We start by understanding your goals, audience, and technical requirements. This helps us design a solution that fits your exact needs.',
          ),
          heading('2. Design & Build', 'h3'),
          paragraph(
            'Our team creates a beautiful, responsive site with modular blocks that your team can manage independently.',
          ),
          heading('3. Launch & Optimize', 'h3'),
          paragraph(
            'We deploy your site, train your team on the admin panel, and continuously optimize for performance and conversions.',
          ),
        ),
      },
      {
        blockType: 'cta',
        heading: 'Let Us Build Something Great Together',
        description:
          'Tell us about your project and we will provide a free consultation and quote.',
        buttonText: 'Start Your Project',
        buttonLink: '/contact-us',
        style: 'accent',
      },
    ],
  },

  // ─── PRICING ───────────────────────────────────────────────────────
  {
    title: 'Pricing',
    slug: 'pricing',
    seo: {
      metaTitle: 'Pricing — Plans for Every Team',
      metaDescription:
        'Simple, transparent pricing. Choose the plan that fits your team and scale as you grow.',
    },
    layout: [
      {
        blockType: 'hero',
        title: 'Simple, Transparent Pricing',
        subtitle: 'No hidden fees. No surprises. Pick a plan and start building today.',
        alignment: 'center',
      },
      {
        blockType: 'pricing',
        heading: 'Choose Your Plan',
        subheading: 'All plans include a 14-day free trial. No credit card required.',
        plans: [
          {
            name: 'Starter',
            price: '$0',
            period: '/month',
            description: 'Perfect for personal projects and experiments.',
            features: [
              { feature: '1 project' },
              { feature: 'Up to 5 pages' },
              { feature: 'Community support' },
              { feature: 'All block types' },
              { feature: 'Basic SEO fields' },
            ],
            ctaText: 'Get Started Free',
            ctaLink: '/contact-us',
            highlighted: false,
          },
          {
            name: 'Professional',
            price: '$29',
            period: '/month',
            description: 'For growing teams who need more power and flexibility.',
            features: [
              { feature: 'Unlimited projects' },
              { feature: 'Unlimited pages' },
              { feature: 'Priority email support' },
              { feature: 'Multi-app database sharing' },
              { feature: 'Advanced SEO & analytics' },
              { feature: 'Draft preview & scheduling' },
            ],
            ctaText: 'Start Free Trial',
            ctaLink: '/contact-us',
            highlighted: true,
          },
          {
            name: 'Enterprise',
            price: '$99',
            period: '/month',
            description: 'For large organizations with custom requirements.',
            features: [
              { feature: 'Everything in Professional' },
              { feature: 'Dedicated support manager' },
              { feature: 'Custom block development' },
              { feature: 'SLA guarantee' },
              { feature: 'SSO & advanced security' },
              { feature: 'White-label admin panel' },
            ],
            ctaText: 'Contact Sales',
            ctaLink: '/contact-us',
            highlighted: false,
          },
        ],
      },
      {
        blockType: 'faq',
        heading: 'Pricing FAQ',
        questions: [
          {
            question: 'Can I switch plans later?',
            answer:
              'Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.',
          },
          {
            question: 'Is there a free trial?',
            answer:
              'All paid plans include a 14-day free trial. No credit card is required to start.',
          },
          {
            question: 'What payment methods do you accept?',
            answer:
              'We accept all major credit cards, PayPal, and bank transfers for annual enterprise plans.',
          },
          {
            question: 'Can I cancel anytime?',
            answer:
              'Absolutely. There are no long-term contracts. Cancel anytime and you will not be charged again.',
          },
        ],
      },
      {
        blockType: 'cta',
        heading: 'Need a Custom Plan?',
        description: 'We offer tailored solutions for organizations with unique requirements.',
        buttonText: 'Talk to Sales',
        buttonLink: '/contact-us',
        secondaryButtonText: 'Compare Plans',
        secondaryButtonLink: '/pricing',
        style: 'secondary',
      },
    ],
  },

  // ─── FAQ ───────────────────────────────────────────────────────────
  {
    title: 'FAQ',
    slug: 'faq',
    seo: {
      metaTitle: 'Frequently Asked Questions',
      metaDescription:
        'Find answers to common questions about our platform, setup, pricing, and more.',
    },
    layout: [
      {
        blockType: 'hero',
        title: 'Frequently Asked Questions',
        subtitle: "Everything you need to know. Can't find an answer? Contact us.",
        alignment: 'center',
      },
      {
        blockType: 'faq',
        heading: 'General Questions',
        questions: [
          {
            question: 'What is this platform?',
            answer:
              'It is a dynamic content management system built on Payload CMS and Next.js. You install it as an npm package in any Next.js project, connect it to a shared database, and all your pages become editable from an admin panel.',
          },
          {
            question: 'How does the block-based editor work?',
            answer:
              'Each page is made up of reusable blocks — Hero, Content, Features, Pricing, Contact Form, FAQ, Testimonials, CTA, Team, and Image Gallery. You add, remove, and rearrange blocks in the admin panel to build any page layout.',
          },
          {
            question: 'Can I use this with an existing Next.js app?',
            answer:
              'Yes! Install the package via npm, run the setup script, and your existing app gains a full CMS-powered page system. It does not interfere with your existing routes.',
          },
          {
            question: 'Can multiple apps share the same database?',
            answer:
              'Absolutely. Point multiple Next.js applications to the same PostgreSQL database and they will all render the same dynamic content. Update once, see changes everywhere.',
          },
          {
            question: 'Do I need to know how to code to edit content?',
            answer:
              'No. The admin panel provides a visual editor where you can modify text, upload images, toggle options, and publish pages — no code required.',
          },
        ],
      },
      {
        blockType: 'faq',
        heading: 'Technical Questions',
        questions: [
          {
            question: 'What database is supported?',
            answer:
              'PostgreSQL is the primary supported database. We recommend Neon, Supabase, or any managed Postgres provider for production use.',
          },
          {
            question: 'How do I deploy?',
            answer:
              'Deploy like any Next.js app — Vercel, Netlify, Railway, or your own server. Set the DATABASE_URL environment variable and the CMS connects automatically.',
          },
          {
            question: 'Is there version control for content?',
            answer:
              'Yes. Every page has drafts, version history, and scheduled publishing. You can preview changes before they go live.',
          },
          {
            question: 'Can I create custom blocks?',
            answer:
              'Yes. Developers can define new block types in the Payload collection config and create matching React components. The admin panel will automatically support them.',
          },
        ],
      },
      {
        blockType: 'cta',
        heading: 'Still Have Questions?',
        description: 'Our team is happy to help. Reach out anytime.',
        buttonText: 'Contact Support',
        buttonLink: '/contact-us',
        style: 'primary',
      },
    ],
  },

  // ─── SHARE ─────────────────────────────────────────────────────────
  {
    title: 'Share',
    slug: 'share',
    seo: {
      metaTitle: 'Share — Spread the Word',
      metaDescription:
        'Share our platform with your network. Referral links, social sharing, and newsletter signup.',
    },
    layout: [
      {
        blockType: 'hero',
        title: 'Spread the Word',
        subtitle:
          'Love what we do? Help us grow by sharing with your network and joining our community.',
        ctaText: 'Join Newsletter',
        ctaLink: '#newsletter',
        alignment: 'center',
      },
      {
        blockType: 'features',
        heading: 'Ways to Share',
        columns: '3',
        items: [
          {
            icon: '🔗',
            title: 'Share Your Link',
            description:
              'Copy your unique referral link and share it with friends, colleagues, or on social media.',
          },
          {
            icon: '📧',
            title: 'Email a Friend',
            description:
              'Know someone who could benefit? Send them a quick email with your personal invitation.',
          },
          {
            icon: '💬',
            title: 'Social Media',
            description:
              'Post about us on Twitter, LinkedIn, or your favorite platform and tag us for a shoutout.',
          },
        ],
      },
      {
        blockType: 'content',
        heading: 'Referral Program',
        body: richText(
          paragraph(
            'Our referral program rewards you for every person who joins through your unique link. The more you share, the more you earn.',
          ),
          heading('How It Works', 'h3'),
          paragraph(
            '1. Sign up for a free account and get your unique referral link from the dashboard.',
          ),
          paragraph('2. Share the link via email, social media, or anywhere you like.'),
          paragraph('3. When someone signs up using your link, both of you receive a reward.'),
        ),
      },
      {
        blockType: 'testimonials',
        heading: 'Community Voices',
        testimonials: [
          {
            name: 'Jake Wilson',
            role: 'Freelance Developer',
            company: '',
            quote:
              'I shared this with my dev community and the response was incredible. The npm install workflow is so smooth.',
            rating: '5',
          },
          {
            name: 'Priya Patel',
            role: 'Agency Owner',
            company: 'Pixel Perfect',
            quote:
              'We now use this for all our client projects. One CMS package, multiple sites, one shared database. Brilliant.',
            rating: '5',
          },
        ],
      },
      {
        blockType: 'cta',
        heading: 'Ready to Share?',
        description: 'Join our community and help us grow. Every share makes a difference.',
        buttonText: 'Get Your Referral Link',
        buttonLink: '/contact-us',
        secondaryButtonText: 'Learn More',
        secondaryButtonLink: '/about-us',
        style: 'accent',
      },
    ],
  },
]

// ── Seed runner ────────────────────────────────────────────────────────
// Usage:
//   pnpm seed:pages          → only creates pages that don't exist (safe for shared DB)
//   pnpm seed:pages --force  → updates existing pages too (use in dev only)
async function seedPages() {
  const forceUpdate = process.argv.includes('--force')
  const payload = await getPayload({ config })

  if (forceUpdate) {
    console.log('⚠️  Force mode: existing pages will be updated\n')
  } else {
    console.log('🔒 Safe mode: existing pages will not be modified\n')
  }

  let created = 0
  let updated = 0
  let skipped = 0

  for (const page of pages) {
    const existing = await payload.find({
      collection: 'pages',
      where: { slug: { equals: page.slug } },
      limit: 1,
      pagination: false,
    })

    if (existing.docs.length > 0) {
      if (forceUpdate) {
        await payload.update({
          collection: 'pages',
          id: existing.docs[0].id,
          data: {
            title: page.title,
            slug: page.slug,
            layout: page.layout as never,
            seo: page.seo,
            _status: 'published',
          },
        })
        console.log(`✅ Updated: ${page.slug}`)
        updated++
      } else {
        console.log(`⏭️  Skipped (exists): ${page.slug}`)
        skipped++
      }
    } else {
      await payload.create({
        collection: 'pages',
        data: {
          title: page.title,
          slug: page.slug,
          layout: page.layout as never,
          seo: page.seo,
          _status: 'published',
        },
      })
      console.log(`✅ Created: ${page.slug}`)
      created++
    }
  }

  console.log(`\n📊 Summary: ${created} created, ${updated} updated, ${skipped} skipped`)
}

seedPages()
  .then(() => {
    console.log('🎉 Done!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('❌ Failed to seed pages:', error)
    process.exit(1)
  })
