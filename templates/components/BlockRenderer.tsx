import React from 'react'

import * as BlockComponents from './blocks'

type BlockData = {
  blockType: string
  [key: string]: unknown
}

type Props = {
  blocks: BlockData[]
}

const blockComponentMap = {
  hero: BlockComponents.HeroBlock,
  content: BlockComponents.ContentBlock,
  contactForm: BlockComponents.ContactFormBlock,
  features: BlockComponents.FeaturesBlock,
  imageGallery: BlockComponents.ImageGalleryBlock,
  pricing: BlockComponents.PricingBlock,
  testimonials: BlockComponents.TestimonialsBlock,
  cta: BlockComponents.CTABlock,
  team: BlockComponents.TeamBlock,
  faq: BlockComponents.FAQBlock,
}

export function BlockRenderer({ blocks }: Props) {
  return (
    <>
      {blocks.map((block, index) => {
        const BlockComponent = blockComponentMap[block.blockType as keyof typeof blockComponentMap]
        if (!BlockComponent) return null

        const { blockType, ...blockProps } = block as { blockType: string; [key: string]: unknown }
        return <BlockComponent key={index} {...(blockProps as Record<string, unknown>)} />
      })}
    </>
  )
}
