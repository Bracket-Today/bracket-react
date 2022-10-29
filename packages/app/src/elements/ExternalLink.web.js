import React from 'react';

const ExternalLink = ({ url, children }) => {
  return (
    <a href={url} target="_blank" rel="nofollow">{children}</a>
  );
};

export default ExternalLink;
