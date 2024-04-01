import classNames from "classnames/bind";
import styles from "./CardSection.module.scss";
import Card from "./Card/Card";
import { useActionStore, useSurveyCardStore, useSurveyIndividualStore } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { DO } from "../../constants/constant";

const cx = classNames.bind(styles);

const CardSection = () => {
  const navigate = useNavigate()
  const { surveyInfo } = useSurveyCardStore();
  const { surveyInvidual } = useSurveyIndividualStore()
  const { setAction } = useActionStore()

  const handleDetailSurveyCard = (id: string) => {
    setAction(DO);
    navigate(`/do-form/${id}`)
  }

  return (
    <>
    <div className={cx("container")}>
      <div className={cx("header")}>
        <span>Latest form</span>
      </div>
      <div className={cx("card-list")}>
        {surveyInfo &&
          surveyInfo.map((item, index) => (
            <div key={item.id} onClick={() => handleDetailSurveyCard(item.id)}>
              <Card survey={item} index={index} />
            </div>
          ))}
      </div>
      <hr/>
    </div>
    
    <div className={cx("container")}>
      <div className={cx("header")}>
        <span>Individual</span>
      </div>
      <div className={cx("card-list")}>
        {surveyInvidual &&
          surveyInvidual.map((item, index) => (
            <div key={item.id} onClick={() => handleDetailSurveyCard(item.id)}>
              <Card survey={item} index={index} />
            </div>
          ))}
      </div>
    </div>
    </>
  );
};

export default CardSection;
