import React, { useEffect, useState, useRef } from 'react';
import * as css from './_page-start.scss';
import { Projects } from '../../models';
import { Logo } from '../../components';
import { StartNew, RecentProjects, GettingStarted } from './components';

export const Path = '/start';

export const Page = () => {
  const listInProgress = useRef(false);
  const [inProgress, setProgress] = useState(false);
  const [projects, setProjects] = useState<Array<Projects.ProjectFile>>([]);

  useEffect(() => {
    const getProjects = () => {
      Projects.list(5).then((res) => {
        listInProgress.current = false;

        if (res.error) {
          console.error(res);
          return;
        }

        setProjects(res.data.projects);
      });
    };

    if (!listInProgress.current) {
      listInProgress.current = true;
      getProjects();
    }
  }, [inProgress]);

  return (
    <div className={css.start}>
      <div className={css.startContainer}>
        <div className={css.startHeader}>
          <h1>
            <Logo />
            Scrowl
          </h1>
        </div>

        <StartNew />
        <GettingStarted />
        {projects.length > 0 && <RecentProjects projects={projects} />}
      </div>
    </div>
  );
};

export default {
  Path,
  Page,
};
