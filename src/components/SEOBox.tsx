import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  appId?: string;
  appStoreUrl?: string;
  appCategory?: string;
  aggregateRating?: { ratingValue: string; ratingCount: string };
  faqs?: Array<{ question: string; answer: string }>;
  appNumericId?: string;
  screenshots?: string[];
}

const BASE = 'https://briefly.live';

const SEOBox: React.FC<SEOProps> = ({
  title, description, keywords, ogImage, appId, appStoreUrl, appCategory,
  aggregateRating, faqs, appNumericId, screenshots,
}) => {
  useEffect(() => {
    document.title = title;

    const setMetaName = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) { el = document.createElement('meta'); el.setAttribute('name', name); document.head.appendChild(el); }
      el.setAttribute('content', content);
    };

    const setMetaProp = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`);
      if (!el) { el = document.createElement('meta'); el.setAttribute('property', property); document.head.appendChild(el); }
      el.setAttribute('content', content);
    };

    const canonicalUrl = `${BASE}/${appId || ''}`;
    const image = ogImage || `${BASE}/og-image.png`;
    const appName = title.split('|')[0].trim();

    // Basic
    setMetaName('description', description);
    setMetaName('keywords', keywords.join(', '));
    setMetaName('robots', 'index, follow');

    // Open Graph
    setMetaProp('og:title', title);
    setMetaProp('og:description', description);
    setMetaProp('og:type', 'website');
    setMetaProp('og:url', canonicalUrl);
    setMetaProp('og:image', image);
    setMetaProp('og:site_name', 'Briefly.live');

    // Twitter Cards
    setMetaName('twitter:card', 'summary_large_image');
    setMetaName('twitter:title', title);
    setMetaName('twitter:description', description);
    setMetaName('twitter:image', image);
    setMetaName('twitter:creator', '@shwiinn');

    if (appId && appNumericId) {
      setMetaName('apple-itunes-app', `app-id=${appNumericId}, app-argument=${BASE}/${appId}`);
      setMetaProp('al:ios:app_name', appName);
      setMetaProp('al:ios:app_store_id', appNumericId);
      setMetaProp('al:ios:url', `${appId}://home`);
      setMetaName('twitter:app:name:iphone', appName);
      setMetaName('twitter:app:id:iphone', appNumericId);
    }

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement('link'); canonical.setAttribute('rel', 'canonical'); document.head.appendChild(canonical); }
    canonical.setAttribute('href', canonicalUrl);

    // Primary JSON-LD
    let script = document.querySelector('script[data-seo="primary"]') as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      script.setAttribute('data-seo', 'primary');
      document.head.appendChild(script);
    }

    const schema = appId ? {
      '@context': 'https://schema.org',
      '@type': 'MobileApplication',
      name: appName,
      description,
      applicationCategory: appCategory || 'HealthApplication',
      operatingSystem: 'iOS',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      url: appStoreUrl || canonicalUrl,
      author: { '@type': 'Person', name: 'Ashwin Anbazhagan', url: BASE },
      ...(aggregateRating && {
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: aggregateRating.ratingValue,
          ratingCount: aggregateRating.ratingCount,
        },
      }),
      ...(screenshots?.length && {
        screenshot: screenshots.map(s => `${BASE}${s}`),
      }),
    } : {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Briefly',
      url: BASE,
      logo: `${BASE}/apple-touch-icon.png`,
      sameAs: ['https://twitter.com/shwiinn'],
      founder: { '@type': 'Person', name: 'Ashwin Anbazhagan' },
    };

    script.textContent = JSON.stringify(schema);

    // FAQPage JSON-LD
    let faqScript = document.querySelector('script[data-seo="faq"]') as HTMLScriptElement | null;
    if (faqs && faqs.length > 0) {
      if (!faqScript) {
        faqScript = document.createElement('script');
        faqScript.setAttribute('type', 'application/ld+json');
        faqScript.setAttribute('data-seo', 'faq');
        document.head.appendChild(faqScript);
      }
      faqScript.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(f => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      });
    } else if (faqScript) {
      faqScript.remove();
    }
  }, [title, description, keywords, ogImage, appId, appStoreUrl, appCategory, aggregateRating, faqs, appNumericId, screenshots]);

  return null;
};

export default SEOBox;
