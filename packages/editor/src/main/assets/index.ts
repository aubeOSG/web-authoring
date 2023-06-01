import { BlockTextSchema } from '@scrowl/template-block-text/schema';
import { LessonIntroSchema } from '@scrowl/template-lesson-intro/schema';
import { SimpleTextSchema } from '@scrowl/template-simple-text/schema';
// import { QuizSchema } from '@scrowl/template-quiz/schema';


export const list = [BlockTextSchema, LessonIntroSchema, SimpleTextSchema];

export default {
  list,
};
