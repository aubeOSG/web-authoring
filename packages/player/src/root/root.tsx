import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import './_root.scss';
import Config from './config';
import { Error as ErrorComponent } from '../components';
import { ErrorModal } from '../components/modal';
import { Preview as PreviewPanel } from '../components/preview';
import { PageDefinition } from '../services';
import { formatResponse } from '../utils/formatResponse';
import { ScrollHint } from '../components/scrollHint';
import { store } from '../state';
import { eventHooks } from '../hooks';

const RootEvents = ({ children }: React.AllHTMLAttributes<HTMLDivElement>) => {
  eventHooks.useEvents();
  return <>{children}</>;
};

export const Root = ({ project, scorm, ...props }) => {
  const Scrowl = window['Scrowl'];
  let apiPreference;

  const [showPanel, _setShowPanel] = useState(true);

  if (scorm && scorm.outputFormat) {
    switch (scorm.outputFormat) {
      case '2004 3rd Edition':
        apiPreference = '2004v3';
        break;
      case '1.2':
      default:
        apiPreference = '1.2';
    }
  }

  if (window['Scorm2004API']) {
    // @ts-ignore
    window['API_1484_11'] = new Scorm2004API({});
  }

  if (window['API_1484_11'] !== undefined) {
    let authors;
    if (scorm) {
      authors = scorm.authors;
    } else {
      authors = '';
    }
    const initialData = {
      'learner_id': '1',
      'learner_name': authors,
      'completion_status': 'incomplete',
    };
    window['API_1484_11'].loadFromJSON(initialData);

    window['API_1484_11'].Initialize();
  }

  if (Scrowl.runtime) {
    const [isStarted] = Scrowl.runtime.start(apiPreference);

    if (!isStarted) {
      console.error('unable to start runtime');
    }
  }

  if (!project || !project.lessons || !project.lessons.length) {
    return <ErrorComponent msg="Lessons missing" />;
  }

  if (!project || !project.modules || !project.modules.length) {
    return <ErrorComponent msg="Modules missing" />;
  }

  const lessons = project.lessons;
  const modules = project.modules;
  const resources = project.resources;
  const glossary = project.glossary;
  const name = project.name;
  const subtitle = project.subtitle;

  let moduleIdx;
  let lessonIdx;

  if (Scrowl.runtime) {
    let locationError;
    let location;
    try {
      [locationError, location] = Scrowl.runtime.getLocation();
    } catch (e) {
      console.error(e);
    }

    if (!locationError && location && location.cur) {
      moduleIdx = location.cur.m;
      lessonIdx = location.cur.l;
    }
  }

  const config = Config.create(
    lessons,
    modules,
    resources,
    glossary,
    name,
    subtitle
  );
  const pages = PageDefinition.create(config);

  console.log('config', config);
  console.log('pages', pages);

  //FIXME::slide-removal
  // useEffect(() => {
  //   const handleSlideEnter = (ev) => {
  //     const sceneEvent = ev.detail;
  //     const previousLocation = Scrowl.runtime?.getLocation();

  //     type LocationObject = {
  //       cur: {
  //         m: number;
  //         l: number;
  //         s: number;
  //       };
  //       max: {
  //         m: number;
  //         l: number;
  //         s: number;
  //       };
  //     };

  //     const locationObj: LocationObject = {
  //       cur: {
  //         m: 0,
  //         l: 0,
  //         s: 0,
  //       },
  //       max: {
  //         m: previousLocation?.[1].max ? previousLocation[1].max.m : 0,
  //         l: previousLocation?.[1].max ? previousLocation[1].max.l : 0,
  //         s: previousLocation?.[1].max ? previousLocation[1].max.s : 0,
  //       },
  //     };

  //     const id = sceneEvent.currentTarget.id;

  //     const shortenedId = id
  //       .replace('module', 'm')
  //       .replace('lesson', 'l');

  //     const splitEntries = shortenedId.split('--');

  //     splitEntries.map((entry) => {
  //       const keyPair = entry.split('-');
  //       if (locationObj && locationObj.cur) {
  //         locationObj.cur[keyPair[0]] = parseInt(keyPair[1]);
  //       }
  //     });

  //     if (
  //       !previousLocation ||
  //       !previousLocation[1].max ||
  //       previousLocation[1].max === undefined
  //     ) {
  //       Scrowl.runtime?.updateLocation(locationObj, id);
  //       if (window['API_1484_11'] !== undefined) {
  //         window['API_1484_11'].SetValue(
  //           'cmi.location',
  //           JSON.stringify(locationObj)
  //         );
  //       }
  //     } else {
  //       if (locationObj.cur.m > previousLocation[1].max.m) {
  //         locationObj.max.m = locationObj.cur.m;

  //         if (locationObj.cur.l < previousLocation[1].max.l) {
  //           locationObj.max.l = locationObj.cur.l;
  //         }
  //       } else if (locationObj.cur.l > previousLocation?.[1].max.l) {
  //         if (locationObj.cur.m >= previousLocation?.[1].max.m) {
  //           locationObj.max.l = locationObj.cur.l;
  //         }
  //       }

  //       Scrowl.runtime?.updateLocation(locationObj, id);
  //     }
  //   };

  //   document.addEventListener('slide.enter', handleSlideEnter);

  //   return () => {
  //     document.removeEventListener('slide.enter', handleSlideEnter);
  //   };
  // }, [project]);

  useEffect(() => {
    if (Scrowl && Scrowl.runtime) {
      Scrowl.runtime.getError(true);
    }
  }, []);

  useEffect(() => {
    if (Scrowl.runtime && Scrowl.runtime !== null) {
      if (Scrowl.runtime.API === null) {
        const errorObject = {
          id: '600',
          message: 'Unable to connect to API',
          stack:
            'This course was not able to connect to the SCORM API. Course data will not be saved to the LMS.',
        };
        const errorEvent = new CustomEvent('APIError', { detail: errorObject });
        document.dispatchEvent(errorEvent);
      }
    }

    if (window.navigator.onLine === false) {
      const errorObject = {
        id: '700',
        message: 'No internet connection',
        stack:
          'You are not connected to the internet. Course data will not be saved.',
      };
      const onlineEvent = new CustomEvent('connectionError', {
        detail: errorObject,
      });
      document.dispatchEvent(onlineEvent);
    }
    window.addEventListener('error', (event) => {
      const errorEvent = new CustomEvent('playerError', { detail: event });
      document.dispatchEvent(errorEvent);
    });
  }, [project]);

  let targetUrl;

  if (moduleIdx !== undefined) {
    targetUrl = `/module-${moduleIdx}--lesson-${lessonIdx}`;
  }

  if (window['API_1484_11']) {
    window['API_1484_11'].on('SetValue.cmi.*', () => {
      const value = window['API_1484_11'].GetValue('cmi');
      const p = document.querySelector('#scorm-preview-content');
      if (p) {
        p.textContent = formatResponse(value);
      }
    });
  }

  return (
    <store.StateProvider>
      <RootEvents>
        <Router>
          <div id="scrowl-player" {...props}>
            <main className="owlui-lesson-wrapper">
              <ErrorModal />
              <ScrollHint />
              {window['API_1484_11'] !== undefined && showPanel ? (
                <PreviewPanel />
              ) : null}
              <Routes>
                {pages.map((page, idx) => {
                  return (
                    <Route
                      key={idx}
                      path={page.url}
                      element={<page.Element />}
                    />
                  );
                })}
                <Route
                  path="*"
                  element={
                    <Navigate
                      to={
                        targetUrl && targetUrl.length > 1
                          ? targetUrl
                          : pages[0].url
                      }
                    />
                  }
                />
              </Routes>
            </main>
          </div>
        </Router>
      </RootEvents>
    </store.StateProvider>
  );
};

export default {
  Root,
};
