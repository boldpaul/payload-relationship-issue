import { SerializedLinkNode } from '@payloadcms/richtext-lexical'

export const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!

  const slug = typeof value === 'object' && value !== null ? value.slug : null

  if (relationTo === 'projects') {
    return `/projects/${slug}`
  } else {
    return `/${slug}`
  }
}

