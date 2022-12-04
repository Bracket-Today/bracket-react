import React, { useEffect, useState } from 'react';

import { Subtitle, Text } from 'app/src/styles';
import durationString from 'app/src/utils/durationString';
import { Link } from 'app/src/utils/routing';

const BracketSubtitle = ({ tournament, updatedAt }) => {
  const [remaining, setRemaining] = useState();

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
    </>
  );
};

export default BracketSubtitle;
