import classNames from "classnames/bind";
import styles from "./SurveyForm.module.scss";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { Question, SurveyProp } from "../../types/survey";
import { useActionStore, useAlert, useAuthStore, useDoForm } from "../../store/store";
import QuestionItem from "./QuestionItem/QuestionItem";
import { AddCircleOutline } from "@mui/icons-material";
import {
  checkIfAllValidated,
  checkIfEmptyAnswer,
  filterDataToCreateSurvey,
  filterDataToUpdateSurvey,
  filterGetSelectedId,
} from "../../utils/helpers";
import { useNavigate } from "react-router-dom";
import { CREATE, DO, EDIT } from "../../constants/constant";
import createAxiosInstance from "../../service/api";

const cx = classNames.bind(styles);

const SurveyForm = () => {
  const { survey } = useDoForm();
  const { action } = useActionStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const { setAlert } = useAlert()
  const axiosInstance = createAxiosInstance()

  const [surveyValidationErrors, setSurveyValidationErrors] = useState<
    Record<string, string>
  >({});
  const [surveyInfo, setSurveyInfo] = useState<SurveyProp>({
    id: "",
    title: "",
    description: "",
  });

  const [questions, setQuestion] = useState<Question[]>([
    {
      title: "",
      options: [{ title: "", selected: false }],
      required: true,
      open: true,
    },
  ]);

  const handleSurveyInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSurveyInfo({
      ...surveyInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddMoreQuestion = () => {
    const optionLength = questions[questions.length - 1].options.length;
    const isEmptyTitle =
      questions[questions.length - 1].options[optionLength - 1].title;

    if (optionLength >= 2 && isEmptyTitle) {
      expandCloseAll();
      const newQuestion: Question = {
        title: "",
        options: [{ title: "", selected: false }],
        open: true,
        required: false,
      };
      setQuestion([...questions, newQuestion]);
    } else {
      setAlert(true, "You must be have more than 1 option and not empty title", 'warning')
    }
  };

  const expandCloseAll = () => {
    let closedQuestion = [...questions];
    for (let i = 0; i < closedQuestion.length; i++) {
      closedQuestion[i].open = false;
    }
    setQuestion(closedQuestion);
  };

  const setStateReveiveFromServer = () => {
    setSurveyInfo({
      id: survey.id,
      title: survey.title,
      description: survey.description,
    });
    if (survey && survey.questions) {
      const updatedQuestions = survey.questions.map((question) => ({
        ...question,
        open: false,
        required: true,
        options: question.options.map((option) => ({
          ...option,
          selected: false,
        })),
      }));
      setQuestion(updatedQuestions);
    }
  };

  const handleSubmitAnswer = async (): Promise<void> => {
    const filledAllOption = checkIfEmptyAnswer(questions)
    if(!filledAllOption){
      setAlert(true, "Please fill in all options fields.", 'error');
      return
    }
    
    const updatedRecord = {
      survey_id: survey.id,
      ids: filterGetSelectedId(questions),
    };
    
    try {
      const response = await axiosInstance({
        url: "survey/do-form",
        method: "POST",
        data: JSON.stringify(updatedRecord)
      })
      if (response.data.status === 200) {
        setAlert(true, response.data.message, 'success')
        setTimeout(() => {
          navigate("/");
        }, 1000)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitCreateSurvey = async (): Promise<void> => {
    const validated = checkIfAllValidated({surveyInfo, questions, setSurveyValidationErrors});
    if(!validated) return;
    if(questions.length < 2){
      setAlert(true, "Survey must contain more than 1 question!", "warning")
      return
    }
    const data = filterDataToCreateSurvey(surveyInfo, questions, user);

    try {
      const response = await axiosInstance({
        url: "survey/create",
        method: "POST",
        data: JSON.stringify(data)
      })
      if (response.data.status === 200) {
        setAlert(true, response.data.message, 'success')
        setTimeout(() => {
          navigate("/");
        }, 1000)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitUpdateSurvey = async (): Promise<void> => {
    const validated = checkIfAllValidated({surveyInfo, questions, setSurveyValidationErrors});
    if(!validated) return;
    if(questions.length < 2){
      setAlert(true, "Survey must contain more than 1 question!", "error")
      return
    }
    const data = filterDataToUpdateSurvey(surveyInfo, questions);

    try {
      const response = await axiosInstance({
        url: "survey/edit",
        method: "PUT",
        data: JSON.stringify(data)
      })
      if (response.data.status === 200) {
        
        setAlert(true, response.data.message, 'success')
        setTimeout(() => {
          navigate("/");
        }, 1000)
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (action === DO || action === EDIT) {
      setStateReveiveFromServer();
    }
  }, [action, survey]);

  useEffect(() => {
    if(Object.values(surveyValidationErrors)[0]){
      setAlert(true, Object.values(surveyValidationErrors)[0], 'error')
    }
  }, [surveyValidationErrors])

  const questionUI = () => {
    return questions.map((question, index) => (
      <QuestionItem
        question={question}
        questions={questions}
        setQuestion={setQuestion}
        indexQuestion={index}
      />
    ));
  };


  return (
    <div>
      <div className={cx("survey-form")}>
        <br />
        <div key={`${survey.id}_survey_form`} className={cx("section")}>
          <div className={cx("survey-title-section")}>
            <div className={cx("survey-form-top")}>
              <input
                className={cx("survey-form-title")}
                placeholder="Untitled document"
                name="title"
                disabled={action === DO}
                value={surveyInfo.title}
                onChange={(e) => handleSurveyInfo(e)}
                type="text"
              />

              <input
                className={cx("survey-form-desc")}
                placeholder="Form description"
                disabled={action === DO}
                name="description"
                value={surveyInfo.description}
                onChange={(e) => handleSurveyInfo(e)}
                type="text"
              />
            </div>
          </div>
          {questionUI()}

          {action === CREATE && (
            <div className={cx("btn-bottom")}>
              {" "}
              <Button
                onClick={handleAddMoreQuestion}
                variant="contained"
                endIcon={<AddCircleOutline />}
                sx={{ marginTop: "10px" }}
              >
                Add Question
              </Button>
              <Button
                variant="contained"
                endIcon={<SendIcon />}
                onClick={handleSubmitCreateSurvey}
                sx={{ marginTop: "10px" }}
              >
                Submit
              </Button>
            </div>
          )}
          {action === DO && (
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              onClick={handleSubmitAnswer}
              sx={{ marginTop: "10px" }}
            >
              Submit
            </Button>
          )}
          {action === EDIT && (
            <div className={cx("btn-bottom")}>
              <Button
                onClick={handleAddMoreQuestion}
                variant="contained"
                endIcon={<AddCircleOutline />}
                sx={{ marginTop: "10px" }}
              >
                Add Question
              </Button>
              <Button
                variant="contained"
                endIcon={<SendIcon />}
                onClick={handleSubmitUpdateSurvey}
                sx={{ marginTop: "10px" }}
              >
                Submit
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SurveyForm;
