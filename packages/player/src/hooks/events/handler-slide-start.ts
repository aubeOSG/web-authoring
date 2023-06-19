import { CustomEventMap } from '../../../types/globals';

export const useHandlerSlideStart = () => {
  return ({ detail }: CustomEventMap['slide.start']) => {
    console.log('event::slide-start', detail);
  };
};

export default useHandlerSlideStart;