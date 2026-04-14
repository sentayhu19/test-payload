#!/usr/bin/env node

import { execSync } from 'child_process'
import { existsSync, mkdirSync, copyFileSync, readFileSync, writeFileSync, cpSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const rootDir = join(__dirname, '..')
const targetDir = process.cwd()

console.log('🚀 Setting up PayloadCMS...\n')

// Check if target is a Next.js project
if (!existsSync(join(targetDir, 'package.json'))) {
  console.error('❌ No package.json found. Run this in a Next.js project.')
  process.exit(1)
}

const pkg = JSON.parse(readFileSync(join(targetDir, 'package.json'), 'utf8'))
if (!pkg.dependencies?.next) {
  console.error('❌ This doesn\'t appear to be a Next.js project.')
  process.exit(1)
}

console.log('✓ Found Next.js project\n')

// Copy template files
console.log('📁 Copying Payload files...')

const templatesDir = join(rootDir, 'templates')

// Create directories
try {
  mkdirSync(join(targetDir, 'src/app/(payload)'), { recursive: true })
  mkdirSync(join(targetDir, 'src/app/api/[...payload]'), { recursive: true })
  mkdirSync(join(targetDir, 'src/collections'), { recursive: true })
} catch (e) {
  // Directories might already exist
}

// Copy payload.config.ts
if (existsSync(join(templatesDir, 'payload.config.ts'))) {
  copyFileSync(
    join(templatesDir, 'payload.config.ts'),
    join(targetDir, 'src/payload.config.ts')
  )
  console.log('  ✓ payload.config.ts')
}

// Copy collections
if (existsSync(join(templatesDir, 'collections'))) {
  cpSync(join(templatesDir, 'collections'), join(targetDir, 'src/collections'), { recursive: true, force: true })
  console.log('  ✓ collections/')
}

// Copy app routes
if (existsSync(join(templatesDir, 'app/(payload)'))) {
  cpSync(join(templatesDir, 'app/(payload)'), join(targetDir, 'src/app/(payload)'), { recursive: true, force: true })
  console.log('  ✓ app/(payload)/')
}

if (existsSync(join(templatesDir, 'app/api/[...payload]'))) {
  cpSync(join(templatesDir, 'app/api/[...payload]'), join(targetDir, 'src/app/api/[...payload]'), { recursive: true, force: true })
  console.log('  ✓ app/api/[...payload]/')
}

console.log('\n📦 Installing dependencies...')

const deps = [
  'payload',
  '@payloadcms/next',
  '@payloadcms/db-postgres',
  '@payloadcms/richtext-lexical',
  '@payloadcms/ui',
  'dotenv',
  'cross-env'
]

try {
  const pkgManager = existsSync(join(targetDir, 'pnpm-lock.yaml')) ? 'pnpm' :
                     existsSync(join(targetDir, 'yarn.lock')) ? 'yarn' : 'npm'

  execSync(`${pkgManager} add ${deps.join(' ')}`, {
    cwd: targetDir,
    stdio: 'inherit'
  })
  console.log('✓ Dependencies installed\n')
} catch (e) {
  console.error('❌ Failed to install dependencies:', e.message)
  process.exit(1)
}

// Update next.config
console.log('⚙️  Updating next.config...')
const nextConfigPath = existsSync(join(targetDir, 'next.config.ts'))
  ? join(targetDir, 'next.config.ts')
  : existsSync(join(targetDir, 'next.config.js'))
    ? join(targetDir, 'next.config.js')
    : null

if (nextConfigPath) {
  const content = readFileSync(nextConfigPath, 'utf8')
  if (!content.includes('withPayload')) {
    const newConfig = `import { withPayload } from '@payloadcms/next/withPayload'

${content.replace('export default ', 'const nextConfig = ')}

export default withPayload(nextConfig)
`
    writeFileSync(nextConfigPath, newConfig)
    console.log('  ✓ next.config updated\n')
  } else {
    console.log('  ℹ next.config already has Payload\n')
  }
} else {
  console.log('  ⚠ No next.config found, creating one...')
  writeFileSync(join(targetDir, 'next.config.ts'), `import { withPayload } from '@payloadcms/next/withPayload'

const nextConfig = {
  // your config
}

export default withPayload(nextConfig)
`)
  console.log('  ✓ next.config.ts created\n')
}

// Create .env.example
if (!existsSync(join(targetDir, '.env'))) {
  writeFileSync(join(targetDir, '.env.example'), `# PayloadCMS
DATABASE_URI=postgresql://user:password@host:5432/database
PAYLOAD_SECRET=your-secret-key-here-at-least-16-chars
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
`)
  console.log('  ✓ .env.example created')
}

console.log('\n🎉 PayloadCMS setup complete!')
console.log('\nNext steps:')
console.log('  1. Copy .env.example to .env and fill in your values')
console.log('  2. Run: npx payload generate:importmap')
console.log('  3. Run: npx payload generate:types')
console.log('  4. Start your dev server: npm run dev')
console.log('\nAdmin panel will be at: http://localhost:3000/admin')
