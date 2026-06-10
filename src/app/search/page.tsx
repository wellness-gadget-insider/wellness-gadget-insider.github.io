'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';

// Core search component that reads browser parameters safely
function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    async function fetchSearchResults() {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data);
        }
      } catch (error) {
        console.error('Failed to fetch search results:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchSearchResults();
  }, [query]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">
        Search Results for: <span className="text-amber-500">"{query}"</span>
      </h1>

      {loading && <p className="text-gray-500 text-lg">Searching our database...</p>}

      {!loading && results.length === 0 && (
        <p className="text-gray-500 text-lg">No articles matched your criteria. Try another keyword!</p>
      )}

      {!loading && results.length > 0 && (
        <div className="space-y-6">
          {results.map((article: any) => (
            <div key={article.url} className="border-b border-gray-200 pb-6">
              <Link href={article.url} className="text-xl font-semibold text-amber-600 hover:underline block mb-2">
                {article.title}
              </Link>
              <p className="text-gray-600 line-clamp-2">{article.description}</p>
              {article.breadcrumbs && (
                <span className="text-xs text-gray-400 block mt-2 font-medium uppercase tracking-wider">
                  {article.breadcrumbs}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Main page component providing the mandatory boundary for static compilation
export default function SearchPage() {
  return (
    <Suspense fallback={<div className="text-center py-12">Loading Search Layout...</div>}>
      <SearchResults />
    </Suspense>
  );
}