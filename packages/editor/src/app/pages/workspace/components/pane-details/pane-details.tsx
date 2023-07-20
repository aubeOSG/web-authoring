import React, { useCallback } from 'react';
import { ui } from '@scrowl/ui';
import { Outline, Glossary, Resources } from './components';
import { Pane } from '../../../../components';
import { Users, Workspaces } from '../../../../models';

export const PaneDetails = ({ activeTab }) => {
  const animationSettings = Users.useAnimations();
  const isAnimated = !animationSettings.reducedAnimations;
  const animationDelay = animationSettings.animationDelay;
  const workspaceSettings = Workspaces.useSettings();

  const paneAnimations = {
    initial: {
      width: `${
        workspaceSettings.paneCollapsed ? '0' : workspaceSettings.paneWidth
      }px`,
    },
    animate: {
      width: `${
        workspaceSettings.paneCollapsed ? '0' : workspaceSettings.paneWidth
      }px`,
      opacity: workspaceSettings.paneCollapsed ? 0 : 1,
      transition: {
        opacity: { delay: 0 },
        // transform: { delay: animationDelay },
      },
      // transitionEnd: { transform: '', marginBottom: '', boxShadow: '' },
    },
  };

  // const animationOpts = {
  //   initial: !isAnimated
  //     ? {}
  //     : {
  //         width: `${
  //           workspaceData.settings.paneCollapsed
  //             ? '0'
  //             : workspaceData.settings.paneWidth
  //         }px`,
  //         boxShadow: '-30px 0 0px 0 var(--owl-sidebar-bg)',
  //         marginBottom: '-32px',
  //         transform: 'translate( -350px ,0px)',
  //       },
  //   animate: !isAnimated
  //     ? {}
  //     : {
  //         width: `${
  //           workspaceData.settings.paneCollapsed
  //             ? '0'
  //             : workspaceData.settings.paneWidth
  //         }px`,
  //         opacity: workspaceData.paneCollapsed ? 0 : 1,
  //         marginBottom: '0px',
  //         transform: 'translate(0px,0px)',
  //         transition: {
  //           opacity: { delay: animationDelay },
  //           marginBottom: { delay: animationDelay, duration: 0.4 },
  //           transform: { delay: animationDelay },
  //         },
  //         transitionEnd: { transform: '', marginBottom: '', boxShadow: '' },
  //       },
  // };

  const tabs = [
    {
      id: 'tab-outline',
      title: 'Outline',
      view: <Outline />,
    },
    {
      id: 'tab-resources',
      title: 'Resources',
      view: <Resources />,
    },
    {
      id: 'tab-glossary',
      title: 'Glossary',
      view: <Glossary />,
    },
  ];

  const handleSetActiveTab = useCallback((key: string) => {
    Workspaces.setSettings({ activeTab: key });
  }, []);

  return (
    <Pane initial={paneAnimations.initial} animate={paneAnimations.animate}>
      <ui.Tabs
        defaultActiveKey={activeTab}
        handleSetActiveTab={handleSetActiveTab}
        items={tabs}
        pxScale="Sm"
        transition={false}
      />
    </Pane>
  );
};

export default {
  PaneDetails,
};
