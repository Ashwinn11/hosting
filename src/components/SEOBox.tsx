import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  appId?: string;
  appStoreUrl?: string;
  appCategory?: string;
}

const SEOBox: React.FC<SEOProps> = ({ title, description, keywords, ogImage, appId, appStoreUrl, appCategory }) => {
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

    const canonicalUrl = `https://briefly.live/${appId || ''}`;
    const image = ogImage || 'https://briefly.live/og-image.png';

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

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement('link'); canonical.setAttribute('rel', 'canonical'); document.head.appendChild(canonical); }
    canonical.setAttribute('href', canonicalUrl);

    // JSON-LD Schema
    let script = document.querySelector('script[type="application/ld+json"]');
    if (!script) { script = document.createElement('script'); script.setAttribute('type', 'application/ld+json'); document.head.appendChild(script); }

    const schema = appId ? {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: title.split('|')[0].trim(),
      description,
      applicationCategory: appCategory || 'HealthApplication',
      operatingSystem: 'iOS',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      url: appStoreUrl || canonicalUrl,
      author: { '@type': 'Person', name: 'Ashwin Anbazhagan', url: 'https://briefly.live' },
    } : {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Ashwin Anbazhagan',
      jobTitle: 'App Developer & Founder',
      url: 'https://briefly.live',
    };

    script.textContent = JSON.stringify(schema);
  }, [title, description, keywords, ogImage, appId, appStoreUrl, appCategory]);

  return null;
};

export default SEOBox;
