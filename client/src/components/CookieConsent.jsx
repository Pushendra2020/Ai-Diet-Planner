import React, { useEffect, useState } from 'react'

const COOKIE_CONSENT_KEY = 'cookie_consent_accepted';

function areCookiesEnabled() {
  try {
    document.cookie = 'cookietest=1';
    const cookiesEnabled = document.cookie.indexOf('cookietest=') !== -1;
    // Clean up
    document.cookie = 'cookietest=1; expires=Thu, 01-Jan-1970 00:00:01 GMT';
    return cookiesEnabled;
  } catch (e) {
    return false;
  }
}

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!areCookiesEnabled() || consent !== 'true') {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 bg-gray-900 text-white px-4 py-4 flex flex-col md:flex-row items-center justify-between shadow-lg animate-slide-in-left">
      <div className="mb-2 md:mb-0 text-center md:text-left">
        <span className="font-semibold">Cookie Notice:</span> This site uses cookies to enhance your experience. By continuing, you agree to our use of cookies. If cookies are blocked, some features may not work properly.
      </div>
      <button
        onClick={handleAccept}
        className="mt-2 md:mt-0 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full shadow transition"
      >
        Accept
      </button>
    </div>
  );
};

export default CookieConsent; 