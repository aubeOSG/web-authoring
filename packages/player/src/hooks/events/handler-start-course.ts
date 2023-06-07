import { stateHooks } from '../../state';

export const useHandlerStartCourse = () => {
  const toggleStarted = stateHooks.Course.useToggleStarted();

  return () => {
    toggleStarted(true);
  }
};

export default useHandlerStartCourse;