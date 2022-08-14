import React, { useCallback, useEffect, useState } from 'react';
import { Platform, View } from 'react-native';
import { useQuery, useMutation } from '@apollo/client';
import styled from 'styled-components/native';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

import { useParams } from 'app/src/utils/routing';
import { Header, Title, Subtitle, Text, Notice } from 'app/src/styles';
import DataState from 'app/src/components/DataState';
import { Button } from 'app/src/elements/buttons';
import colors from 'app/src/styles/colors';

import {
  USER_TOURNAMENT,
  RANDOM_TOURNAMENT_SEEDS,
  UPDATE_TOURNAMENT_SEEDS,
} from './queries';
import Competitor from './Competitor';
import EntitySelect from './EntitySelect';

const AddCompetitor = styled(View)`
  margin-top: 10px
  border-top-style: solid;
  border-top-color: black;
  border-top-width: 1px;
`;

const Hint = styled(Text)`
  color: ${colors.disabled};
`;

const dndOptions = {
  enableMouseEvents: true
};

const Tournament = () => {
  const { id } = useParams();
  const [sortedCompetitors, setSortedCompetitors] = useState([]);

  const { data, refetch, ...queryStatus } =
    useQuery(USER_TOURNAMENT, { variables: { id } });

  const [updateTournamentSeeds] = useMutation(UPDATE_TOURNAMENT_SEEDS, {
    onCompleted: refetch
  });

  const [randomTournamentSeeds] = useMutation(RANDOM_TOURNAMENT_SEEDS, {
    variables: { input: { id } },
    onCompleted: refetch
  });

  useEffect(() => {
    if (data?.currentUser.tournament) {
      setSortedCompetitors([...data.currentUser.tournament.competitors]);
    }
  }, [data]);

  /**
   * Update order of sortedCompetitors based on dragging.
   */
  const moveCompetitor = useCallback((dragIndex, hoverIndex) => {
    setSortedCompetitors(competitors => {
      const competitor = competitors[dragIndex];
      competitors.splice(dragIndex, 1);
      competitors.splice(hoverIndex, 0, competitor);
      return [...competitors];
    });
  }, []);

  /**
   * Save order of competitors (seeding) on drop.
   */
  const saveSeeds = useCallback(() => {
    const sortedIds = sortedCompetitors.map(competitor => competitor.id);
    const originalIds = data.currentUser.tournament.competitors
      .map(competitor => competitor.id);

    if (JSON.stringify(sortedIds) !== JSON.stringify(originalIds)) {
      updateTournamentSeeds({
        variables: { input: { id, competitorIds: sortedIds } }
      });
    }
  }, [sortedCompetitors]);

  if (data?.currentUser && !data.currentUser.tournament) {
    return (
      <View>
        <Text>Sorry, we couldn't find this tournament</Text>
      </View>
    );
  }

  const tournamentStatus = data?.currentUser.tournament.status;

  // TODO react-dnd is throwing "addEventListener is not a function". in native.
  // Just disable drag drop in native for now.
  const enableDragDrop = (
    'web' === Platform.OS && !['Active', 'Closed'].includes(tournamentStatus)
  );

  return (
    <DataState data={data} {...queryStatus}>
      <Header>
        <Title>{data?.currentUser.tournament.name}</Title>
        <Subtitle>{data?.currentUser.tournament.status}</Subtitle>
      </Header>

      <Notice>
        <Text>
          Add a number of competitors that's a power of 2 and at least 8
          (8, 16, 32, 64, 128, 256, Nope, you're not gonna come up with 512
          options, so just stop) and we may make this a featured bracket. But,
          wait, there's more! Soon, you'll be able to schedule this bracket on
          your own, either public or through a special link you share
          with your friends (or, whomever, doesn't have to be friends,
          we don't judge). Check back soon--say, a couple weeks. And the powers
          of 2 rule will also go away, but that may be more months than weeks.
        </Text>
      </Notice>

      <Title>
        Competitors ({sortedCompetitors.length})
      </Title>

      <DndProvider backend={HTML5Backend}>
        {enableDragDrop && (
          <Hint>
            ⓘ Competitors will be seeded based on the order below. Drag and drop
            to update the seeding.
          </Hint>
        )}

        <Button
          label="Randomize Seeding"
          onPress={randomTournamentSeeds}
        />

        {sortedCompetitors.map((competitor, index) => (
          <Competitor
            key={competitor.id}
            competitor={competitor}
            refetch={refetch}
            tournamentStatus={tournamentStatus}
            moveCompetitor={moveCompetitor}
            index={index}
            saveSeeds={saveSeeds}
            enableDragDrop={enableDragDrop}
          />
        ))}
      </DndProvider>

      {!['Closed', 'Active'].includes(tournamentStatus) && (
        <AddCompetitor>
          <Subtitle>Add Another</Subtitle>
          <Hint>
            ⓘ Choose from the Autocomplete or Click the Checkbox to add.
          </Hint>
          <EntitySelect
            tournament={data?.currentUser.tournament}
            refetch={refetch}
          />
        </AddCompetitor>
      )}
    </DataState>
  );
};

export default Tournament;
