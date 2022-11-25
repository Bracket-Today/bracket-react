import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';

import { Text, Hint } from 'app/src/styles';

import { Card, Name } from './TournamentCard';

const Subject = styled(Name)`
  margin-bottom: 10px;
`;

const VideoCard = ({ video }) => {
  return (
    <Card>
      <Subject>{video.subject}</Subject>
      <iframe
        src={`https://www.youtube.com/embed/${video.youtubeId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        allowFullScreen="allowFullScreen"
      ></iframe>
    </Card>
  );
};

export default VideoCard;
