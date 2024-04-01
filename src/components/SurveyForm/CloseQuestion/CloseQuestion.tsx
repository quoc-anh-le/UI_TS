import { FormControlLabel, Radio, Typography } from "@mui/material";
import classNames from "classnames/bind";
import styles from "./CloseQuestion.module.scss";
import { Question } from "../../../types/survey";
import { useActionStore } from "../../../store/store";
import { DO } from "../../../constants/constant";

const cx = classNames.bind(styles);

type Prop ={
    question: Question,
    indexQuestion: number
    setQuestion: React.Dispatch<React.SetStateAction<Question[]>>;
}

const CloseQuestion = ({ question, indexQuestion, setQuestion }: Prop) => {

  const {action} = useActionStore()

  const handleChangeSelectedOption = (indexOption: number) => {
    setQuestion((prevQuestions) =>
      prevQuestions.map((question, questionIndex) => ({
        ...question,
        options:
          questionIndex === indexQuestion
            ? question.options.map((option, optionIndex) => ({
                ...option,
                selected: optionIndex === indexOption,
              }))
            : question.options,
      }))
    );
  };
  

  return (
    <div className={cx("saved_question")}>
      <Typography
        sx={{
          fontSize: "17px",
          fontWeight: "400",
          letterSpacing: ".1px",
          lineHeight: "24px",
          paddingBottom: "8px",
        }}
      >
        {indexQuestion + 1}. {question.title}
      </Typography>
      {question.options.map((option, i) => (
        <div key={i} >
          <div style={{ display: "flex" }}>
            <FormControlLabel
              sx={{ marginLeft: "5px", marginBottom: "5px" }}
         
              control={
                <Radio
                  sx={{ marginRight: "10px" }}
                  checked={option.selected}
                  required={question.required}
                  disabled={action !== DO}
                  onChange={() => (handleChangeSelectedOption(i))}
                  value="a"
                  name="radio-buttons"
                  inputProps={{ "aria-label": "A" }}
                />
              }
              label={
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "400",
                    letterSpacing: ".2px",
                    lineHeight: "20px",
                    color: "#202124",
                  }}
                >
                  {question.options[i].title}
                </Typography>
              }
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CloseQuestion;
