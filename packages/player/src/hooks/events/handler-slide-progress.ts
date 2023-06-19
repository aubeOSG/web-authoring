import { CustomEventMap } from '../../../types/globals';

export const useHandlerSlideProgress = () => {
  return ({ detail }: CustomEventMap['slide.progress']) => {
    console.log('event::slide-progress', detail);
  };
};

export default useHandlerSlideProgress;