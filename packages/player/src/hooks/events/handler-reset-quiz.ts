export const useHandlerResetQuiz = () => {
  return ({ detail }: CustomEvent) => {
    console.log('event::reset-quiz', detail);
  };
};

export default useHandlerResetQuiz;

// const randomize = (slides) => {
//   const intro = slides.shift();
//   const outro = slides.pop();

//   const newArray = [...slides];
//   const length = newArray.length;

//   for (let start = 0; start < length; start++) {
//     const randomPosition = Math.floor(
//       (newArray.length - start) * Math.random()
//     );
//     const randomItem = newArray.splice(randomPosition, 1);

//     newArray.push(...randomItem);
//   }

//   slides.unshift(intro);
//   slides.push(outro);

//   newArray.unshift(intro);
//   newArray.push(outro);

//   const setIsLoading = new CustomEvent('setIsLoading', {
//     detail: newArray,
//   });
//   document.dispatchEvent(setIsLoading);

//   const target = document.querySelector(`#${targets.current[0]}`);

//   setTimeout(() => {
//     // @ts-ignore
//     setRandomSlides(newArray);
//     target?.scrollIntoView(false);
//   }, 600);

// const handleResetQuiz = useCallback((_ev) => {
//   const resetQuestions: Array<any> = [];
//   const timeStamp = new Date();
//   timeStamp.toLocaleString();
//   timeStamp.toLocaleDateString();
//   timeStamp.toLocaleTimeString();

//   if (lesson.attempts) {
//     lesson.attempts[attempt.current].questions = _ev.detail.lessonQuestions;
//   }

//   const newAttempt = {
//     started_at: timeStamp,
//     finished_at: '',
//     questions: [] as any,
//   };
//   if (lesson.attempts) {
//     lesson.attempts[attempt.current].finished_at = timeStamp;
//   }

//   slides.forEach((slide) => {
//     if (slide.template.meta.component === 'Quiz') {
//       const question: any = {};
//       const answers: Array<string> = [];
//       //@ts-ignore
//       slide.template.content.answers.content.forEach((answer) => {
//         answers.push(answer.value);
//       });
//       question.id = `${props.id}--slide-${slide.id}-${slide.template.meta.filename}`;
//       question.correct = false;
//       question.question =
//         // @ts-ignore
//         slide.template.content.question.content.question.value;
//       question.answers = answers;
//       resetQuestions.push(question);
//       newAttempt.questions = resetQuestions;
//     }
//   });

//   var ele: any = document.querySelectorAll('input[type=radio]');
//   ele.forEach((el) => {
//     el.checked = false;
//   });

//   lesson.attempts?.push(newAttempt);
//   attempt.current++;

//   randomize(_ev.detail.slides);
// }, []);