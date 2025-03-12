// Helper function to update page title and meta tags
export const updateMetaTags = (
    title: string,
    description: string,
    keywords: string[] = []
): void => {
    // Update document title
    document.title = `${title} | US Visa Guide`;

    // Find or create meta description tag
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // Find or create meta keywords tag
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
    }

    const keywordsContent = [
        'US visa', 'visa guide', 'immigration', 'United States',
        ...keywords
    ].join(', ');

    metaKeywords.setAttribute('content', keywordsContent);
};

// Helper to generate JSON-LD structured data for SEO
export const generateStructuredData = (
    pageType: 'WebPage' | 'FAQPage' | 'Article',
    data: Record<string, any>
): string => {
    const baseData = {
        '@context': 'https://schema.org',
        '@type': pageType,
        'url': window.location.href,
        'name': 'US Visa Guide',
        'publisher': {
            '@type': 'Organization',
            'name': 'US Visa Guide',
            'logo': {
                '@type': 'ImageObject',
                'url': `${window.location.origin}/logo.png`
            }
        }
    };

    const structuredData = { ...baseData, ...data };
    return JSON.stringify(structuredData);
};

// Helper to add JSON-LD to document head
export const addStructuredDataToPage = (jsonld: string): void => {
    // Remove any existing JSON-LD
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
        existingScript.remove();
    }

    // Add new JSON-LD
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = jsonld;
    document.head.appendChild(script);
};
