import React from 'react';
import { Poppins } from 'next/font/google'
import './globals.css'
import Header from '@/components/Layout/Header'
import Footer from '@/components/Layout/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import type { Metadata } from 'next'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/react';

const font = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

// Critical: Force static rendering
export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: {
    default: 'Wellness Gadget Insider',
    template: '%s | Wellness Gadget Insider',
  },
  robots: {
    index: true,
    follow: true,
  },
  description: 'Expert reviews of wellness technology and health gadgets',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://wellness-gadget-insider.vercel.app'),
  applicationName: 'Wellness Gadget Insider',
  openGraph: {
    siteName: 'Wellness Gadget Insider',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/images/favicons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/images/favicons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/images/favicons/apple-touch-icon.png' },
    ],
    other: [
      {
        rel: 'android-chrome-192x192',
        url: '/images/favicons/android-chrome-192x192.png',
        sizes: '192x192',
      },
      {
        rel: 'android-chrome-512x512',
        url: '/images/favicons/android-chrome-512x512.png',
        sizes: '512x512',
      },
    ],
  },
}

export default function RootLayout({ 
  children 
}: Readonly<{ 
  children: React.ReactNode 
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico?v=2" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicons/favicon-16x16.png?v=2" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicons/favicon-32x32.png?v=2" />
        <link rel="apple-touch-icon" href="/images/favicons/apple-touch-icon.png?v=2" />
        <link rel="icon" type="image/png" sizes="192x192" href="/images/favicons/android-chrome-192x192.png?v=2" />
        <link rel="icon" type="image/png" sizes="512x512" href="/images/favicons/android-chrome-512x512.png?v=2" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Wellness Gadget Insider",
              "url": "https://wellness-gadget-insider.vercel.app/",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://wellness-gadget-insider.vercel.app/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />

        <meta name="google-site-verification" content="2LM4mclQm-UZp-Lft6E04fLlzcmmkafpqfNbMVntsqs" />
        <meta name="msvalidate.01" content="19204980D1F93778EBDFBC1CA9BB0D12" />
        
        <Script 
          strategy="afterInteractive" 
          src="https://www.googletagmanager.com/gtag/js?id=G-R2XEL04Y6X" 
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-R2XEL04Y6X');
          `}
        </Script>
        
        <Script id="bing-uet">
          {`
            (function(w,d,t,r,u){w[u]=w[u]||[];w[u].push({'uid':XXXXX});})(window,document,'script','/bing-uet.js','uetq');
          `}
        </Script>
        <Script src="https://bat.bing.com/bat.js" />
        
        <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="theme-color" content="#FFAC1C" />
        <link rel="sitemap" type="application/xml" href="/sitemaps/sitemap.xml" />
      </head>
      <body className={`${font.className} antialiased`}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
        <ScrollToTop />
        <Analytics />
      </body>
    </html>
  )
}