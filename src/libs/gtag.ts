/* istanbul ignore file */
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: URL) => {
  (window as any).gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};
