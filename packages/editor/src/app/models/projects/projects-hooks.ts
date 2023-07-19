import { useSelector, useDispatch } from 'react-redux';
import {
  AssetType,
  ProjectsReqUpload,
  ProjectData,
  ProjectAsset,
  ProjectsReqPreviewAsset,
  ProjectMeta,
  ProjectsReqPreviewProject
} from './projects.types';
import type { ApiResult } from '../../services/requester';
import type { StateProcessor, RootState } from '../../services/state';
import { API, state } from './';

const processor: StateProcessor = {};

export const useProcessor = () => {
  const dispatch = useDispatch();

  processor.dispatch = dispatch;
};

export const resetState = () => {
  if (!processor.dispatch) {
    console.warn('projects processor not ready');
    return;
  }

  processor.dispatch(state.resetState());
};

export const useInteractions = () => {
  return useSelector((data: RootState) => {
    return {
      isDirty: data.projects.isDirty,
      isUncommitted: data.projects.isUncommitted,
      isLoaded: data.projects.isLoaded,
      isNew: data.projects.isNew,
    };
  });
};

export const useData = ():ProjectData  => {
  return useSelector((data: RootState) => data.projects.data);
};

export const setData = (data) => {
  if (!processor.dispatch) {
    console.warn('projects processor not ready');
    return;
  }

  processor.dispatch(state.setData(data));
};

export const useMeta = () => {
  return useSelector((data: RootState) => data.projects.data.meta);
};

export const setMeta = (data) => {
  if (!processor.dispatch) {
    console.warn('projects processor not ready');
    return;
  }

  processor.dispatch(state.setMeta(data));
};

export const useScorm = () => {
  return useSelector((data: RootState) => data.projects.data.scorm);
};

export const setScorm = (data) => {
  if (!processor.dispatch) {
    console.warn('projects processor not ready');
    return;
  }

  processor.dispatch(state.setScorm(data));
};

export const useModules = (moduleId?: number,) => {
  return useSelector((data: RootState) => {
    const hasModuleId = moduleId !== undefined && moduleId !== null && moduleId !== -1;

    if (!hasModuleId) {
      return data.projects.data.modules;
    }
    
    return data.projects.data.modules.filter((module) => {
      return module.id === moduleId;
    })[0];
  });
};

export const addModule = (data) => {
  if (!processor.dispatch) {
    console.warn('projects processor not ready');
    return;
  }

  processor.dispatch(state.addOutlineItem({
    ...data,
    type: 'module',
  }));
};

export const setModule = (data) => {
  if (!processor.dispatch) {
    console.warn('projects processor not ready');
    return;
  }

  processor.dispatch(state.setOutlineItem({
    ...data,
    type: 'module',
  }));
};

export const duplicateModule = (data) => {
  if (!processor.dispatch) {
    console.warn('projects processor not ready');
    return;
  }

  processor.dispatch(state.duplicateOutlineItem({
    ...data,
    type: 'module',
  }));
};

export const removeModule = (data) => {
  if (!processor.dispatch) {
    console.warn('projects processor not ready');
    return;
  }

  processor.dispatch(state.removeOutlineItem({
    ...data,
    type: 'module'
  }));
};

export const useLessons = (moduleId?: number, lessonId?: number) => {
  return useSelector((data: RootState) => {
    const hasModuleId = moduleId !== undefined && moduleId !== null && moduleId !== -1;
    const hasLessonId = lessonId !== undefined && lessonId !== null && lessonId !== -1;

    if (!hasModuleId) {
      return data.projects.data.lessons;
    }

    if (!hasLessonId) {
      return data.projects.data.lessons.filter((lesson) => {
        return lesson.moduleId === moduleId;
      })
    }
    
    return data.projects.data.lessons.filter((lesson) => {
      return lesson.moduleId === moduleId && lesson.id === lessonId;
    })[0];
  });
};

export const addLesson = (data) => {
  if (!processor.dispatch) {
    console.warn('projects processor not ready');
    return;
  }

  processor.dispatch(state.addOutlineItem({
    ...data,
    type: 'lesson',
  }));
};

export const setLesson = (data) => {
  if (!processor.dispatch) {
    console.warn('projects processor not ready');
    return;
  }

  processor.dispatch(state.setOutlineItem({
    ...data,
    type: 'lesson',
  }));
};

export const duplicateLesson = (data) => {
  if (!processor.dispatch) {
    console.warn('projects processor not ready');
    return;
  }

  processor.dispatch(state.duplicateOutlineItem({
    ...data,
    type: 'lesson',
  }));
};

export const removeLesson = (data) => {
  if (!processor.dispatch) {
    console.warn('projects processor not ready');
    return;
  }

  processor.dispatch(state.removeOutlineItem({
    ...data,
    type: 'lesson'
  }));
};

export const moveOutlineItem = (data) => {
  if (!processor.dispatch) {
    console.warn('projects processor not ready');
    return;
  }

  processor.dispatch(state.moveOutlineItem(data));
};

export const useGlossary = () => {
  return useSelector((data: RootState) => data.projects.data.glossary);
}

export const addGlossaryItem = (data) => {
  if (!processor.dispatch) {
    console.warn('projects processor not ready');
    return;
  }

  processor.dispatch(state.addGlossaryItem(data));
};

export const setGlossaryItem = (data) => {
  if (!processor.dispatch) {
    console.warn('projects processor not ready');
    return;
  }

  processor.dispatch(state.setGlossaryItem(data));
};

export const removeGlossaryItem = (data) => {
  if (!processor.dispatch) {
    console.warn('projects processor not ready');
    return;
  }

  processor.dispatch(state.removeGlossaryItem(data));
};

export const useResources = () => {
  return useSelector((data: RootState) => data.projects.data.resources);
}

export const addResourceItem = (data) => {
  if (!processor.dispatch) {
    console.warn('projects processor not ready');
    return;
  }

  processor.dispatch(state.addResourceItem(data));
};

export const setResourceItem = (data) => {
  if (!processor.dispatch) {
    console.warn('projects processor not ready');
    return;
  }

  processor.dispatch(state.setResourceItem(data));
};

export const removeResourceItem = (data) => {
  if (!processor.dispatch) {
    console.warn('projects processor not ready');
    return;
  }

  processor.dispatch(state.removeResourceItem(data));
};

export const useAssets = (assetTypes?: Array<AssetType>): Array<ProjectAsset> => {
  return useSelector((data: RootState) => {
    let list;

    if (!assetTypes) {
      list = data.projects.assets;
    } else {
      list = data.projects.assets.filter((asset) => {
        return assetTypes.indexOf(asset.type) !== -1;
      });
    }

    return list.filter((asset) => {
      return !asset.isDeleted;
    })
  });
}

export const setAssets = (data) => {
  if (!processor.dispatch) {
    console.warn('projects processor not ready');
    return;
  }

  processor.dispatch(state.setAssets(data));
};

export const addAsset = (data) => {
  if (!processor.dispatch) {
    console.warn('projects processor not ready');
    return;
  }

  processor.dispatch(state.addAssetItem(data));
};

export const setAsset = (data) => {
  if (!processor.dispatch) {
    console.warn('projects processor not ready');
    return;
  }

  processor.dispatch(state.setAssetItem(data));
};

export const removeAsset = (data) => {
  if (!processor.dispatch) {
    console.warn('projects processor not ready');
    return;
  }

  processor.dispatch(state.removeAssetItem(data));
};

export const create = (data: {
  workspaceId: string,
  blueprint?: string
}): Promise<ApiResult> => {
  return new Promise((resolve) => {
    API.create(data).then((res) => {
      if (res.error) {
        console.error(res)
      } else {
        console.log('created', res);
        setData(res.data);
        // setAssets(res.data.assets);
      }

      resolve(res);
    });
  });
};

export const get = (data: {
  projectId?: string;
  workspaceId?: string;
}): Promise<ApiResult> => {
  return new Promise((resolve) => {
    API.get(data).then((res) => {
      if (res.error) {
        console.error(res);
      } else {
        setData(res.data);
      }

      resolve(res);
    });
  })
};

export const upload = (req: ProjectsReqUpload): Promise<ApiResult> => {
  return new Promise((resolve) => {
    API.upload(req).then((res) => {
      if (res.error) {
        console.error(res);
      }

      resolve(res);
    });
  });
};

export const save = (req: ProjectData): Promise<ApiResult> => {
  return new Promise((resolve) => {
    API.save(req).then((res) => {
      if (processor.dispatch) {
        processor.dispatch(state.resetIsUncommitted());
      }

      if (res.error) {
        console.error(res);
      } else {
        setData(res.data);
      }

      resolve(res);
    });
  });
};

export const publish = (data): Promise<ApiResult> => {

  return new Promise((resolve) => {
    API.publish(data).then((res) => {
      if (res.error) {
        console.error(res);
      }

      resolve(res);
    });
  });
};

export const list = (limit?: number): Promise<ApiResult> => {

  return new Promise((resolve) => {
    API.list(limit).then((res) => {
      if (res.error) {
        console.error(res);
      }

      resolve(res);
    });
  });
};

export const open = (project: ProjectMeta): Promise<ApiResult> => {

  return new Promise((resolve) => {
    API.open(project).then((res) => {
      if (res.error) {
        console.error(res);
      }

      resolve(res);
    });
  });
};

export const previewAsset = (data: ProjectsReqPreviewAsset) => {
  return API.previewAsset(data);
};

export const preview = (payload: ProjectsReqPreviewProject) => {
  return API.preview(payload);
};

export const useProjectBrowser = () => {
  return useSelector((data: RootState) => {
    return data.projects.isOpenProjectBrowser;
  });
};

export const openProjectBrowser = () => {
  if (!processor.dispatch) {
    console.warn('project processor not ready');
    return;
  }

  processor.dispatch(state.openProjectBrowser());
};

export const closeProjectBrowser = () => {
  if (!processor.dispatch) {
    console.warn('project processor not ready');
    return;
  }

  processor.dispatch(state.closeProjectBrowser());
};

export default {
  useProcessor,
  resetState,
  useInteractions,
  useData,
  setData,
  useMeta,
  setMeta,
  useScorm,
  setScorm,
  useModules,
  addModule,
  setModule,
  duplicateModule,
  removeModule,
  useLessons,
  addLesson,
  setLesson,
  duplicateLesson,
  removeLesson,
  moveOutlineItem,
  useGlossary,
  addGlossaryItem,
  setGlossaryItem,
  removeGlossaryItem,
  useResources,
  addResourceItem,
  setResourceItem,
  removeResourceItem,
  useAssets,
  setAssets,
  addAsset,
  setAsset,
  removeAsset,
  create,
  get,
  upload,
  save,
  publish,
  list,
  open,
  previewAsset,
  preview,
  useProjectBrowser,
  openProjectBrowser,
  closeProjectBrowser
};
