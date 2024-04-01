import classNames from "classnames/bind";
import styles from "./Option.module.scss";
import { IconButton, Radio } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {  OptionProp, Question } from "../../../types/survey";
import { useActionStore } from "../../../store/store";
import { DO } from "../../../constants/constant";

const cx = classNames.bind(styles);

type Props = {
  option: OptionProp;
  indexOption: number;
  indexQuestion: number;
  setQuestion: React.Dispatch<React.SetStateAction<Question[]>>;
};

const Option = ({
  option,
  indexOption,
  indexQuestion,
  setQuestion,
}: Props) => {

  const {action} = useActionStore()
  
  const handleChangeSelectedOption = () => {
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

  const handleChangeOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(prevQuestions => {
        const newQuestionOption = [...prevQuestions];
        newQuestionOption[indexQuestion] = {
            ...newQuestionOption[indexQuestion],
            options: [...newQuestionOption[indexQuestion].options],
        };
        newQuestionOption[indexQuestion].options[indexOption] = {
            ...newQuestionOption[indexQuestion].options[indexOption],
            title: e.target.value,
        };
        return newQuestionOption;
    });
};

  const handleRemoveOption = () => {
    setQuestion(prevQuestions => {
      const removeOption = [...prevQuestions];
      if (removeOption[indexQuestion].options.length > 1) {
          removeOption[indexQuestion] = {
              ...removeOption[indexQuestion],
              options: [...removeOption[indexQuestion].options.slice(0, indexOption), ...removeOption[indexQuestion].options.slice(indexOption + 1)],
          };
      }
      return removeOption;
  });
  };

  return (
    <div className={cx("add-question-body")} key={indexOption}>
      <div className={cx("content")}>
        <Radio
          sx={{ marginRight: "10px" }}
          disabled={action!== DO}
          checked={option.selected}
          onChange={handleChangeSelectedOption}
          value="a"
          name="radio-buttons"
          inputProps={{ "aria-label": "A" }}
        />
        <div>
          <input
            onChange={handleChangeOption}
            type="text"
            className={cx("text-input")}
            placeholder={`option ${indexOption+1}`}
            value={option.title}
          />
        </div>
      </div>
      <IconButton onClick={handleRemoveOption} aria-label="delete">
        <CloseIcon/>
      </IconButton>
    </div>
  );
};

export default Option;
