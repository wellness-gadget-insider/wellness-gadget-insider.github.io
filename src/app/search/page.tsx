'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
// Import your local data file directly into the client bundle
import blogData from '@/data/blog-articles.json';

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

    setLoading(true);
    const normalizedQuery = query.toLowerCase().trim();

    // 1. Safely parse all articles out of your JSON structure
    let allArticles: any[] = [];
    
    if (blogData.mainCategories && Array.isArray(blogData.mainCategories)) {
      blogData.mainCategories.forEach((category: any) => {
        const articlesInCategory = category.articles || category.data?.articles;
        if (articlesInCategory && Array.isArray(articlesInCategory)) {
          allArticles = [...allArticles, ...articlesInCategory];
        }
      });
    }
    
    if (allArticles.length === 0 && blogData.articles && Array.isArray(blogData.articles)) {
      allArticles = blogData.articles;
    }

    // 2. Perform the keyword matching directly in the browser
    const queryKeywords = normalizedQuery.split(/\s+/).filter(Boolean);
    
    const filtered = allArticles
      .map(article => {
        const title = (article.pageTitle || article.title || '').toLowerCase();
        const description = (article.description || article.metaDescription || '').toLowerCase();
        const category = (article.mainCategoryName || '').toLowerCase();
        
        let score = 0;
        
        // Exact matches get premium scores
        if (title === normalizedQuery) score += 100;
        else if (title.includes(normalizedQuery)) score += 50;
        
        // Individual keyword matching
        queryKeywords.forEach(keyword => {
          if (title.includes(keyword)) score += 10;
          if (description.includes(keyword)) score += 2;
          if (category.includes(keyword)) score += 5;
        });

        return {
          url: `/blog/${article.slug}`,
          title: article.pageTitle || article.title,
          description: article.description || article.metaDescription,
          breadcrumbs: article.mainCategoryName || '',
          score
        };
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10); // Grab top 10 matches

    setResults(filtered);
    setLoading(false);
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

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="text-center py-12">Loading Search Layout...</div>}>
      <SearchResults />
    </Suspense>
  );
}