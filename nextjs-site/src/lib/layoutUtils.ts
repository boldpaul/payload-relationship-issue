import { Field } from "payload";

// Layout presets for common content layouts
export const layoutPresets = {
  '12-columns': { colSpan: '12', label: '12 Columns' },
  '11-columns': { colSpan: '11', label: '11 Columns' },
  '10-columns': { colSpan: '10', label: '10 Columns' },
  '9-columns': { colSpan: '9', label: '9 Columns' },
  '8-columns': { colSpan: '8', label: '8 Columns' },
  '7-columns': { colSpan: '7', label: '7 Columns' },
  '6-columns': { colSpan: '6', label: '6 Columns' },
  '5-columns': { colSpan: '5', label: '5 Columns' },
  '4-columns': { colSpan: '4', label: '4 Columns' },
  '3-columns': { colSpan: '3', label: '3 Columns' },
} as const;

export type LayoutPreset = keyof typeof layoutPresets;

// Whitelist mapping for Tailwind classes used in presets
export const colSpanMap: Record<string, string> = {
  '3': 'col-span-12 lg:col-span-3',
  '4': 'col-span-12 lg:col-span-4',
  '5': 'col-span-12 lg:col-span-5',
  '6': 'col-span-12 lg:col-span-6',
  '7': 'col-span-12 lg:col-span-7',
  '8': 'col-span-12 lg:col-span-8',
  '9': 'col-span-12 lg:col-span-9',
  '10': 'col-span-12 lg:col-span-10',
  '11': 'col-span-12 lg:col-span-11',
  '12': 'col-span-12',
};

export const colStartMap: Record<string, string> = {
  '0': '',
  '1': 'lg:col-start-1',
  '2': 'lg:col-start-2',
  '3': 'lg:col-start-3',
  '4': 'lg:col-start-4',
  '5': 'lg:col-start-5',
  '6': 'lg:col-start-6',
  '7': 'lg:col-start-7',
  '8': 'lg:col-start-8',
  '9': 'lg:col-start-9',
  '10': 'lg:col-start-10',
  '11': 'lg:col-start-11',
  '12': 'lg:col-start-12',
};

const colorMap: Record<string, string> = {
  '#252525': '#FFF',
  '#e4e4e4': '#000',
  'whitesmoke': '#000',
}

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

export function getColorValue(color: string) {
  return colorMap[color] || 'undefined';
}

// Manual tests for color mapping
// console.log('Testing #252525:', getColorValue('#252525'));
// console.log('Testing #666666:', getColorValue('#666666'));
// console.log('Testing unknown color #FF0000:', getColorValue('#FF0000'));
//npx tsx src/lib/layoutUtils.ts


export interface LayoutProps {
  colSpan?: string;
  colStart?: string;
}

export interface LayoutClasses {
  childClass: string;
}

/**
 * Layout classes for content blocks
 * @param colSpan - Number of columns to span (e.g., '3', '6', '12')
 * @param colStart - Starting column position (e.g., '1', '2', '3')
 * @returns Object with childClass string
 */

export function getLayoutClasses({
  colSpan,
  colStart,
}: LayoutProps): LayoutClasses {

  // Generate child class based on colSpan and colStart
  const spanClass = colSpan ? colSpanMap[colSpan] : '';
  const startClass = colStart ? colStartMap[colStart] : '';
  const childClass = `${spanClass} ${startClass}`;

  return {
    // wrapperClass: baseWrapperClass,
    childClass: childClass,
  };
}

export function getIphoneLayoutClasses({
  colSpan,
  colStart,
}: LayoutProps): LayoutClasses {
  
  const mobileClass = 'col-span-12';  // 12 cols wide
  const tabletClass = 'sm:col-span-6';  // Tablet: 6 cols wide
  
  // Desktop classes based on CMS settings
  const desktopSpanClass = colSpan ? colSpanMap[colSpan] : '';
  const desktopStartClass = colStart && colStart !== '0' ? colStartMap[colStart] : '';
  
  const childClass = [mobileClass, tabletClass, desktopSpanClass, desktopStartClass]
  .filter(Boolean) // Remove empty strings
  .join(' '); // Join with space

  return {
    childClass: childClass,
  };
}