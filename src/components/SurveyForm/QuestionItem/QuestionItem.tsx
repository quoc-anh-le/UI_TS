import { Accordion, AccordionSummary } from "@mui/material";
import { Question } from "../../../types/survey";
import CloseQuestion from "../CloseQuestion/CloseQuestion";
import ExpandQuestion from "../ExpandQuestion/ExpandQuestion";
import styles from "./QuestionItem.module.scss";
import classNames from "classnames/bind";
import { useActionStore } from "../../../store/store";
import { DO } from "../../../constants/constant";

const cx = classNames.bind(styles);

type Props = {
  question: Question;
  questions: Question[];
  setQuestion: React.Dispatch<React.SetStateAction<Question[]>>;
  indexQuestion: number;
};

const QuestionItem = ({
  question,
  questions,
  setQuestion,
  indexQuestion,
}: Props) => {

  const {action} = useActionStore();

  const handleExpand = () => {
    let expandQuestion = [...questions];
    for (let j = 0; j < expandQuestion.length; j++) {
      if (indexQuestion === j) {
        expandQuestion[indexQuestion].open = true;
      } else {
        expandQuestion[j].open = false;
      }
    }
    setQuestion(expandQuestion);
  };

  return (
    <Accordion
      key={indexQuestion}
      expanded={true}
      className={cx({ add_border: question.open })}
      onChange={action !== "do" ? handleExpand : () => {}}
    >
      <AccordionSummary
        aria-controls="panel1a-content"
        id="panel1a-header"
        style={{ width: "100%" }}
      >
       
        {!questions[indexQuestion].open && (
          <CloseQuestion 
          question={question} 
          indexQuestion={indexQuestion} 
          setQuestion={setQuestion}/>   
        )}
      </AccordionSummary>
      {action !== DO && (questions[indexQuestion].open && (
        <div key={indexQuestion} className={cx("question-boxes")}>
          <ExpandQuestion
            question={question}
            indexQuestion={indexQuestion}
            questions={questions}
            setQuestion={setQuestion}
          />
        </div>
      ))}
    </Accordion>
  );
};

export default QuestionItem;
