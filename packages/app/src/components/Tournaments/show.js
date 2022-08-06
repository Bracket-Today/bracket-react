import React, { useCallback, useEffect, useState } from 'react';
import { Platform, View } from 'react-native';
import { useQuery, useMutation } from '@apollo/client';
import styled from 'styled-components/native';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

import { useParams } from 'app/src/utils/routing';
import { Header, Title, Subtitle, Text } from 'app/src/styles';
import DataState from 'app/src/components/DataState';
import colors from 'app/src/styles/colors';

import { USER_TOURNAMENT, UPDATE_TOURNAMENT_SEEDS } from './queries';
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

  useEffect(() => {
    if (data) {
      setSortedCompetitors([...data.currentUser.tournament.competitors]);
    }
  }, [data]);

  const tournamentStatus = data?.currentUser.tournament.status;

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

  // TODO react-dnd is throwing "addEventListener is not a function". in native.
  // Just disable drag drop in native for now.
  const enableDragDrop = 'web' === Platform.OS;

  return (
    <DataState data={data} {...queryStatus}>
      <Header>
        <Title>{data?.currentUser.tournament.name}</Title>
        <Subtitle>{data?.currentUser.tournament.status}</Subtitle>
      </Header>

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
