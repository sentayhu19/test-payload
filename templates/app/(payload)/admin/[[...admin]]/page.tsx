import type { ServerFunctionClient } from 'payload'

import config from '@/payload.config'
import { AdminPage } from '@payloadcms/next/pages'

const serverFunction: ServerFunctionClient = async (args) => {
  'use server'
  const { createServerFunctionClient } = await import('@payloadcms/next')
  const { serverFunction: payloadServerFunction } = createServerFunctionClient({ config, importMap: {} })
  return payloadServerFunction(args)
}

const Page = ({ params, searchParams }: { params: Promise<{ admin?: string[] }>; searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => (
  <AdminPage config={config} importMap={{}} params={params} searchParams={searchParams} serverFunction={serverFunction} />
)

export default Page
