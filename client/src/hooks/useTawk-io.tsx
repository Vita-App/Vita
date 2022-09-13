import { useEffect } from 'react';
import { TAWK_PROPERTY_ID, TAWK_WIDGET_ID } from 'config.keys';

/**
 * @param {Object} - Tawk widget required properties
 */

const loadScript = (
  propertyId = TAWK_PROPERTY_ID,
  widgetId = TAWK_WIDGET_ID,
  embedId = '',
  basePath = 'tawk.to',
) => {
  if (embedId.length) {
    /**
     * If the element with embedId as id we will create a new clement
     */
    if (!document.getElementById(embedId)) {
      const element = document.createElement('div');
      element.id = embedId;

      document.body.appendChild(element);
    }

    // @ts-ignore
    window.Tawk_API.embedded = embedId;
  }

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://embed.${basePath}/${propertyId}/${widgetId}`;
  script.charset = 'UTF-8';
  script.setAttribute('crossorigin', '*');

  const firstScript = document.getElementsByTagName('script')[0];
  // @ts-ignore
  firstScript.parentNode.insertBefore(script, firstScript);
};

export const useTawkIO = () => {
  useEffect(() => {
    loadScript();
  }, []);
};
