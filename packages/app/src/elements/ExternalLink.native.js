import React from 'react';
import { Linking, Pressable } from 'react-native';

const ExternalLink = ({ url, children }) => {
  const openLink = () => {
    Linking.canOpenURL(url).then(() => {
      return Linking.openURL(url);
    });
  };

  return (
    <Pressable onPress={openLink}>{children}</Pressable>
  );
};

export default ExternalLink;
