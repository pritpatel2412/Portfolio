import { useEffect } from 'react';

function OmniAgent() {
  useEffect(() => {
    // Check if script is already loaded to avoid duplicates
    if (!document.getElementById('omnidimension-web-widget')) {
      const script = document.createElement('script');
      script.id = 'omnidimension-web-widget';
      script.src = 'https://backend.omnidim.io/web_widget.js?secret_key=34e0d5d04c3934a449d7e01c76352f8a';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return null; // No UI needed; widget appears automatically
}

export default OmniAgent;
