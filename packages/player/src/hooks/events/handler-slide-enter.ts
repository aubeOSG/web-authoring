export const useHandlerSlideEnter = () => {
  return ({ detail }: CustomEvent) => {
    console.log('event::slide-enter', detail);
  };
};

export default useHandlerSlideEnter;

// const handleSlideEvent = (ev) => {
//   currentSlide = ev.detail.currentTarget.id;
// };