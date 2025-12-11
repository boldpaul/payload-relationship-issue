import type { Block } from 'payload'
import { colorOptions } from '@/lib/layoutEngine'

// ============================================================================
// NESTED BLOCKS (used inside recursive components)
// No container field for layout control
// ============================================================================

export const nestedBlocks: Block[] = [
    { // Text Block - Nested
      slug: 'textBlock',     
      fields: [
        {
          name: 'heading',
          type: 'text',
          label: 'Heading',
        },
        {
          name: 'text',
          type: 'richText', 
          label: 'Text',
        },
      ]
    },
    { // Single Media Block - Nested
      slug: 'singleMedia',
      fields: [
        {
          name: 'colSpan',
          type: 'select',
          hasMany: false,
          defaultValue: '12',
          options: [
            { label: '12 Columns', value: '12' },
            { label: '11 Columns', value: '11' },
            { label: '10 Columns', value: '10' },
            { label: '9 Columns', value: '9' },
            { label: '8 Columns', value: '8' },
            { label: '7 Columns', value: '7' },
            { label: '6 Columns', value: '6' },
            { label: '5 Columns', value: '5' },
            { label: '4 Columns', value: '4' },
            { label: '3 Columns', value: '3' },
          ],
        },
        {
          name: 'colStart',
          type: 'select',
          hasMany: false,
          defaultValue: '0',
          options: [
            { label: 'Auto', value: '0' },          
            { label: 'Column 1', value: '1' },
            { label: 'Column 2', value: '2' },
            { label: 'Column 3', value: '3' },
            { label: 'Column 4', value: '4' },
            { label: 'Column 5', value: '5' },
            { label: 'Column 6', value: '6' },
            { label: 'Column 7', value: '7' },
            { label: 'Column 8', value: '8' },
            { label: 'Column 9', value: '9' },
            { label: 'Column 10', value: '10' },
            { label: 'Column 11', value: '11' },
            { label: 'Column 12', value: '12' },
          ],
        },
        {
          name: 'singleMedia',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'aspectRatio',
          type: 'select',
          defaultValue: 'auto',
          options: [
            { label: 'Auto (Original)', value: 'auto' },
            { label: 'Square (1:1)', value: 'aspect-square' },
            { label: 'Video (16:9)', value: 'aspect-video' },
            { label: 'Portrait (3:4)', value: 'aspect-[3/4]' },
            { label: 'Tall Portrait (9:16)', value: 'aspect-[9/16]' },
            { label: 'Wide (21:9)', value: 'aspect-[21/9]' },
          ],
        },
      ]
    }
];

// ============================================================================
// TOP-LEVEL BLOCKS (used at the root content level)
// Has container field for layout control
// ============================================================================

export const topLevelBlocks: Block[] = [
    { // Full Width Image Block - Top Level
      slug: 'fullWidthImage',
      fields: [
        {
          name: 'fullWidthImage',
          type: 'upload',
          relationTo: 'media',
          required: true,
        }
      ]
    },
    { // Text Block - Top Level
      slug: 'textBlock',     
      fields: [
        {
          name: 'heading',
          type: 'text',
          label: 'Heading',
        },
        {
          name: 'text',
          type: 'richText', 
          label: 'Text',
        },
      ]
    },
    { // Single Media Block - Top Level
      slug: 'singleMedia',
      fields: [
        {
          name: 'colSpan',
          type: 'select',
          hasMany: false,
          defaultValue: '12',
          options: [
            { label: '12 Columns', value: '12' },
            { label: '11 Columns', value: '11' },
            { label: '10 Columns', value: '10' },
            { label: '9 Columns', value: '9' },
            { label: '8 Columns', value: '8' },
            { label: '7 Columns', value: '7' },
            { label: '6 Columns', value: '6' },
            { label: '5 Columns', value: '5' },
            { label: '4 Columns', value: '4' },
            { label: '3 Columns', value: '3' },
          ],
        },
        {
          name: 'colStart',
          type: 'select',
          hasMany: false,
          defaultValue: '0',
          options: [
            { label: 'Auto', value: '0' },          
            { label: 'Column 1', value: '1' },
            { label: 'Column 2', value: '2' },
            { label: 'Column 3', value: '3' },
            { label: 'Column 4', value: '4' },
            { label: 'Column 5', value: '5' },
            { label: 'Column 6', value: '6' },
            { label: 'Column 7', value: '7' },
            { label: 'Column 8', value: '8' },
            { label: 'Column 9', value: '9' },
            { label: 'Column 10', value: '10' },
            { label: 'Column 11', value: '11' },
            { label: 'Column 12', value: '12' },
          ],
        },
        {
          name: 'singleMedia',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'aspectRatio',
          type: 'select',
          defaultValue: 'auto',
          options: [
            { label: 'Auto (Original)', value: 'auto' },
            { label: 'Square (1:1)', value: 'aspect-square' },
            { label: 'Video (16:9)', value: 'aspect-video' },
            { label: 'Portrait (3:4)', value: 'aspect-[3/4]' },
            { label: 'Tall Portrait (9:16)', value: 'aspect-[9/16]' },
            { label: 'Wide (21:9)', value: 'aspect-[21/9]' },
          ],
        },
      ]
    },
    { // CTA Block - Top Level
      slug: "CallToAction",
      fields: [
        {
          name: 'text',
          type: 'text',
          label: 'Text',
        },
        {
          name: 'buttonText',
          type: 'text',
          label: 'Button Text',
        },
        {
          name: 'destination',
          type: 'relationship',
          relationTo: ['projects', 'caseStudies'],
          hasMany: false,
          required: false,
        },
        {
          name: 'customUrl',
          admin: {
            condition: (data, siblingData) => !siblingData?.destination,
            description: 'Leave empty to use the destination link',
          },
          type: 'text',
          required: false,
        },
        {
          name: 'variant',
          type: 'select',
          defaultValue: '1',
          options: [
            { label: 'Variant 1', value: '1' },
            { label: 'Variant 2', value: '2' },
          ],
        }
      ]
    }
  ];
  
  // ============================================================================
  // RECURSIVE BLOCK
  // ============================================================================
  
export const recursiveBlock: Block = {
    slug: "recursiveComponent",
    labels: {
      singular: "Grid Block",
      plural: "Grid Blocks"
    },
    fields: [
      ...colorOptions,
      {
        name: 'content',
        type: 'blocks',  
        blocks: nestedBlocks, // Use nested blocks (without container field)
      },
    ]
  };