// Temp fix to fix the :
/*

 ⨯ Error: Could not find the module "<path>#SomeClientComponent" in the React Client Manifest. This is probably a bug in the React Server Components bundler.
    at stringify (<anonymous>)
    at stringify (<anonymous>) {
  digest: '1757242537'
}

*/
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};
export default async function RootLayout({ children }: Props) {
  // Dynamic import in root /app/layout.ts to re-import on each render
  await import('./(payload)/admin/importMap');

  return children;
}