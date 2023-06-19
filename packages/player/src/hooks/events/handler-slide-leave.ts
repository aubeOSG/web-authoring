import { CustomEventMap } from '../../../types/globals';

export const useHandlerSlideLeave = () => {
  return ({ detail }: CustomEventMap['slide.leave']) => {
    console.log('event::slide-leave', detail);
  };
};

export default useHandlerSlideLeave;