import { useContext } from 'react';
import type { RootState } from '../../state/store';
import { useAppDispatch, useAppSelector } from '../../state/store';
import { Course } from '../../state/slices';

/** 
 * Here begins hooks to state
*/

export const useCourseData = () => {
  return useAppSelector((state: RootState) => {
    return state.course;
  });
};

export const useHasStarted = () => {
  return useAppSelector((state: RootState) => {
    return state.course.hasStarted;
  });
};

export const useCurrentLesson = () => {
  return useAppSelector((state: RootState) => {
    return {
      id: state.course.currentLessonId,
      index: state.course.currentLessonIndex,
    };
  });
};

/** 
 * Here begins hooks to actions
*/

export const useSetCourse = () => {
  const dispatch = useContext(useAppDispatch);

  return (data: typeof Course.initialState) => {
    dispatch(Course.set(data));
  };
}

export const useResetCourse = () => {
  const dispatch = useContext(useAppDispatch);

  return () => {
    dispatch(Course.reset());
  };
};

export const useToggleStarted = () => {
  const dispatch = useContext(useAppDispatch);

  return (started?: boolean) => {
    dispatch(Course.toggleStarted(started));
  };
};

export const useUpdateCurrentLesson = () => {
  const dispatch = useContext(useAppDispatch);

  return (currentLesson: { id: string; index: number }) => {
    dispatch(Course.updateCurrentLesson(currentLesson));
  };
};

export default {
  // state
  useCourseData,
  useHasStarted,
  useCurrentLesson,
  // actions
  useSetCourse,
  useResetCourse,
  useToggleStarted,
  useUpdateCurrentLesson,
};
