import { useEffect } from "react";
import SurveyForm from "../../components/SurveyForm/SurveyForm";
import { useParams } from "react-router-dom";
import { useActionStore, useDoForm } from "../../store/store";
import { DO, EDIT } from "../../constants/constant";
import createAxiosInstance from "../../service/api";

const Form = () => {
  const { id } = useParams();
  const { setSurvey } = useDoForm();
  const {action} = useActionStore()
  const axiosInstance = createAxiosInstance()
  

  const getSurveyDetail = async (param: string) => {
    try {
      const response = await axiosInstance({
        url: `survey/${param}/${id}`, 
        method: "GET",
      })
      const { data } = await response.data;

      setSurvey(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    switch (action) {
      case DO: {
        getSurveyDetail("do-form");
        break;
      }
      case EDIT: {
        getSurveyDetail("edit");
        break;
      }
      default:
        break;
    }
  }, [action]);
  return (
    <SurveyForm/>
)};

export default Form;
