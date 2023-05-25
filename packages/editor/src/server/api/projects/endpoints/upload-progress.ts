import type { ProjectsApiUploadProgress } from '../projects.types';

export const upload: ProjectsApiUploadProgress = {
  name: '/projects/upload/progress',
  type: 'send',
  fn: (req, res) => {
    
  },
};

export default upload;