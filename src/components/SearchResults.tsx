'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
// Import your local articles database directly into the bundle
import blogData from '@/data/blog-articles.json';

export default function SearchResults({ query }: { query: string }) {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const performClientSearch = () => {
      try {
        setLoading(true);
        
        // Decode the URL encoded query (e.g., "neck%20pain" -> "neck pain")
        const decodedQuery = decodeURIComponent(query || '').toLowerCase().trim();
        
        if (!decodedQuery) {
          setResults([]);
          return;
        }

        // 1. Safely extract all articles from your JSON data structure
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

        // 2. Client-side scoring algorithm
        const queryKeywords = decodedQuery.split(/\s+/).filter(Boolean);
        
        const filtered = allArticles
          .map((article) => {
            const title = (article.pageTitle || article.title || '').toLowerCase();
            const description = (article.description || article.metaDescription || '').toLowerCase();
            const category = (article.mainCategoryName || article.mainCategory || '').toLowerCase();
            
            let score = 0;
            
            // Phrase matches get top premium scores
            if (title === decodedQuery) {
              score = 100;
            } else if (title.includes(decodedQuery)) {
              score = 60;
            } else {
              // Word-by-word relevance scoring
              queryKeywords.forEach((keyword) => {
                if (title.includes(keyword)) score += 15;
                if (description.includes(keyword)) score += 5;
                if (category.includes(keyword)) score += 8;
              });
            }

            // Bound maximum possible score
            score = Math.min(100, score);

            return {
              url: `/blog/${article.slug}`,
              title: article.pageTitle || article.title,
              description: article.description || article.metaDescription,
              breadcrumbs: article.mainCategoryName || article.mainCategory || '',
              score: Math.round(score),
            };
          })
          .filter((item) => item.score > 0)
          .sort((a, b) => b.score - a.score)
          .slice(0, 10); // Limit to top 10 relevant matches

        setResults(filtered);
      } catch (err) {
        console.error('Client search compilation error:', err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    performClientSearch();
  }, [query]);

  // Decode query string safely for UI presentation
  const displayQuery = decodeURIComponent(query || '');

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="inline-block h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-2">Searching for "{displayQuery}"...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">
        Search Results for: <span className="text-primary">"{displayQuery}"</span>
      </h1>

      {results.length > 0 ? (
        <div className="space-y-6">
          {results.map((result) => (
            <div key={result.url} className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  {result.breadcrumbs && (
                    <div className="text-sm text-gray-500 mb-1">
                      {result.breadcrumbs}
                    </div>
                  )}
                  <Link href={result.url} className="block">
                    <h2 className="text-xl font-semibold text-primary hover:underline">
                      {result.title}
                    </h2>
                  </Link>
                  {result.description && (
                    <p className="text-gray-600 mt-2">{result.description}</p>
                  )}
                </div>
                
                {/* Percentage match display */}
                {typeof result.score === 'number' && (
                  <div className="flex flex-col items-end">
                    <div className={`
                      text-2xl font-bold 
                      ${result.score === 100 ? 'text-green-600' : 
                        result.score >= 80 ? 'text-blue-600' : 
                        'text-orange-500'}
                    `}>
                      {result.score}%
                    </div>
                    <div className="text-sm text-gray-500 mt-1">Match</div>
                    {result.score === 100 && (
                      <span className="mt-1 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        Perfect Match
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
          <p>No results found for "{displayQuery}". Try different keywords.</p>
          <div className="mt-4">
            <Link href="/blog" className="text-blue-600 hover:underline">
              Browse all articles
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}