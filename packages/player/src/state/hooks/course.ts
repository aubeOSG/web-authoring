import { useContext } from 'react';
import type { RootState } from '../store';
import { useAppDispatch, useAppSelector } from '../store';
import { Course } from '../slices';

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

export default {
  // state
  useCourseData,
  useHasStarted,
  // actions
  useSetCourse,
  useResetCourse,
  useToggleStarted,
};
