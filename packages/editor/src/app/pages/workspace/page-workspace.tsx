import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as css from './_page-workspace.scss';
import {
  resetWorkspace,
  setActiveLesson,
  useActiveLesson,
  useNewContent,
  resetNewContent,
} from './page-workspace-hooks';
import {
  Header,
  PaneDetails,
  Canvas,
  PromptProjectName,
  PublishProgress,
  ModuleEditor,
} from './components';
import { Loader } from '../../components/loader';
import { Projects, Workspaces } from '../../models';
import type { ProjectMeta } from '../../models/projects';
import { sys } from '../../services';
import { List } from '@scrowl/utils';

export const Path = '/workspace/:id';
export const isProtected = true;

export const openProject = (project: ProjectMeta) => {
  Projects.open(project).then((res) => {
    if (res.error) {
      sys.messageDialog({
        message: res.message,
      });
      return;
    }

    Projects.resetState();
    resetWorkspace();

    setTimeout(() => {
      Projects.setAssets(res.data.file.assets);
      Projects.setData(res.data);
    }, 1);
  });
};

export const Page = () => {
  const activeLesson = useActiveLesson();
  const projectData = Projects.useData();
  const workspaceData = Workspaces.useData();
  const workspaceSettings = Workspaces.useSettings();
  const [inProgress, setProgress] = useState(true);
  const pageParams = useParams();
  const [projectLoading, setProjectLoading] = useState(false);
  const newContent = useNewContent();
  const [activeTab, setActiveTab] = useState(workspaceSettings.activeTab);

  useEffect(() => {
    if (projectData.id) {
      return;
    }

    if (!pageParams.id) {
      return;
    }

    if (projectLoading) {
      return;
    }

    setProjectLoading(true);
    Projects.get({
      workspaceId: pageParams.id,
    }).then((res) => {
      setProjectLoading(false);
    });
  }, [pageParams]);

  useEffect(() => {
    if (activeLesson.id !== -1) {
      return;
    }

    if (!projectData.lessons || !projectData.lessons.length) {
      return;
    }

    setActiveLesson(projectData.lessons[0]);
  }, [projectData, activeLesson]);

  useEffect(() => {
    if (!projectData.lessons) {
      return;
    }

    if (!newContent.newLesson) {
      return;
    }

    const lessons = List.sortBy(projectData.lessons.slice(), ['id']).reverse();

    setActiveLesson(lessons[0]);
    resetNewContent();
  }, [newContent, projectData]);

  useEffect(() => {
    setActiveTab(workspaceSettings.activeTab);
  }, [workspaceSettings.activeTab]);

  useEffect(() => {
    const updateActiveLesson = (data) => {
      if (!projectData.lessons || data.settings.activeLessonId === -1) {
        return;
      }

      const lessonIdx = List.indexBy(
        projectData.lessons,
        'id',
        data.settings.activeLessonId
      );

      if (lessonIdx === -1) {
        return;
      }

      setActiveLesson(projectData.lessons[lessonIdx]);
    };

    if (projectData && projectData.workspaceId && workspaceData.id === '') {
      Workspaces.get(projectData.workspaceId).then((res) => {
        Workspaces.setData(res.data);
        updateActiveLesson(res.data);
        setProgress(false);
      });
    } else {
      setProgress(false);
    }

    return () => {
      setProgress(true);
    };
  }, [workspaceData, projectData]);

  if (!inProgress) {
    return (
      <>
        <div className={css.workspace}>
          <Header />
          <PaneDetails activeTab={activeTab} />
          <Canvas />
        </div>
        <ModuleEditor />
        <PromptProjectName />
        <PublishProgress />
      </>
    );
  } else {
    return <Loader />;
  }
};

export default {
  Path,
  isProtected,
  Page,
  openProject,
};
