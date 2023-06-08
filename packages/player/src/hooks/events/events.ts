import { useEffect } from 'react';
import useHandlerStartCourse from './handler-start-course';
import useHandlerSubmitAnswer from './handler-submit-answer';
import useHandlerResetQuiz from './handler-reset-quiz';
import useHandlerKeyboardNav from './handler-keyboard-nav';
import useHandlerSlideEnter from './handler-slide-enter';
import useHandlerSlideUpdate from './handler-slide-update';

export const useEvents = () => {
  const handleSubmitAnswer = useHandlerSubmitAnswer();
  const handlerCourseStart = useHandlerStartCourse();
  const handleResetQuiz = useHandlerResetQuiz();
  const handleKeyboardNav = useHandlerKeyboardNav();
  const handlerSlideEnter = useHandlerSlideEnter();
  const handlerSlideUpdate = useHandlerSlideUpdate();

  useEffect(() => {
    document.addEventListener('quizCompleted', handleSubmitAnswer);
    document.addEventListener('startCourse', handlerCourseStart);
    document.addEventListener('resetQuiz', handleResetQuiz);
    document.addEventListener('keydown', handleKeyboardNav);
    document.addEventListener('slide.enter', handlerSlideEnter);
    document.addEventListener('CurrentSlideNavUpdate', handlerSlideUpdate);
    document.addEventListener('CurrentSlidePageUpdate', handlerSlideUpdate);

    return () => {
      document.removeEventListener('quizCompleted', handleSubmitAnswer);
      document.removeEventListener('startCourse', handlerCourseStart);
      document.removeEventListener('resetQuiz', handleResetQuiz);
      document.removeEventListener('keydown', handleKeyboardNav);
      document.removeEventListener('slide.enter', handlerSlideEnter);
      document.removeEventListener('CurrentSlideNavUpdate', handlerSlideUpdate);
      document.removeEventListener('CurrentSlidePageUpdate', handlerSlideUpdate);
    };
  }, []);
};

export default {
  useEvents,
};