// Google Analytics 4 initialization and page view logging
export const initGA = () => {
  // Initialize Google Analytics 4 using gtag.js
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = 'https://www.googletagmanager.com/gtag/js?id=G-F3BLYDGK0M';
  document.head.appendChild(script1);

  const script2 = document.createElement('script');
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-F3BLYDGK0M');
  `;
  document.head.appendChild(script2);
};

export const logPageView = (url: string) => {
  // Log page view to Google Analytics 4
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', 'G-F3BLYDGK0M', {
      'page_path': url,
    });
  }
};
