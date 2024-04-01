export type OptionProp = {
  title: string;
  selected: boolean;
  id?: string;
};

export type Question = {
  title: string;
  options: OptionProp[];
  required?: boolean;
  open?: boolean;
};


export type SurveyInfo = {
  id: string;
  title: string;
  description: string;
  participant: number;
  created_by: string;
  created_at: string;
};

export type SurveyProp = {
  id: string;
  title: string;
  description: string;
};

// receive from server
export type QuestionS = {
  id: string;
  options: OptionProp[];
  title: string;
};

export type Survey = {
  id: string;
  title: string;
  description: string;
  questions: QuestionS[];
};

