import type { Field } from 'payload'

// Aspect ratio options 
export const aspectRatioClasses = [
  'aspect-square',
  'aspect-video',
  'aspect-[3/4]',
  'aspect-[9/16]',
  'aspect-[21/9]',
];

// Layout options for content blocks
export const layoutOptions: Field[] = [
    // {
    //   name: 'container',
    //   type: 'radio',
    //   defaultValue: 'container',
    //   options: [
    //     { label: 'Full', value: 'full' },
    //     { label: 'Contained with grid', value: 'container' },
    //     { label: 'None', value: 'none' },
    //   ],
    // },
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
      defaultValue: '1',
      options: [
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
]

export const colorOptions: Field[] = [
  {
    name: 'backgroundColor',
    type: 'select',
    options: [
      { label: 'Black', value: '#252525' },
      { label: 'Light Gray', value: '#e4e4e4' },
      { label: 'None', value: 'whitesmoke' },
    ]
  }
]
