import type { CollectionConfig } from 'payload'
import { topLevelBlocks, recursiveBlock } from '../../lib/sharedBlocks'


export const Projects: CollectionConfig= {
    slug: 'projects',
    fields: [
      {
        name: 'slug',
        type: 'text',
        required: true,
      },
      {
        name: 'title',
        type: 'text',
        required: true,
      },
      {
        name: 'leadText',
        type: 'richText',
        required: true,
      },
      {
        name: 'content',
        type: 'blocks',
        blocks: [...topLevelBlocks, recursiveBlock], // Top-level blocks + recursive component
      }       
    ]
  }