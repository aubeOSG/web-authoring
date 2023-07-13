import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { ui } from '@scrowl/ui';
import * as css from '../_page-start.scss';
import { StartNewProps } from '../page-start.types';
import { Projects } from '../../../models';
import { menu } from '../../../services';
import { Workspace } from '../../';

export const StartNew = ({ hasProjects, ...props }: StartNewProps) => {
  const navigator = useNavigate();
  const inProgress = useRef(false);
  const isReady = useRef(false);

  const handleNewProject = () => {
    if (inProgress.current) {
      return;
    }
    //FIXME::electron-web-bug
    // inProgress.current = true;
    // Projects.create().then((result) => {
    //   if (result.error) {
    //     console.error(result);
    //     return;
    //   }

    //   menu.API.enableProjectActions().then(() => {
    //     inProgress.current = false;
    //     navigator(Workspace.Path);
    //   });
    // });
  };

  useEffect(() => {
    if (isReady.current) {
      return;
    }

    menu.API.disableProjectActions().then(() => {
      isReady.current = false;
    });

    return () => {
      isReady.current = true;
    };
  }, [isReady.current]);

  return (
    <div className={css.startSection} {...props}>
      <h2>Start</h2>
      <Nav className="flex-column">
        <Nav.Item>
          <ui.Button variant="link" onClick={handleNewProject}>
            New Project
          </ui.Button>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default {
  StartNew,
};
