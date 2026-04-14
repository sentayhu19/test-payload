import type { ServerFunctionClient } from 'payload'

import config from '@/payload.config'
import { RootLayout } from '@payloadcms/next/layouts'
import React from 'react'

import './styles.css'

type Args = {
  children: React.ReactNode
}

const serverFunction: ServerFunctionClient = async (args) => {
  'use server'
  const { createServerFunctionClient } = await import('@payloadcms/next')
  const { serverFunction: payloadServerFunction } = createServerFunctionClient({ config, importMap: {} })
  return payloadServerFunction(args)
}

const Layout = ({ children }: Args) => <RootLayout config={config} importMap={{}} serverFunction={serverFunction}>{children}</RootLayout>

export default Layout
