import { JSXConverters } from '@payloadcms/richtext-lexical/react'
import { SerializedHeadingNode } from '@payloadcms/richtext-lexical'
import { h2Variants } from '@/lib/variants'

// Unused for now
export const headingConverter: JSXConverters<SerializedHeadingNode> = {
  heading: ({ node, nodesToJSX }) => {
    // Converts h2 to an h2 with an id for the anchor link
    if (node.tag === 'h2') {
      const text = nodesToJSX({ nodes: node.children })
      const id = text
        .join("")
        .toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/[^a-z0-9-]/g, '') // Remove any characters that are not letter numbers hyphens
      return <h2 id={id} className={h2Variants({})}>{text}</h2>
    } else {
      const text = nodesToJSX({ nodes: node.children })
      const Tag = node.tag
      return <Tag>{text}</Tag>
    }
  }
}

