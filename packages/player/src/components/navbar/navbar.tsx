// @ts-ignore
import React, { useState } from 'react';
import {
  ThemeProvider,
  Navbar,
  Offcanvas,
  Container,
  Tabs,
  Tab,
} from 'react-bootstrap';
import utils, { CssMapProps } from '../../utils';
import * as _css from './_navbar.scss';
import { NavModule } from './nav-module';
import { NavResource } from './nav-resource';
import { NavGlossary } from './nav-glossary';

const css = utils.css.removeMapPrefix(_css);

export const NavBar = ({ pageId, project }) => {
  const Scrowl = window['Scrowl'];
  const [tabKey, setTabKey] = useState('outline');
  const themePrefixes: CssMapProps = {};

  themePrefixes['nav'] = `owlui-nav`;
  themePrefixes['nav-tabs'] = `owlui-nav-tabs`;
  themePrefixes['nav-item'] = `owlui-nav-item`;
  themePrefixes['nav-link'] = `owlui-nav-link`;
  themePrefixes['navbar'] = `owlui-navbar`;
  themePrefixes['navbar-toggler'] = `owlui-navbar-toggler`;
  themePrefixes['tab-pane'] = `owlui-tab-pane`;
  themePrefixes['tab-content'] = `owlui-tab-content`;
  themePrefixes['offcanvas'] = `owlui-offcanvas`;
  themePrefixes['container'] = `owlui-container`;

  return (
    <ThemeProvider prefixes={themePrefixes}>
      <Navbar key="1" expand={false} className="mb-3">
        <Container fluid>
          <Navbar.Toggle
            className={css.navButton}
            aria-controls={`offcanvasNavbar-expand-${false}`}
          />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${false}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${false}`}
            placement="start"
          >
            <Tabs
              className={css.tabsContainer}
              activeKey={tabKey}
              // @ts-ignore
              onSelect={(tab) => setTabKey(tab)}
            >
              <Tab eventKey="outline" key="outline" title="Outline">
                <Offcanvas.Body className={css.outlineOffcanvas}>
                  <div className={css.titleContainer}>
                    <h3>{project.name}</h3>
                    <h4 className={css.outlineSubtitle}>{project.subtitle}</h4>
                    <span className={css.outlineDuration}>
                      <Scrowl.ui.Icon icon="schedule" display="outlined" />
                      <h5>60 min</h5>
                    </span>
                  </div>
                  {project &&
                    project.outlineConfig.map((config, mIdx) => {
                      return (
                        <div className={css.moduleLessons} key={mIdx}>
                          <NavModule
                            pageId={pageId}
                            config={config}
                            mIdx={mIdx}
                            key={mIdx}
                          />
                        </div>
                      );
                    })}
                </Offcanvas.Body>
              </Tab>
              <Tab eventKey="resources" key="resources" title="Resources">
                <Offcanvas.Body className={css.outlineOffcanvas}>
                  <div className={css.titleContainer}>
                    <h3 className={css.resourceTitle}>Additional Resources</h3>
                    {project.resources &&
                      project.resources.map((resource, idx) => {
                        return (
                          <div className={css.navResources} key={idx}>
                            <NavResource resource={resource} />
                            <hr />
                          </div>
                        );
                      })}
                  </div>
                </Offcanvas.Body>
              </Tab>
              <Tab eventKey="glossary" key="glossary" title="Glossary">
                <Offcanvas.Body>
                  <div>
                    {project.glossary && (
                      <NavGlossary glossary={project.glossary} />
                    )}
                  </div>
                </Offcanvas.Body>
              </Tab>
            </Tabs>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </ThemeProvider>
  );
};

export default NavBar;
