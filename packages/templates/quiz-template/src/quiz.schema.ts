import { QuizSchemaProps } from './quiz.types';

export const QuizSchema: QuizSchemaProps = {
  meta: {
    version: '1.0.0',
    label: 'Quiz',
    component: 'Quiz',
    filename: 'quiz',
    category: 'quiz',
    tags: ['text', 'image'],
    icon: 'vertical_split',
  },
  content: {
    question: {
      type: 'Fieldset',
      label: 'Question',
      content: {
        question: {
          type: 'Textbox',
          label: 'Question Text',
          value: 'What does AODA stand for?',
          placeholder: 'Quiz content here...',
          multiLine: true,
          lines: 2,
          autoGrow: 2,
          allowLinebreaks: true,
        },
        // numberOfAnswers: {
        //   type: 'Select',
        //   hint: 'BodyAlignment',
        //   label: 'Number of Answers',
        //   value: '5',
        //   options: [
        //     {
        //       name: '2',
        //       value: '2',
        //     },
        //     {
        //       name: '3',
        //       value: '3',
        //     },
        //     {
        //       name: '4',
        //       value: '4',
        //     },
        //     {
        //       name: '5',
        //       value: '5',
        //     },
        //   ],
        //   iconFromValue: false,
        // },
        // correctAnswer: {
        //   type: 'Radio',
        //   label: 'Correct Answer',
        //   value: 1,
        //   displayLabel: true,
        //   options: [
        //     {
        //       label: 'Answer 1',
        //       value: 1,
        //     },
        //     {
        //       label: 'Answer 2',
        //       value: 2,
        //     },
        //     {
        //       label: 'Answer 3',
        //       value: 3,
        //     },
        //     {
        //       label: 'Answer 4',
        //       value: 4,
        //     },
        //     {
        //       label: 'Answer 5',
        //       value: 5,
        //     },
        //   ],
        // },
      },
    },
    //@ts-ignore
    answer1: {
      //@ts-ignore
      type: 'Fieldset',
      label: 'Answer 1',
      content: {
        answerText: {
          type: 'Textbox',
          // label: 'Alt Text',
          placeholder: 'Answer 1',
          value: 'Accessibility for Ontarians with Disabilities Act.',
        },
        correctness: {
          type: 'Checkbox',
          label: 'Mark as correct',
          value: true,
        },
      },
    },
    //@ts-ignore
    answer2: {
      //@ts-ignore
      type: 'Fieldset',
      label: 'Answer 2',
      content: {
        answerText: {
          type: 'Textbox',
          // label: 'Alt Text',
          placeholder: 'Answer 2',
          value: "Association for Ontario's Disabled Adults.",
        },
        correctness: {
          type: 'Checkbox',
          label: 'Mark as correct',
          value: true,
        },
      },
    },

    //@ts-ignore
    answer3: {
      //@ts-ignore
      type: 'Fieldset',
      label: 'Answer 3',
      content: {
        answerText: {
          type: 'Textbox',
          // label: 'Alt Text',
          placeholder: 'Answer 3',
          value: 'Act for Ontarians with Disabilities and Afflictions.',
        },
        correctness: {
          type: 'Checkbox',
          label: 'Mark as correct',
          value: false,
        },
      },
    },
    //@ts-ignore
    answer4: {
      type: 'Fieldset',
      label: 'Answer 4',
      content: {
        answerText: {
          type: 'Textbox',
          // label: 'Alt Text',
          placeholder: 'Answer 4',
          value: 'None of the above.',
        },
        correctness: {
          type: 'Checkbox',
          label: 'Mark as correct',
          value: false,
        },
      },
    },

    options: {
      //@ts-ignore
      type: 'Fieldset',
      label: 'Options',
      //@ts-ignore

      content: {
        // alignment: {
        //   type: 'Select',
        //   hint: 'BodyAlignment',
        //   label: 'Alignment',
        //   value: 'center',
        //   options: [
        //     {
        //       name: 'Align Left',
        //       value: 'left',
        //       icon: 'align_horizontal_left',
        //     },
        //     {
        //       name: 'Align Center',
        //       value: 'center',
        //       icon: 'align_horizontal_center',
        //     },
        //   ],
        //   iconFromValue: true,
        // },
        showProgress: {
          type: 'Checkbox',
          label: 'Show Progress Bar',
          value: true,
        },
      },
    },
  },
  controlOptions: {
    stopUserAdvancement: {
      type: 'Checkbox',
      label: 'Stop User Advancement',
      value: false,
    },
    disableAnimations: {
      type: 'Checkbox',
      label: 'Disable Animations',
      value: false,
    },
  },
};

export default {
  QuizSchema,
};
