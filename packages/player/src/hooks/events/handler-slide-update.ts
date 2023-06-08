export const useHandlerSlideUpdate = () => {
  return ({ detail }: CustomEvent) => {
    console.log('event::slide-update', detail);
  };
};

export default useHandlerSlideUpdate;

// const handleUpdateSlideEvent = (ev) => {
//   currentSlide = ev.detail.currentSlide;
// };

// const handleUpdateSlideEvent = (ev) => {
//   currentSlide = ev.detail.currentSlide;
// };