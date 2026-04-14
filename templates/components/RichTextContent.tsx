import React from 'react'

type RichTextNode = {
  type?: string
  text?: string
  format?: number | string
  tag?: string
  url?: string
  fields?: {
    url?: string
    newTab?: boolean
  }
  children?: RichTextNode[]
  listType?: 'bullet' | 'number'
  value?: RichTextNode[]
}

type Props = {
  content: unknown
}

function renderText(text: string | undefined, format: number | string | undefined, key: string) {
  if (!text) return null

  let node: React.ReactNode = text

  if (typeof format === 'string') {
    if (format.includes('bold')) node = <strong key={`${key}-bold`}>{node}</strong>
    if (format.includes('italic')) node = <em key={`${key}-italic`}>{node}</em>
    if (format.includes('underline')) node = <u key={`${key}-underline`}>{node}</u>
  }

  return <React.Fragment key={key}>{node}</React.Fragment>
}

function renderNodes(nodes: RichTextNode[] | undefined, keyPrefix = 'node'): React.ReactNode {
  if (!nodes?.length) return null

  return nodes.map((node, index) => {
    const key = `${keyPrefix}-${index}`

    if (node.text !== undefined) {
      return renderText(node.text, node.format, key)
    }

    const children = renderNodes(node.children, key)

    switch (node.type) {
      case 'heading': {
        const Tag = (node.tag || 'h2') as keyof React.JSX.IntrinsicElements
        return <Tag key={key}>{children}</Tag>
      }
      case 'paragraph':
        return <p key={key}>{children}</p>
      case 'quote':
        return <blockquote key={key}>{children}</blockquote>
      case 'list':
        return node.listType === 'number' ? <ol key={key}>{children}</ol> : <ul key={key}>{children}</ul>
      case 'listitem':
        return <li key={key}>{children}</li>
      case 'link': {
        const href = node.fields?.url || node.url || '#'
        return (
          <a key={key} href={href} target={node.fields?.newTab ? '_blank' : undefined} rel={node.fields?.newTab ? 'noreferrer noopener' : undefined}>
            {children}
          </a>
        )
      }
      case 'linebreak':
        return <br key={key} />
      default:
        return <React.Fragment key={key}>{children}</React.Fragment>
    }
  })
}

export function RichTextContent({ content }: Props) {
  const root = content as { root?: { children?: RichTextNode[] } } | null

  return <div>{renderNodes(root?.root?.children)}</div>
}
