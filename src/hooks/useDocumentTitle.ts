import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useAppDetails } from '../presentation/hooks/useAppDetails';

export function useDocumentTitle() {
    const location = useLocation();
    const params = useParams();
    const appId = params.appId;
    const { app } = useAppDetails(appId || '');

    useEffect(() => {
        const path = location.pathname;
        let title = 'Briefly - Premium Mobile Apps';
        let description = 'Discover premium mobile applications by Briefly. PlayPulse, gutbuddy and more - beautifully crafted apps available on iOS and Android.';

        if (app) {
            if (path.includes('/privacy-policy')) {
                title = `Privacy Policy - ${app.name} | Briefly`;
                description = `Read the privacy policy for ${app.name}. Learn how we protect your data and privacy.`;
            } else if (path.includes('/terms-of-service')) {
                title = `Terms of Service - ${app.name} | Briefly`;
                description = `Read the terms of service for ${app.name}. Understand your rights and responsibilities.`;
            } else if (path.includes('/support')) {
                title = `Support - ${app.name} | Briefly`;
                description = `Get help and support for ${app.name}. Find answers to frequently asked questions.`;
            } else {
                title = `${app.name} - ${app.tagline} | Briefly`;
                description = app.description;
            }
        }

        document.title = title;

        // Update meta description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', description);
        }

        // Update OG tags
        const ogTitle = document.querySelector('meta[property="og:title"]');
        const ogDescription = document.querySelector('meta[property="og:description"]');
        const ogUrl = document.querySelector('meta[property="og:url"]');

        if (ogTitle) ogTitle.setAttribute('content', title);
        if (ogDescription) ogDescription.setAttribute('content', description);
        if (ogUrl) ogUrl.setAttribute('content', `https://briefly.live${path}`);


        // Update Twitter tags
        const twitterTitle = document.querySelector('meta[property="twitter:title"]');
        const twitterDescription = document.querySelector('meta[property="twitter:description"]');

        if (twitterTitle) twitterTitle.setAttribute('content', title);
        if (twitterDescription) twitterDescription.setAttribute('content', description);


    }, [location, app]);
}
