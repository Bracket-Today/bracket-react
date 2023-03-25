import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faForward } from '@fortawesome/free-solid-svg-icons';

import { Subtitle, Text } from 'app/src/styles';
import ClientContext from 'app/src/contexts/ClientContext';
import durationString from 'app/src/utils/durationString';
import { Link } from 'app/src/utils/routing';
import Clone from 'app/src/components/Tournaments/Clone';

const BracketSubtitle = ({ tournament, updatedAt }) => {
  const [remaining, setRemaining] = useState();
  const { currentUser } = useContext(ClientContext);

  useEffect(() => {
    const interval = setInterval(() => {
      if (updatedAt) {
        const elapsed = (Date.now() - updatedAt) / 1000;
        setRemaining(tournament.round.secondsRemaining - elapsed);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [updatedAt]);

  let statusDetail = tournament.status;

  if ('Active' === tournament.status) {
    statusDetail = `Round ${tournament.round.number}`
    if (remaining) {
      statusDetail += ` | ${durationString(remaining)} remaining`;
    }
  } else if (tournament.winner) {
    statusDetail = `WINNER: ${tournament.winner.entity.name}`;
  }

  if (tournament.owner?.username) {
    statusDetail += ` | Bracket by ${tournament.owner.username}`;
  }

  return (
    <>
      <Subtitle>
        {statusDetail}
      </Subtitle>
      {tournament.basedOn && (
        <Subtitle>
          <Link
            style={{color: 'green'}}
            to={tournament.basedOn.bracketPath}
          >
            <Text>Based on "{tournament.basedOn.name}"</Text>
          </Link>
        </Subtitle>
      )}
      {'Closed' === tournament.status && currentUser.registered && (
        <Clone tournament={tournament}>
          <View style={{flexDirection: 'row'}}>
            <FontAwesomeIcon icon={faForward} size={20} color="green" />
            <Subtitle>Create a new bracket based on this one</Subtitle>
          </View>
        </Clone>
      )}
    </>
  );
};

export default BracketSubtitle;
