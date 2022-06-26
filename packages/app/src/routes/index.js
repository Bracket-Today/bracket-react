import React from 'react';

import {
  Routes as Switch,
  Route
} from 'app/src/utils/routing';

import Home from 'app/src/components/Home';
import Bracket from 'app/src/components/Bracket';
import Ticket from 'app/src/components/Ticket';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/bracket/:id" element={<Bracket />} />
      <Route exact path="/ticket" element={<Ticket />} />
    </Switch>
  );
};

export default Routes;
