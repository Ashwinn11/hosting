import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  appId?: string;
}

const SEOBox: React.FC<SEOProps> = ({ title, description, keywords, ogImage, appId }) => {
  useEffect(() => {
    document.title = title;
    
    // Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // Update Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', keywords.join(', '));

    // Update OG Tags
    const ogTags = {
      'og:title': title,
      'og:description': description,
      'og:type': 'website',
      'og:url': `https://briefly.live/${appId || ''}`,
      'og:image': ogImage || 'https://briefly.live/og-image.png'
    };

    Object.entries(ogTags).forEach(([property, content]) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    });

    // JSON-LD Schema
    let script = document.querySelector('script[type="application/ld+json"]');
    if (!script) {
      script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      document.head.appendChild(script);
    }

    const schema = {
      "@context": "https://schema.org",
      "@type": appId ? "SoftwareApplication" : "Person",
      "name": title,
      "description": description,
      ...(appId ? {
        "applicationCategory": "MultimediaApplication",
        "operatingSystem": "iOS, Android"
      } : {
        "name": "Ashwin Anbazhagan",
        "jobTitle": "App Developer & Founder",
        "url": "https://briefly.live"
      })
    };

    script.textContent = JSON.stringify(schema);
  }, [title, description, keywords, ogImage, appId]);

  return null;
};

export default SEOBox;
