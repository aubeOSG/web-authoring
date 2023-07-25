import React, { useState } from 'react';
import { ui } from '@scrowl/ui';
import { Collapse } from 'react-bootstrap';
import { OutlineModulesProps, OutlineModuleItemProps } from './outline.types';
import * as css from '../../_pane-details.scss';
import { OutlineLessons } from './outline-lessons';
import { openModuleEditor } from '../../../../page-workspace-hooks';
import { Projects } from '../../../../../../models';
import { menu, sys } from '../../../../../../services';
import { InlineInput } from '../../../../../../components';
import { ELEM_ALIGNMENT } from '@scrowl/utils';

export const OutlineModuleItem = ({
  module,
  idx,
  className,
  ...props
}: OutlineModuleItemProps) => {
  let classes = `${css.outlineHeader} outline-item__module`;
  const [isOpen, setOpen] = useState(true);
  const menuId = `module-menu-${module.id}`;
  const [isEdit, setIsEdit] = useState(false);
  const inputContainerProps = {
    draggable: true,
    'data-outline-type': 'module',
    'data-module-id': module.id,
  };
  const moduleMenuItems: Array<menu.ContextMenuItem> = [
    {
      label: 'Add Lesson',
      click: () => {
        Projects.addLesson({
          id: -1,
          moduleId: module.id,
        });
      },
    },
    {
      label: 'Duplicate Module',
      click: () => {
        Projects.duplicateModule(module);
      },
    },
    {
      label: 'Add New Module After',
      click: () => {
        Projects.addModule({
          id: module.id,
        });
      },
    },
    { type: 'separator' },
    {
      label: 'Rename',
      click: () => {
        setIsEdit(true);
      },
    },
    {
      label: 'Edit',
      click: () => {
        openModuleEditor(module);
      },
    },
    { type: 'separator' },
    {
      label: 'Delete Module',
      click: () => {
        // TODO: reimplement error handling and verifying whether user is sure they want to delete
        Projects.removeModule(module);
      },
    },
  ];

  if (className) {
    classes += `${className} `;
  }

  const handleToggleOpen = (ev: React.MouseEvent) => {
    ev.preventDefault();
    setOpen(!isOpen);
  };

  const handleOpenModuleMenu = (
    ev: React.MouseEvent,
    alignment?: ELEM_ALIGNMENT
  ) => {
    const target = ev.target as HTMLElement;

    menu.API.contextMenu(ev, moduleMenuItems, undefined, { alignment }).then(
      (result) => {
        target.blur();
      }
    );
  };

  const handleNameChange = (val) => {
    const updateData = {
      ...module,
      name: val,
    };

    Projects.setModule(updateData);
  };

  const handleNameClose = () => {
    setIsEdit(false);
  };

  return (
    <div className={css.outlineModule} {...props} data-module-id={module.id}>
      <div className={classes}>
        <ui.Button
          aria-expanded={isOpen}
          aria-controls={menuId}
          className={css.outlineItem}
          onClick={handleToggleOpen}
          onContextMenu={handleOpenModuleMenu}
          variant="link"
        >
          <div className={css.moduleIcons}>
            <span className={css.outlineItemIconHandle}>
              <span
                className="material-symbols-rounded owlui-icons"
                style={{ fontSize: '1.375rem' }}
              >
                arrow_drop_down
              </span>
            </span>
            <span className={css.outlineItemIconDetail}>
              <span className="material-symbols-outlined icon-outline">
                folder
              </span>
            </span>
            <InlineInput.Text
              isEdit={isEdit}
              text={module.name}
              onChange={handleNameChange}
              onBlur={handleNameClose}
              containerProps={inputContainerProps}
            />
          </div>
        </ui.Button>
        <ui.Button
          className={css.actionMenu}
          variant="ghost"
          onClick={(ev) => {
            handleOpenModuleMenu(ev, 'left-bottom');
          }}
          onContextMenu={(ev) => {
            handleOpenModuleMenu(ev, 'left-bottom');
          }}
        >
          <span className="material-symbols-rounded owlui-icons">
            more_vert
          </span>
        </ui.Button>
      </div>
      <Collapse in={isOpen}>
        <div>
          <OutlineLessons id={menuId} moduleId={module.id} moduleIdx={idx} />
        </div>
      </Collapse>
    </div>
  );
};

export const OutlineModules = ({
  className,
  ...props
}: OutlineModulesProps) => {
  const modules = Projects.useModules();
  let classes = `outline-list-module`;
  let addClasses = `${css.outlineAdd} outline-item__module`;

  const handleAddModule = () => {
    Projects.addModule({
      id: -1,
      passingThreshold: 75,
    });
  };

  if (className) {
    classes += ` ${className}`;
  }

  return (
    <div className={classes} {...props}>
      {modules.map((module, idx) => {
        return <OutlineModuleItem key={idx} module={module} idx={idx} />;
      })}
      <ui.Button
        variant="link"
        className={addClasses}
        onClick={handleAddModule}
        data-module-id={-1}
      >
        <span className="material-symbols-outlined owlui-icons">add</span>
        <span>Add New Module</span>
      </ui.Button>
    </div>
  );
};

export default {
  OutlineModules,
  OutlineModuleItem,
};
