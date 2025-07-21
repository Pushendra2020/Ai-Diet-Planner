import React, { useEffect, useState } from 'react'

const COOKIE_CONSENT_KEY = 'cookie_consent_accepted';

function areCookiesEnabled() {
  try {
    document.cookie = 'cookietest=1';
    const cookiesEnabled = document.cookie.indexOf('cookietest=') !== -1;
    document.cookie = 'cookietest=1; expires=Thu, 01-Jan-1970 00:00:01 GMT';
    return cookiesEnabled;
  } catch (e) {
    return false;
  }
}


const CookieConsent = ({ children }) => {
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

  if (showBanner) {
    return (
      <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-90 flex flex-col items-center justify-center">
        <div className="bg-white text-gray-900 rounded-lg shadow-lg p-8 max-w-lg w-full text-center">
          <span className="font-semibold text-lg">Cookie Notice</span>
          <p className="mt-4 mb-6">
            This site uses cookies to enhance your experience. By continuing, you agree to our use of cookies. If cookies are blocked, some features may not work properly.
          </p>
          <button
            onClick={handleAccept}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full shadow transition"
          >
            Accept
          </button>
        </div>
      </div>
    );
  }

  return children || null;
};

export default CookieConsent; 