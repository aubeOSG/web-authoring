import React from 'react';
import './_root.scss';
import { BrowserRouter } from 'react-router-dom';
import * as models from '../models';
import RootRoutes from './root-routes';
import { ProjectBrowser, ContextMenu } from '../components';
import { CookiesProvider } from '../contexts/cookies';
import { OAuthProvider } from '../contexts/oauth';

export const Root = () => {
  //TODO::convert to a common app dispatch with useContext / provider pattern
  models.Settings.useProcessor();
  models.Projects.useProcessor();
  models.Users.useProcessor();
  models.Workspaces.useProcessor();

  return (
    <CookiesProvider>
      <OAuthProvider>
        <BrowserRouter basename="/app">
          <main>
            <RootRoutes />
          </main>
          <ProjectBrowser />
          <ContextMenu.Menu />
        </BrowserRouter>
      </OAuthProvider>
    </CookiesProvider>
  );
};
