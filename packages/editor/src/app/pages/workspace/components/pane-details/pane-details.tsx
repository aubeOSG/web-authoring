import React, { useEffect, useRef, useState } from 'react';
import { ui } from '@scrowl/ui';
import { Outline, Glossary, Resources } from './components';
import { Pane } from '../../../../components';
import { Settings, Workspaces } from '../../../../models';

export const PaneDetails = ({ activeTab, setActiveTab }) => {
  const animationSettings = Settings.useAnimation();
  const isAnimated = !animationSettings.reducedAnimations;
  const animationDelay = animationSettings.animationDelay;
  const workspaceData = Workspaces.useData();
  const animationOpts = {
    initial: !isAnimated
      ? {}
      : {
          boxShadow: '-30px 0 0px 0 var(--owl-sidebar-bg)',
          marginBottom: '-32px',
          transform: 'translate( -350px ,0px)',
        },
    animate: !isAnimated
      ? {}
      : {
          marginBottom: '0px',
          transform: 'translate(0px,0px)',
          transition: {
            marginBottom: { delay: animationDelay, duration: 0.4 },
            transform: { delay: animationDelay },
          },
          transitionEnd: { transform: '', marginBottom: '', boxShadow: '' },
        },
  };
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

  const handleSetActiveTab = (key) => {
    setActiveTab(key);
    Workspaces.setData({ activeTab: key });
  };

  useEffect(() => {
    setActiveTab(workspaceData.activeTab);
  }, [workspaceData]);

  return (
    <Pane initial={animationOpts.initial} animate={animationOpts.animate}>
      <ui.Tabs
        defaultActiveKey={activeTab}
        setActiveTab={handleSetActiveTab}
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
