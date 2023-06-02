import React, { useEffect, useState } from 'react';
import { ui } from '@scrowl/ui';
import { Col, Form, Row } from 'react-bootstrap';
import * as css from './_module-editor.scss';
import { Modal } from '../../../../../components';
import { Projects } from '../../../../../models';
import {
  useModuleEditor,
  closeModuleEditor,
  useActiveSlide,
} from '../../../page-workspace-hooks';

export const ModuleEditor = () => {
  const title = 'Edit Module';
  const isOpen = useModuleEditor();
  const [stateThreshold, setStateThreshold] = useState(0);
  let project = Projects.useData();
  const activeSlide = useActiveSlide();

  let module;

  if (project && project.modules) {
    module = project.modules[activeSlide.moduleId];
  }

  const handleInputChange = (ev) => {
    const target = ev.target as HTMLInputElement;
    const newVal = parseInt(target.value);

    if (newVal > 0 && newVal <= 100) {
      setStateThreshold(newVal);
    } else if (newVal > 100) {
      setStateThreshold(100);
    } else {
      setStateThreshold(0);
    }
  };

  const handleRangeChange = (ev) => {
    const target = ev.target as HTMLInputElement;
    const newVal = parseInt(target.value);
    setStateThreshold(Math.round(newVal / 10) * 10);
  };

  const handleClose = () => {
    closeModuleEditor();
  };

  const handleSubmit = () => {
    if (project.modules) {
      const newModule = { ...module, passingThreshold: stateThreshold };

      const modules = [...project.modules];

      modules[activeSlide.moduleId] = newModule;

      const newProj = {
        ...project,
        modules: modules,
      };

      console.log('new threshold: ', newProj, project);
      // Projects.setData(newProj);
      closeModuleEditor();
    }
  };

  useEffect(() => {
    if (isOpen) {
      setStateThreshold(module.passingThreshold);
    }
  }, [isOpen]);

  return (
    <Modal
      className="modal-module-editor"
      title={title}
      isOpen={isOpen}
      onClose={handleClose}
    >
      <div className={css.moduleEditorContainer}>
        <div className={css.moduleEditorContent}>
          <div>
            <h3>Passing Threshold: {stateThreshold}%</h3>
            <Form.Group as={Row}>
              <Col xs="9">
                <Form.Range
                  step={10}
                  value={stateThreshold}
                  onChange={handleRangeChange}
                />
              </Col>
              <Col xs="3">
                <Form.Control
                  value={stateThreshold}
                  onChange={handleInputChange}
                />
              </Col>
            </Form.Group>
          </div>
        </div>
      </div>
      <footer className="d-flex justify-content-end">
        <ui.Button variant="link" onClick={handleClose}>
          Cancel
        </ui.Button>
        <ui.Button variant="success" onClick={handleSubmit}>
          Save Module
        </ui.Button>
      </footer>
    </Modal>
  );
};

export default {
  ModuleEditor,
};
