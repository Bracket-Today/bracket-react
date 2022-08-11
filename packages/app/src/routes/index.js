import React from 'react';

import {
  Routes as Switch,
  Route
} from 'app/src/utils/routing';

import Home from 'app/src/components/Home';
import Vote from 'app/src/components/Bracket/Vote';
import Bracket from 'app/src/components/Bracket';
import Profile from 'app/src/components/Profile';
import LoginCode from 'app/src/components/Profile/LoginCode';
import Ticket from 'app/src/components/Ticket';
import Tournaments from 'app/src/components/Tournaments';
import Tournament from 'app/src/components/Tournaments/show';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/bracket/vote" element={<Vote />} />
      <Route exact path="/bracket/:id" element={<Bracket />} />
      <Route exact path="/bracket/:id/:slug" element={<Bracket />} />
      <Route exact path="/me" element={<Profile />} />
      <Route exact path="/login/:code" element={<LoginCode />} />
      <Route exact path="/ticket" element={<Ticket />} />
      <Route exact path="/tournaments" element={<Tournaments />} />
      <Route exact path="/tournaments/:id" element={<Tournament />} />
    </Switch>
  );
};

export default Routes;
