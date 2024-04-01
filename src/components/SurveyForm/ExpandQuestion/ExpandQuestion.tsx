import classNames from "classnames/bind";
import styles from "./ExpandQuestion.module.scss";

import { AccordionDetails, Box, Button, IconButton } from "@mui/material";
import { Question } from "../../../types/survey";
import Option from "../Option/Option";
import ToolBar from "../ToolBar/ToolBar";
import CropOriginalIcon from "@mui/icons-material/CropOriginal";
import { useState } from "react";
import { useAlert } from "../../../store/store";

const cx = classNames.bind(styles);

type Props = {
  indexQuestion: number;
  question: Question;
  questions: Question[];
  setQuestion: React.Dispatch<React.SetStateAction<Question[]>>;
};

const ExpandQuestion = ({
  indexQuestion,
  question,
  questions,
  setQuestion,
}: Props) => {

  const { setAlert } = useAlert()

  const handleChangeQuestion = (title: string) => {
    const newQuestion = [...questions];
    newQuestion[indexQuestion].title = title;
    setQuestion(newQuestion);
  };

  const handleAddOption = () => {
    const newOptionOfQuestion = [...questions];
    if (newOptionOfQuestion[indexQuestion].options.length < 5) {
      newOptionOfQuestion[indexQuestion].options.push({
        title: "",
        selected: false,
      });
      setQuestion(newOptionOfQuestion);
    } 
  };

  // const [fileInputState, setFileInputState] = useState('');
  // const [selectedFile, setSelectedFile] = useState('');
  // const [previewSource, setPreviewSource] = useState();

  // const handleFileInputChange = (e) => {
  //     const file = e.target.files[0]
  //     if(file && file.size > 200 * 1024){
  //       setAlert(true, "Image with maximum size of 1MB is allowed", "warning")
  //       return
  //     }
  //     previewFile(file)
      
  // }

  //  const previewFile = (file) => {
    
  //   const reader = new FileReader()
  //   reader.readAsDataURL(file);
  //   reader.onloadend = () => {
  //     setPreviewSource(reader.result);

  //   }
  //  }

   

  return (
    <AccordionDetails key={`${indexQuestion}accordionIndex`} className={cx("add-question")}>
      <div key={`${indexQuestion}questionIndex`} className={cx("add-question-top")}>
        <input
          onChange={(e) => handleChangeQuestion(e.target.value)}
          type="text"
          className={cx("question")}
          placeholder="Question has no title"
          value={question.title}
        />
        {/* <input accept="image/*" onChange={handleFileInputChange} hidden value={fileInputState} id="icon-button-file" type="file" />
          <label htmlFor="icon-button-file">
            <IconButton component="span" >
              <CropOriginalIcon /> 
            </IconButton>
          </label> */}
      </div>
      {/* {
        previewSource && (
      <Box>
        <img style={{width: "100%", height: "300px", margin: "10px 0", backgroundSize: "cover"}} alt="image" src={previewSource}/>
      </Box>)
      } */}

      {question.options.map((option, j) => (
        <Option
          option={option}
          indexOption={j}
          indexQuestion={indexQuestion}
          setQuestion={setQuestion}
        />
      ))}

      {question.options.length < 5 && (
        <div className="add-question-body">
          <Button
            onClick={handleAddOption}
            size="small"
            style={{
              textTransform: "none",
              color: "#4285f4",
              fontSize: "13px",
              fontWeight: "600",
            }}
          >
            Add Option
          </Button>
        </div>
      )}

      <div className={cx("add-footer")}>
        <div className={cx("add-question-bottom-left")}>
          <Button
            size="small"
            sx={{
              textTransform: "none",
              color: "#4285f4",
              fontSize: "13px",
              fontWeight: "600",
            }}
          ></Button>
        </div>

        <div className={cx("add-question-bottom")}>
          <ToolBar
            question={question}
            questions={questions}
            setQuestion={setQuestion}
            indexQuestion={indexQuestion}
          />
        </div>
      </div>
    </AccordionDetails>
  );
};

export default ExpandQuestion;
