import React, { useState, useEffect, useRef } from 'react';
import './_index.scss';
import { QuizProps } from './quiz.types';

// @ts-ignore
const Quiz = ({ id, schema, lesson, ...props }: QuizProps) => {
  const Scrowl = window['Scrowl'];
  let classes = 'template-quiz';
  const Markdown = Scrowl.core.Markdown;
  const editMode = props.editMode ? true : false;
  const focusElement = editMode ? props.focusElement : null;
  const contentId = `${id}-quiz`;
  const question = schema.content.question.content.question.value;
  let answers: any = [];

  Object.keys(schema.content).forEach((key) => {
    if (key.includes('answer')) {
      //@ts-ignore
      answers.push(schema.content[key]);
    }
  });
  let correctAnswers: any = [];
  answers.forEach((answer) => {
    //@ts-ignore
    if (answer.content.correctness.value === true) {
      correctAnswers.push(answer);
    }
  });

  const textFocusCss = focusElement === 'text' && 'has-focus';
  // const alignment = schema.content.options.content.alignment.value;
  // const alignmentCss = alignment === 'right' ? 'right' : 'left';
  const disableAnimations = schema.controlOptions.disableAnimations?.value;
  const stopUserAdvancement = schema.controlOptions.stopUserAdvancement.value;
  const showProgressBar = schema.content.options.content.showProgress.value;
  const showProgressRef = useRef(showProgressBar);
  const slideProgress = useRef(0);
  const [progressBarStyles, setProgressBarStyles] = useState({
    width: showProgressBar ? '0%' : '100%',
  });
  // const selectedAnswer = useRef(null);
  const selectedAnswers: any = useRef([]);

  if (showProgressBar) {
    classes += ' show-progress';
  }

  const handleFocusQuestion = () => {
    if (editMode) {
      Scrowl.core.host.sendMessage({
        type: 'focus',
        field: 'question',
      });
    }
  };

  const handleSlideProgress = (ev) => {
    slideProgress.current = ev.progress;

    if (showProgressRef.current) {
      setProgressBarStyles({
        ...progressBarStyles,
        width: `${ev.progress}%`,
      });
    }
  };

  const handleSlideEnd = () => {
    slideProgress.current = 100;

    if (!showProgressRef.current) {
      return;
    }

    setProgressBarStyles({
      ...progressBarStyles,
      width: `100%`,
    });
  };

  const handleSelectAnswer = (ev) => {
    selectedAnswers.current.pop();
    //@ts-ignore
    selectedAnswers.current.push(ev.target.value);
  };

  const handleSelectAnswers = (ev) => {
    if (ev.target.checked === true) {
      //@ts-ignore
      selectedAnswers.current.push(ev.target.value);
    } else {
      // @ts-ignore
      const targetIndex = selectedAnswers.current.indexOf(ev.target.value);
      selectedAnswers.current.splice(targetIndex, 1);
    }
  };

  // console.log('selected answers: ', selectedAnswers);
  // console.log('corrects: ', correctAnswers);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (correctAnswers.length <= 1) {
      if (
        selectedAnswers.current[0] ===
        correctAnswers[0].content.answerText.value
      ) {
        alert('CORRECT');
        const quizCompleted = new CustomEvent('quizCompleted', {
          detail: {
            question: question,
            answer: correctAnswers[0].content.answerText.value,
            contentId: contentId,
            correct: true,
          },
        });
        document.dispatchEvent(quizCompleted);
      } else {
        alert('INCORRECT');
        const quizCompleted = new CustomEvent('quizCompleted', {
          detail: {
            question: question,
            answer: correctAnswers[0].content.answerText.value,
            contentId: contentId,
            correct: false,
          },
        });
        document.dispatchEvent(quizCompleted);
      }
    } else {
      let passFlag = true;
      correctAnswers.forEach((answer) => {
        if (selectedAnswers.current)
          if (
            !selectedAnswers.current.includes(answer.content.answerText.value)
          ) {
            passFlag = false;
          }
      });

      if (
        passFlag &&
        selectedAnswers.current.length === correctAnswers.length
      ) {
        alert('CORRECT');
        const quizCompleted = new CustomEvent('quizCompleted', {
          detail: {
            question: question,
            answer: correctAnswers[0].content.answerText.value,
            contentId: contentId,
            correct: true,
          },
        });
        document.dispatchEvent(quizCompleted);
      } else {
        alert('INCORRECT');
        const quizCompleted = new CustomEvent('quizCompleted', {
          detail: {
            question: question,
            answer: correctAnswers[0].content.answerText.value,
            contentId: contentId,
            correct: false,
          },
        });
        document.dispatchEvent(quizCompleted);
      }
    }
  };

  useEffect(() => {
    showProgressRef.current = showProgressBar;
    setProgressBarStyles({
      ...progressBarStyles,
      width: showProgressBar ? `${slideProgress.current}%` : `100%`,
    });
  }, [showProgressBar]);

  return (
    <Scrowl.core.Template
      id={`slide-${contentId}`}
      className={classes}
      onProgress={handleSlideProgress}
      onEnd={handleSlideEnd}
      notScene={disableAnimations ? true : false}
      // @ts-ignore
      stopUserAdvancement={stopUserAdvancement}
      {...props}
    >
      <div id={contentId} className="owlui-container">
        <div className={`owlui-row`}>
          <div className={`owlui-col text__wrapper`}>
            <div className="text__container">
              <div className="progress-indictor">
                <div className="progress-bar" style={progressBarStyles}></div>
              </div>
              <div className={`text__value can-focus ${textFocusCss}`}>
                <h3
                  onMouseDown={handleFocusQuestion}
                  className="question__text"
                >
                  <Markdown>{question}</Markdown>
                </h3>

                <div className={`answers__container`}>
                  <form onSubmit={handleSubmit}>
                    {/* @ts-ignore */}
                    {answers.map((answer, idx) => {
                      return (
                        <div className="answer" key={idx}>
                          <input
                            type={
                              correctAnswers.length > 1 ? 'checkbox' : 'radio'
                            }
                            id={`${contentId}-answer-${idx}`}
                            name={question}
                            // @ts-ignore
                            value={answer.content.answerText.value}
                            onChange={
                              correctAnswers.length > 1
                                ? handleSelectAnswers
                                : handleSelectAnswer
                            }
                          />
                          <label htmlFor={`${contentId}-answer-${idx}`}>
                            {/* @ts-ignore */}
                            {answer.content.answerText.value}
                          </label>
                        </div>
                      );
                    })}
                    <input
                      className="owlui-btn owlui-btn-primary submit-answer"
                      type="submit"
                      value="Submit"
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Scrowl.core.Template>
  );
};;;;

export { Quiz as default };
