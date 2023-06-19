export const useHandlerKeyboardNav = () => {
  const navigate = (e: KeyboardEvent) => {
    console.log('event:keyboard-nav', e);
  };

  return (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      navigate(e);
    }
  };
};

export default useHandlerKeyboardNav;

// const handleArrowKeys = (ev) => {
//   if (Scrowl && Scrowl.runtime) {
//     if (Scrowl.runtime.API !== null) {
//       const [error, suspendData] = Scrowl.runtime.getSuspendData();
//       if (suspendData === '{}') {
//         return;
//       } else {
//         const parsedData = JSON.parse(suspendData);
//         if (error || !parsedData.courseStarted) {
//           return;
//         }
//       }
//     }
//   }

//   let matchingId;

//   if (targets.current && currentSlide !== 'owlui-last') {
//     matchingId = targets.current.find((t) => {
//       return t === currentSlide;
//     });
//   } else {
//     currentIndex = targets.current.length;
//   }

//   if (matchingId) {
//     currentIndex = targets.current?.indexOf(matchingId);
//   }

//   let targetID;
//   let targetElement;

//   switch (ev.key) {
//     case 'ArrowLeft':
//       if (currentIndex === 0) {
//         return;
//       }
//       if (currentIndex === 1) {
//         targetID = targets.current[0];
//         targetElement = document.querySelector(`#${targetID}`);
//         currentIndex = 0;
//         currentSlide = `module-${slides[0].moduleId}--lesson-${slides[0].lessonId}--slide-${slides[0].id}-${slides[0].template.meta.filename}`;
//         setTimeout(() => {
//           targetElement?.scrollIntoView({
//             behavior: 'smooth',
//             block: 'center',
//             inline: 'start',
//           });
//         }, 0);
//       } else {
//         targetID = targets.current[currentIndex - 1];
//         targetElement = document.querySelector(`#${targetID}`);

//         if (
//           slides[currentIndex - 1].template.controlOptions.disableAnimations
//             .value === true
//         ) {
//           setTimeout(() => {
//             targetElement?.scrollIntoView({
//               behavior: 'smooth',
//               block: 'center',
//               inline: 'start',
//             });
//           }, 0);
//         } else {
//           setTimeout(() => {
//             targetElement?.scrollIntoView({
//               behavior: 'smooth',
//               block: 'center',
//               inline: 'start',
//             });
//           }, 0);
//         }
//       }
//       break;
//     case 'ArrowRight':
//       if (currentIndex === targets.current.length) {
//         return;
//       }
//       if (currentIndex + 1 === targets.current.length) {
//         targetElement = document.querySelector('.owlui-last');
//         setTimeout(() => {
//           targetElement?.scrollIntoView({
//             behavior: 'smooth',
//             block: 'center',
//             inline: 'start',
//           });
//         }, 0);
//         currentSlide = 'owlui-last';
//       } else {
//         targetID = targets.current[currentIndex + 1];
//         targetElement = document.querySelector(`#${targetID}`);
//         const currentSlideElement = document.querySelector(
//           `#${targets[currentIndex]}`
//         );

//         let scrollMagicPin;

//         if (
//           slides[currentIndex].template.controlOptions.disableAnimations
//             .value === false
//         ) {
//           scrollMagicPin = currentSlideElement?.parentElement?.parentElement;
//         }

//         if (
//           slides[currentIndex + 1].template.controlOptions.disableAnimations
//             .value === true &&
//           slides[currentIndex].template.controlOptions.disableAnimations
//             .value === false
//         ) {
//           const pinHeight = scrollMagicPin.style.minHeight;
//           const adjustedMargin = Math.abs(parseInt(pinHeight) / 2) * -1;

//           scrollMagicPin.style.marginBottom = `${adjustedMargin.toString()}px`;

//           setTimeout(() => {
//             targetElement?.scrollIntoView({
//               behavior: 'smooth',
//               block: 'center',
//               inline: 'start',
//             });
//           }, 0);
//         } else {
//           setTimeout(() => {
//             targetElement?.scrollIntoView({
//               behavior: 'smooth',
//               block: 'center',
//               inline: 'start',
//             });
//           }, 0);
//         }
//       }
//       break;
//   }

//   const currentSlideObj = {
//     currentIndex: currentIndex,
//     currentSlide: currentSlide,
//   };

//   const currentSlideEvent = new CustomEvent('CurrentSlidePageUpdate', {
//     detail: currentSlideObj,
//   });
//   document.dispatchEvent(currentSlideEvent);
// };