export const gaTrackingId = 'UA-143538110-1';

function trackPageView(url) {
  try {
    window.gtag('config', gaTrackingId, {
      page_location: url,
    });
  } catch (error) {
    // silences the error in dev mode
    // and/or if gtag fails to load
  }
}

export default trackPageView;
