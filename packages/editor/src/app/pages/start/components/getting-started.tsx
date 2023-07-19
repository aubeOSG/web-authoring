import React, { useRef } from 'react';
import { Nav } from 'react-bootstrap';
import { ui } from '@scrowl/ui';
import * as css from '../_page-start.scss';
import { StartNewProps } from '../page-start.types';

export const GettingStarted = ({ hasProjects, ...props }: StartNewProps) => {
  const inProgress = useRef(false);

  const handleNewProject = (blueprint: string) => {
    if (inProgress.current) {
      return;
    }
  };

  return (
    <div className={css.startSection} {...props}>
      <h2>Getting Started</h2>
      <Nav className="flex-column">
        <Nav.Item>
          <ui.Button
            variant="link"
            onClick={() => {
              handleNewProject('beginner');
            }}
          >
            Beginner Tutorial Project
          </ui.Button>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default {
  GettingStarted,
};
