import React, { useEffect, useState, useRef, useCallback } from 'react';
import { ButtonGroup, Dropdown, Navbar, Nav } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { ui } from '@scrowl/ui';
import * as css from './_workspace-header.scss';
import { Elem, Str } from '@scrowl/utils';
import { Projects, Users, Settings } from '../../../../models';
import type { ProjectsReqPreviewProject } from '../../../../models/projects';
import { menu, sys } from '../../../../services';
import { PublishOverlay, Confirmation } from '../overlay';
import {
  openPublishProgress,
  closePublishProgress,
  useActiveLesson,
} from '../../page-workspace-hooks';

export const Header = () => {
  const projectData = Projects.useData();
  const userData = Users.useData();
  const activeLesson = useActiveLesson();
  const projectMeta = projectData.meta;
  const projectNameRef = useRef<HTMLSpanElement>(null);
  const projectNameInputRef = useRef<HTMLInputElement>(null);
  const [rollbackName, setRollbackName] = useState(projectMeta.name || '');
  const [isOpenPublish, setIsOpenPublish] = useState(false);
  const [isOpenConfirmation, setIsOpenConfirmation] = useState(false);
  const previewMode = Settings.usePreviewMode();
  const animationSettings = Settings.useAnimation();
  const isAnimated = !animationSettings.reducedAnimations;
  const animationDelay = animationSettings.animationDelay;
  const motionOptsContainer = {
    initial: !isAnimated ? {} : { opacity: 0 },
    animate: !isAnimated ? {} : { opacity: 1 },
    transition: !isAnimated
      ? {}
      : {
          opacity: {
            delay: animationDelay,
            duration: 0.2,
          },
        },
  };
  const motionOptsProjectName = {
    initial: !isAnimated ? {} : { marginTop: '-80px' },
    animate: !isAnimated ? {} : { marginTop: '0px' },
    transition: !isAnimated
      ? {}
      : { marginTop: { delay: animationDelay, type: 'spring', bounce: 0.52 } },
  };

  const handleUpdateForm = (ev: React.FocusEvent<HTMLInputElement>) => {
    const newValue = ev.currentTarget.value;

    setRollbackName(newValue);
  };

  const handleUpdateProjectName = (ev: React.FormEvent<HTMLInputElement>) => {
    const newValue = ev.currentTarget.value;

    Projects.setMeta({ name: newValue });
  };

  const handleInputProjectName = (
    ev: React.KeyboardEvent<HTMLInputElement>
  ) => {
    const newValue = ev.currentTarget.value;

    switch (ev.key) {
      case 'Enter':
        ev.currentTarget.blur();
        Projects.setMeta({ name: newValue });
        break;
      case 'Escape':
        Elem.stopEvent(ev);
        ev.currentTarget.value = rollbackName;
        Projects.setMeta({ name: rollbackName });
        ev.currentTarget.blur();
        break;
    }
  };

  const handleProjectPreview = useCallback(
    (payload: ProjectsReqPreviewProject) => {
      Settings.setPreviewMode(payload.type);

      Projects.preview(payload).then((res) => {
        if (res.error) {
          sys.messageDialog({
            message: res.message,
          });
          return;
        }

        const url = res.data.url;

        if (url) {
          window.open(url, '_blank')?.focus();
        }
      });
    },
    [projectData, previewMode]
  );

  const handlePreviewDefault = useCallback(() => {
    const payload: ProjectsReqPreviewProject = {
      type: previewMode,
      project: projectData,
      entityId: activeLesson.id,
    };

    handleProjectPreview(payload);
  }, [projectData, activeLesson, previewMode]);

  const previewMenuItems: Array<menu.ContextMenuItem> = [
    {
      label: `Current Lesson ${previewMode === 'lesson' ? '\u2713' : ''}`,
      type: 'radio',
      checked: previewMode === 'lesson',
      click: useCallback(() => {
        const payload: ProjectsReqPreviewProject = {
          type: 'lesson',
          project: projectData,
          entityId: activeLesson.id,
        };

        handleProjectPreview(payload);
      }, [projectData, activeLesson, previewMode]),
    },
    {
      label: `Current Module ${previewMode === 'module' ? '\u2713' : ''}`,
      type: 'radio',
      checked: previewMode === 'module',
      click: useCallback(() => {
        const payload: ProjectsReqPreviewProject = {
          type: 'module',
          project: projectData,
          entityId: activeLesson.moduleId,
        };

        handleProjectPreview(payload);
      }, [projectData, activeLesson, previewMode]),
    },
    {
      label: `Entire Project ${previewMode === 'project' ? '\u2713' : ''}`,
      type: 'radio',
      checked: previewMode === 'project',
      click: useCallback(() => {
        const payload: ProjectsReqPreviewProject = {
          type: 'project',
          project: projectData,
        };

        handleProjectPreview(payload);
      }, [projectData, previewMode]),
    },
  ];

  const handleOpenPreviewMenu = useCallback(
    (ev: React.MouseEvent, offsetX?: number) => {
      menu.API.contextMenu(ev, previewMenuItems, undefined, {
        alignment: 'left-bottom',
        offset: [-100 + (offsetX ? offsetX : 0), 6],
      });
    },
    [projectData, activeLesson, previewMode]
  );

  const handleOpenPublish = useCallback(() => {
    setIsOpenPublish(true);
  }, [isOpenPublish]);

  const handleCLosePublish = useCallback(() => {
    setIsOpenPublish(false);
  }, [isOpenPublish]);

  const handelSubmitPublish = useCallback(
    (formData) => {
      openPublishProgress();

      const submittedData = {
        ...projectData,
        scorm: formData,
      };

      Projects.publish(submittedData).then((pubRes) => {
        closePublishProgress();

        if (pubRes.error) {
          sys.messageDialog({
            message: pubRes.message,
          });
          return;
        }

        setIsOpenPublish(false);
        const data = pubRes as unknown as Blob;
        const url = window.URL.createObjectURL(data);
        const link = document.createElement('a');
        const courseName =
          submittedData.scorm.name && submittedData.scorm.name.length
            ? submittedData.scorm.name
            : submittedData.meta.name;

        link.href = url;
        link.setAttribute('download', `${Str.toKebabCase(courseName)}.zip`);
        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);

        if (!userData.hasPublished) {
          setIsOpenConfirmation(true);
          Users.update({ hasPublished: true });
        }
      });
    },
    [projectData, userData]
  );

  const handleCloseConfirmation = () => {
    setIsOpenConfirmation(false);
  };

  const handleNameFocus = useCallback((e) => {
    const defaultProjectName = 'untitled project';

    if (
      e.target.value.toLowerCase() === defaultProjectName ||
      projectMeta.name?.toLowerCase() === defaultProjectName
    ) {
      e.target.select();
    }
  }, []);

  useEffect(() => {
    if (projectNameRef.current && projectNameInputRef.current) {
      let newWidth = projectNameRef.current.offsetWidth + 6;

      if (!projectMeta.name || !projectMeta.name.length || newWidth < 200) {
        newWidth = 200;
      }

      projectNameInputRef.current.style.width = `${newWidth}px`;
    }
  }, [projectNameRef.current, projectNameInputRef.current, projectMeta.name]);

  useEffect(() => {
    if (!rollbackName || rollbackName === '') {
      setRollbackName(projectMeta.name as string);
    }
  }, [projectData]);

  return (
    <>
      <motion.div
        initial={motionOptsContainer.initial}
        animate={motionOptsContainer.animate}
        transition={motionOptsContainer.transition}
        className={css.workspaceHeaderWrapper}
      >
        <Navbar fixed="top" expand="xs" className={css.workspaceHeader}>
          <div className={css.projectMeta}>
            <motion.div
              className={css.projectName}
              initial={motionOptsProjectName.initial}
              animate={motionOptsProjectName.animate}
              transition={motionOptsProjectName.transition}
            >
              <span ref={projectNameRef}>
                {projectMeta.name && projectMeta.name.replace(/ /g, '\u00A0')}
              </span>
              <input
                ref={projectNameInputRef}
                className="form-control"
                value={projectMeta.name}
                onChange={handleUpdateProjectName}
                onKeyDown={handleInputProjectName}
                onBlur={handleUpdateForm}
                onFocus={handleNameFocus}
                placeholder="Untitled Project"
              />
            </motion.div>
          </div>

          <Nav className={`${css.projectActions} align-items-center`}>
            <Nav.Item>
              <Dropdown as={ButtonGroup}>
                <ui.Button
                  className={`ms-3 ${css.projectActionsBtn}`}
                  variant="ghost"
                  size="sm"
                  onClick={handlePreviewDefault}
                  onContextMenu={(ev: React.MouseEvent) => {
                    handleOpenPreviewMenu(ev, 102);
                  }}
                >
                  <span className="material-symbols-sharp icon-lesson">
                    interests
                  </span>
                  Preview
                </ui.Button>

                <ui.Button
                  className="dropdown-toggle dropdown-toggle-split"
                  variant="ghost"
                  size="sm"
                  onClick={handleOpenPreviewMenu}
                  onContextMenu={handleOpenPreviewMenu}
                >
                  <span className="material-symbols-sharp owlui-icons">
                    arrow_drop_down
                  </span>
                </ui.Button>
              </Dropdown>
            </Nav.Item>
            <Nav.Item>
              <ui.Button
                className={`ms-3 ${css.projectActionsBtn}`}
                variant="primary"
                size="sm"
                onClick={handleOpenPublish}
              >
                <span className="material-symbols-sharp icon-rocket">
                  rocket_launch
                </span>
                Publish
              </ui.Button>
            </Nav.Item>
          </Nav>
        </Navbar>
      </motion.div>
      <PublishOverlay
        isOpen={isOpenPublish}
        onClose={handleCLosePublish}
        onSubmit={handelSubmitPublish}
      />
      <Confirmation
        isOpen={isOpenConfirmation}
        onClose={handleCloseConfirmation}
      />
    </>
  );
};

export default {
  Header,
};
