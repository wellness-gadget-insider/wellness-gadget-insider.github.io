// src/app/search/[query]/page.tsx
import SearchResults from '@/components/SearchResults';

// We type params as a Promise to comply with Next.js 15 standards
interface PageProps {
  params: Promise<{ query: string }>;
}

export default async function SearchPage({ params }: PageProps) {
  const resolvedParams = await params;
  
  // Pass the raw dynamic string directly down to your component
  return <SearchResults query={resolvedParams.query} />;
}

// CRITICAL: This satisfies 'output: export' by pre-rendering fallback paths.
// It stops the "missing generateStaticParams()" build crash dead in its tracks.
export async function generateStaticParams() {
  return [
    { query: 'neck%20pain' },
    { query: 'back%20pain' },
    { query: 'skincare' }
  ];
}