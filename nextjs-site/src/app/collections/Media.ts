import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
    slug: 'media',
    upload: true, 
    access: {
        read: () => true,
        create: ({ req: { user } }) => {
          return Boolean(user)
        },
        update: ({ req: { user } }) => {
          return Boolean(user)
        },
        delete: ({ req: { user } }) => {
          return Boolean(user)
        },
      },
    fields: [
    {
        name: 'alt',
        type: 'text',
    }
    ]
}