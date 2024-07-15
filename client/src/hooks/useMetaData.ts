import { useEffect } from 'react';
import { APP_NAME, ASSET_FOLDER } from 'config.keys';

// Increase this whenever you update logo.
const faviconVersion = 2;
const description = `${APP_NAME} connects college graduates, alumni, and faculty to revive the culture of mentorship and foster a more connected and engaged community.`;

const createLinkElements = () => {
  const link = document.createElement('link');
  link.rel = 'icon';
  link.href = `/${ASSET_FOLDER}/icon.ico?v=${faviconVersion}`;

  const appleLink = document.createElement('link');
  appleLink.rel = 'apple-touch-icon';
  appleLink.href = `/${ASSET_FOLDER}/logo192.png?v=${faviconVersion}`;

  document.head.appendChild(link);
  document.head.appendChild(appleLink);
};

const createMetaElements = () => {
  const meta = document.createElement('meta');
  meta.name = 'description';
  meta.content = description;
  document.head.appendChild(meta);
};

const createScriptElements = () => {
  const script = document.createElement('script');
  script.type = 'application/ld+json';

  const json = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: APP_NAME,
    alternateName: `${APP_NAME}`,
    url: 'https://mentorship.thapar.edu',
    description,
  };

  script.innerHTML = JSON.stringify(json);

  document.head.appendChild(script);
};

const setMetaData = () => {
  document.title = APP_NAME;
  createMetaElements();
  createLinkElements();
  createScriptElements();
};

const useMetaData = () => {
  useEffect(() => {
    setMetaData();
  }, []);
};

export default useMetaData;
