import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';

import { Subtitle, Text, Hint } from 'app/src/styles';
import colors from 'app/src/styles/colors';
import truncate from 'app/src/utils/truncate';
import ExternalLink from 'app/src/elements/ExternalLink';

import VoteButton from './VoteButton';

const Container = styled(View)`
  border-top-width: 2px;
  border-top-color: black;
  padding-top: 6px;
  padding-bottom: 6px;
`;

const Header = styled(View)`
  flex-direction: row;
  justify-content: space-between;
`;

const Annotation = styled(Hint)`
`;

const CompetitorDetails = ({ competitor, contest }) => {
  return (
    <Container>
      {competitor ? (
        <Header>
          <View>
            <Subtitle style={{color: colors.screen}}>
              {competitor.entity.name}
            </Subtitle>
            <Text>Seed {competitor.seed}</Text>
            {competitor.annotation && (
              <Annotation>{competitor.annotation}</Annotation>
            )}
            {competitor.entity.annotation && (
              <Annotation>{competitor.entity.annotation}</Annotation>
            )}
          {competitor?.entity.externalLinks.map(link => (
            <ExternalLink url={link.url}>
              <Annotation>{truncate(link.url, 100)} ↗</Annotation>
            </ExternalLink>
          ))}
          </View>
          <View style={{width: 50}}>
            <VoteButton
              large
              competitor={competitor}
              contest={contest}
            />
          </View>
        </Header>
      ) : (
        <Subtitle>Bye</Subtitle>
      )}
    </Container>
  );
};

export default CompetitorDetails;
