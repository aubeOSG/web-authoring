import { CustomEventMap } from '../../../types/globals';

export const useHandlerSlideEnd = () => {
  return ({ detail }: CustomEventMap['slide.end']) => {
    console.log('event::slide-end', detail);
  };
};

export default useHandlerSlideEnd;