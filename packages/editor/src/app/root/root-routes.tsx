import React from 'react';
import pages from '../pages';
import { Routes, Route, Navigate } from 'react-router-dom';
import RouteProtection from './route-protection';
import { PageConfig } from './root.types';

const RootRoutes = () => {
  let defaultPath = pages.Bypass.config.Path;

  const pageNames = Object.keys(pages);
  const pageModules = pageNames.map((name: string) => {
    const module = pages[name];

    if (module.useProcessor) {
      module.useProcessor();
    }

    return module.config;
  });

  return (
    <Routes>
      {pageModules.map((config: PageConfig, idx: number) => {
        return (
          <Route
            key={idx}
            path={config.Path}
            element={
              config.isProtected ? (
                <RouteProtection>
                  <config.Page />
                </RouteProtection>
              ) : (
                <config.Page />
              )
            }
          />
        );
      })}
      <Route path="*" element={<Navigate to={defaultPath} />} />
    </Routes>
  );
};

export default RootRoutes;
