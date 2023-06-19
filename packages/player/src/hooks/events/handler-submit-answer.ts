export const useHandlerSubmitAnswer = () => {
  return ({ detail }: CustomEvent) => {
    const updateOutroEvent = new CustomEvent('updateOutro', {
      detail,
    });

    document.dispatchEvent(updateOutroEvent);

    if (detail.correct) {
      const nextSlideEvent = new CustomEvent('nextSlide');

      document.dispatchEvent(nextSlideEvent);
    }
  };
};

export default useHandlerSubmitAnswer;

// const handleSubmitQuizAnswer = useCallback((_ev) => {
//   const updateOutro = new CustomEvent('updateOutro', {
//     detail: _ev.detail,
//   });
//   document.dispatchEvent(updateOutro);

//   if (_ev.detail.correct) {
//     const currentIndex = targets.current.indexOf(currentSlide);
//     const nextSlide = document.querySelector(
//       `#${targets.current[currentIndex + 1]}`
//     );

//     nextSlide?.scrollIntoView();
//   }
// }, []);