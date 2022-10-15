import React, { useCallback, useEffect, useState } from 'react';
import { Platform, View } from 'react-native';
import { useQuery, useMutation } from '@apollo/client';
import styled from 'styled-components/native';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import MediaQuery from 'react-native-web-responsive';

import { useNavigate, useParams } from 'app/src/utils/routing';
import { Header, Title, Subtitle, Text, Notice, Hint } from 'app/src/styles';
import DataState from 'app/src/components/DataState';
import { Button } from 'app/src/elements/buttons';
import Confirm from 'app/src/elements/Confirm';
import colors from 'app/src/styles/colors';
import Contest from 'app/src/components/Bracket/Contest';

import {
  USER_TOURNAMENT,
  DELETE_TOURNAMENT,
  RANDOM_TOURNAMENT_SEEDS,
  UPDATE_TOURNAMENT_SEEDS,
} from './queries';
import Competitor from './Competitor';
import EntitySelect from './EntitySelect';
import Visibility from './Visibility';

const CompetitorsContainer = styled(View)`
  flex-direction: row;
`;

const Seeding = styled(View)`
  flex: 1;
`;

const Preview = styled(View)`
  flex: 1;
  max-width: 400px;
  margin-left: 20px;
  background-color: #f0f0f0;
  padding: 10px;
`;

const AddCompetitor = styled(View)`
  margin-top: 10px
  border-top-style: solid;
  border-top-color: black;
  border-top-width: 1px;
`;

const Subheader = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const dndOptions = {
  enableMouseEvents: true
};

const Tournament = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [sortedCompetitors, setSortedCompetitors] = useState([]);
  const [showRandomizeConfirm, setShowRandomizeConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const { data, refetch, ...queryStatus } =
    useQuery(USER_TOURNAMENT, { variables: { id } });

  const [updateTournamentSeeds] = useMutation(UPDATE_TOURNAMENT_SEEDS, {
    onCompleted: refetch
  });

  const [deleteTournament] = useMutation(DELETE_TOURNAMENT, {
    variables: { input: { id } },
    onCompleted: () => {
      navigate('/tournaments');
    }
  });

  const [randomTournamentSeeds] = useMutation(RANDOM_TOURNAMENT_SEEDS, {
    variables: { input: { id } },
    onCompleted: () => {
      refetch();
      setShowRandomizeConfirm(false);
    }
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
  const canEditCompetitors = !['Active', 'Closed'].includes(tournamentStatus);
  const competitorsLength = sortedCompetitors.length;
  const canSchedule = competitorsLength >= 8;

  // TODO react-dnd is throwing "addEventListener is not a function". in native.
  // Just disable drag drop in native for now.
  const enableDragDrop = 'web' === Platform.OS && canEditCompetitors;

  return (
    <DataState data={data} {...queryStatus}>
      <Header>
        <Title>{data?.currentUser.tournament.name}</Title>
        <Subheader>
          <Subtitle>{data?.currentUser.tournament.status}</Subtitle>
          {canEditCompetitors && (
            <Button
              label="Delete"
              onPress={() => setShowDeleteConfirm(true)}
              dangerous
              inline
            />
          )}
        </Subheader>
      </Header>

      {canEditCompetitors && (
        <>
          <Notice>
            <Text>
              Add at least 8 competitors and we may make this a featured
              bracket.  Soon, you'll be able to schedule this bracket on your
              own, either public or through a special link you share with your
              friends (or, whomever, doesn't have to be friends, we don't
              judge).
            </Text>
          </Notice>

          <Visibility
            tournament={data?.currentUser.tournament}
            canSchedule={canSchedule}
            refetch={refetch}
          />
        </>
      )}

      <CompetitorsContainer>
        <Seeding>
          <Title>
            Competitors ({competitorsLength})
          </Title>

          {enableDragDrop && (
            <Hint>
              ⓘ Competitors will be seeded based on the order below.
              Drag and drop to update the seeding.
            </Hint>
          )}

          <DndProvider backend={HTML5Backend}>
            {canEditCompetitors && (
              <Button
                label="Randomize Seeding"
                onPress={() => setShowRandomizeConfirm(true)}
              />
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

          {canEditCompetitors && (
            <AddCompetitor>
              <Subtitle>Add Another</Subtitle>
              <Hint>
                ⓘ Choose from the Autocomplete or Click the Checkbox to add.
                Place annotations (such as year released) in parentheses.
                Annotations can be added later by editing.
              </Hint>
              <EntitySelect
                tournament={data?.currentUser.tournament}
                refetch={refetch}
              />
            </AddCompetitor>
          )}
        </Seeding>

        <MediaQuery minWidth={800}>
          <Preview>
            <Title>
              First Round Preview
            </Title>

            {data?.currentUser.tournament.firstRoundPreview.map(contest => (
              <View key={contest.id}>
                <Contest contest={contest} refetch={refetch} />
              </View>
            ))}
          </Preview>
        </MediaQuery>
      </CompetitorsContainer>

      <Confirm
        title="Randomize Seeding"
        message="Are you sure you want to randomize the seeding order?"
        show={showRandomizeConfirm}
        setShow={setShowRandomizeConfirm}
        onConfirm={randomTournamentSeeds}
      />

      <Confirm
        title="Delete Tournament"
        message="Are you sure you want to delete this tournament?"
        show={showDeleteConfirm}
        setShow={setShowDeleteConfirm}
        onConfirm={deleteTournament}
        dangerous
      />
    </DataState>
  );
};

export default Tournament;
