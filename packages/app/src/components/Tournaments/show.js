import React, { useCallback, useEffect, useState } from 'react';
import { Platform, View } from 'react-native';
import { useQuery, useMutation } from '@apollo/client';
import styled from 'styled-components/native';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import MediaQuery from 'react-native-web-responsive';
import { DateTime } from 'luxon';
import { ActivityIndicator } from 'react-native';

import { useNavigate, useParams, Link } from 'app/src/utils/routing';
import { Header, Title, Subtitle, Text, Notice, Hint } from 'app/src/styles';
import DataState from 'app/src/components/DataState';
import { Button } from 'app/src/elements/buttons';
import Confirm from 'app/src/elements/Confirm';
import colors from 'app/src/styles/colors';
import Contest from 'app/src/components/Bracket/Contest';

import {
  USER_TOURNAMENT,
  DELETE_TOURNAMENT,
  UPDATE_TOURNAMENT_SEEDS,
} from './queries';
import Competitor from './Competitor';
import EditTournament from './Edit';
import EntitySelect from './EntitySelect';
import RandomizeSeeds from './RandomizeSeeds';
import ScheduleTournament from './Schedule';
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

const Buttons = styled(View)`
  flex-direction: row;
`;

const TournamentButton = styled(Button)`
  width: 80px;
  margin-left: 10px;
`;

const dndOptions = {
  enableMouseEvents: true
};

const formattedStart = data => {
  if (!data || !data.currentUser.tournament.startAt) { return null; }

  const time = DateTime.fromISO(data.currentUser.tournament.startAt);
  return time.toLocaleString(DateTime.DATETIME_FULL_WITH_SECONDS);
};

const Tournament = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [sortedCompetitors, setSortedCompetitors] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showRandomizeModal, setShowRandomizeModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

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

  // Native doesn't refresh after sortedCompetitors set until a UI interaction
  // using just the normal DataState handling. This was easier than
  // understanding why. (Jared Morgan 20221025)
  if ('undefined' === typeof sortedCompetitors) {
    return <ActivityIndicator size="large" color={colors.screen} />;
  }

  const tournamentStatus = data?.currentUser.tournament.status;
  const canEditCompetitors = !['Active', 'Closed'].includes(tournamentStatus);
  const competitorsLength = sortedCompetitors.length;
  const canSchedule = competitorsLength >= 8;
  const bracketPath = data?.currentUser.tournament.bracketPath;
  const bracketUrl = `https://www.bracket.today${bracketPath}`;
  const shortBracketUrl = bracketUrl.split('/').slice(0, -1).join('/');

  // TODO react-dnd is throwing "addEventListener is not a function". in native.
  // Just disable drag drop in native for now.
  const enableDragDrop = 'web' === Platform.OS && canEditCompetitors;

  return (
    <DataState data={data} {...queryStatus}>
      <Header>
        <Title>{data?.currentUser.tournament.name}</Title>
        {data?.currentUser.tournament.notes && (
          <Hint>{data.currentUser.tournament.notes}</Hint>
        )}
        <Subheader>
          <Subtitle>
            <MediaQuery minWidth={800}>
              <>
                <Text>{tournamentStatus}</Text>
                {['Pending', 'Active'].includes(tournamentStatus) && (
                  <>
                    <Text> - </Text>
                    <Link style={{color: 'green'}} to={bracketPath}>
                      <Text>{shortBracketUrl}</Text>
                    </Link>
                  </>
                )}
                {'Pending' === tournamentStatus && (
                  <Text> - starts {formattedStart(data)}</Text>
                )}
              </>
            </MediaQuery>
            <MediaQuery maxWidth={799}>
              <Text>{tournamentStatus}</Text>
            </MediaQuery>
          </Subtitle>
          {canEditCompetitors && (
            <Buttons>
              <TournamentButton
                label="Edit"
                onPress={() => setShowEditModal(true)}
                inline
              />
              <TournamentButton
                label="Delete"
                onPress={() => setShowDeleteConfirm(true)}
                style={{backgroundColor: colors.danger}}
                inline
              />
            </Buttons>
          )}
        </Subheader>
        <MediaQuery maxWidth={799}>
          <>
            {['Pending', 'Active'].includes(tournamentStatus) && (
              <Link style={{color: 'green'}} to={bracketPath}>
                <Text>{shortBracketUrl}</Text>
              </Link>
            )}
            {'Pending' === tournamentStatus && (
              <Text>Starts {formattedStart(data)}</Text>
            )}
          </>
        </MediaQuery>
        {data?.currentUser.tournament.basedOn && (
          <Subtitle>
            <Link
              style={{color: 'green'}}
              to={data.currentUser.tournament.basedOn.bracketPath}
            >
              <Text>
                Based on "{data.currentUser.tournament.basedOn.name}"
              </Text>
            </Link>
          </Subtitle>
        )}
      </Header>

      {canEditCompetitors && (
        <>
          {canSchedule ? (
            data?.currentUser.registered ? (
              <Button
                label={
                  'Pending' === tournamentStatus ?
                    'Bracket is scheduled. Click to update' :
                    'This bracket is ready. Let the people vote!'
                }
                onPress={() => setShowScheduleModal(true)}
                wide
              />
            ) : (
              <Notice>
                <Text>
                  This tournament is eligible to be featured, but if you want to
                  schedule it now, click the Profile link and register your
                  email.
                </Text>
              </Notice>
            )
          ) : (
            <Notice>
              <Text>
                Add at least 8 competitors and we may make this a featured
                bracket.
              </Text>
            </Notice>
          )}

          <Visibility
            tournament={data?.currentUser.tournament}
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
                onPress={() => setShowRandomizeModal(true)}
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
        title="Delete Tournament"
        message="Are you sure you want to delete this tournament?"
        show={showDeleteConfirm}
        setShow={setShowDeleteConfirm}
        onConfirm={deleteTournament}
        dangerous
      />

      {showRandomizeModal && (
        <RandomizeSeeds
          tournament={data?.currentUser.tournament}
          refetch={refetch}
          handleHide={() => setShowRandomizeModal(false)}
        />
      )}

      {showScheduleModal && (
        <ScheduleTournament
          tournament={data?.currentUser.tournament}
          handleHide={() => setShowScheduleModal(false)}
        />
      )}

      {showEditModal && (
        <EditTournament
          tournament={data?.currentUser.tournament}
          handleHide={() => setShowEditModal(false)}
        />
      )}
    </DataState>
  );
};

export default Tournament;
