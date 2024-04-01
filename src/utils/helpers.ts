import { z } from "zod";
import { Question, SurveyProp } from "../types/survey";
import { User } from "../types/user";


export const filterGetSelectedId = (questions: Question[]): string[] => {
    let selectedId: string[] = []
      questions.map((question) => {
        question.options.map((option) => {
            if(option.selected && option.id){
                selectedId.push(option.id)
            }
        })
      })
      return selectedId
}

export const filterDataToCreateSurvey = (surveyInfo: SurveyProp, questions: Question[], user: User) => {
  return {
    created_by: user.id,
    title: surveyInfo.title,
    description: surveyInfo.description,
    questions: questions.map((question) => {
      delete question.open
      delete question.required
      return question
    })
  }
}

export const filterDataToUpdateSurvey = (surveyInfo: SurveyProp, questions: Question[]) => {
  return {
    id: surveyInfo.id,
    title: surveyInfo.title,
    description: surveyInfo.description,
    questions: questions.map((question) => {
      delete question.open
      delete question.required
      return question
    })
  }
}

type CheckValidationProps = {
  surveyInfo: SurveyProp,
  questions: Question[],
  setSurveyValidationErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>
}

const hasMinimumOptions = (question: Question): boolean => {
  return question.options.length >= 2;
};

export const checkIfAllValidated = ({
  surveyInfo,
  questions,
  setSurveyValidationErrors,
}: CheckValidationProps) => {

  const surveySchema = z.object({
    id: z.string().optional(),
    title: z.string().min(2, "Survey title must be at least 2 characters").max(200, "Survey title must contain at most 200 characters"),
    description: z.string().min(2, "Survey description must be at least 2 character").max(1000, "Description must contain at most 1000 characters"),
  });

  const questionSchema = z.object({
    title: z.string().min(2, "question title must be at least 2 character").max(200, "question title must contain at most 200 characters"),
    required: z.boolean().default(true).optional(),
    open: z.boolean().default(true)
  });
  const questionsSchema = z.array(questionSchema);

  const optionSchema = z.object({
    title: z.string().min(2, "option title must be at least 2 character").max(200, "option title must contain at most 200 characters"),
    selected: z.boolean().default(false).optional()
  });
  const optionsSchema = z.array(optionSchema);

  const validationSurvey = surveySchema.safeParse(surveyInfo);
  const validationQuestion = questionsSchema.safeParse(questions);
  const validationOption = optionsSchema.safeParse(questions.flatMap(question => question.options));
  const areOptionsValid = questions.every(hasMinimumOptions);
  if (!areOptionsValid) {
    setSurveyValidationErrors({
      options: "Each question must have at least 2 options",
    });
    return false;
  }


  if (!validationSurvey.success) {
    const errors: Record<string, string> = {};
    validationSurvey.error.errors.forEach((error) => {
      if (error.path) {
        errors[error.path[0]] = error.message;
      }
    });
    setSurveyValidationErrors(errors);
    return false;
  }

  if (!validationQuestion.success) {
    const errors: Record<string, string> = {};
    validationQuestion.error?.errors.forEach((error) => {
      if (error.path) {
        errors[error.path[0]] = error.message;
      }
    });
    setSurveyValidationErrors(errors);
    return false;
  }

  if (!validationOption.success) {
    const errors: Record<string, string> = {};
    validationOption.error?.errors.forEach((error) => {
      if (error.path) {
        errors[error.path[0]] = error.message;
      }
    });
    setSurveyValidationErrors(errors);
    return false;
  }

  return true;
}

export const checkIfEmptyAnswer = (questions: Question[]) => {
  let countAnswer = 0
   questions.map((question) => {
      return question.options.map((option) => {
          option.selected && countAnswer++;
      })
  })
  
  return true ? countAnswer === questions.length : false;
}
