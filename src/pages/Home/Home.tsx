import { useEffect, useState } from "react";
import CardSection from "../../components/CardSection/CardSection";
import Header from "../../components/Header/Header";
import Template from "../../components/Template/Template";
import { useAuthStore, useSurveyCardStore, useSurveyIndividualStore } from "../../store/store";
import { SurveyInfo } from "../../types/survey";
import SimpleDialog from "../../components/shares/Dialog";
import createAxiosInstance from "../../service/api";

const Home = () => {
  const [open, setOpen] = useState(false)
  const { setSurveyCard } = useSurveyCardStore();
  const { setSurveyIndividual } = useSurveyIndividualStore()
  const {user} = useAuthStore()
  const axiosInstance = createAxiosInstance()

  const fetchAllSurveyData = async () => {
    try {
      const response = await axiosInstance({
        url: "survey",
        method: "GET"
      })
      const { data } = await response.data;
      setSurveyCard(data.filter((item: SurveyInfo) => {
        return item.created_by !== user.id
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchIndividualSurveyData = async () => {
    try {
      
      const response = await axiosInstance({
        url: `survey/${user.id}`,
        method: "GET"
      })
      const { data } = await response.data;      
      setSurveyIndividual(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseDialog = () => {
    setOpen(false)
  }



  useEffect(() => {
    fetchAllSurveyData();
    fetchIndividualSurveyData();
  }, []);
  return (
    <div>
      <Header setOpen={setOpen}/>
      <Template />
      <CardSection />
      <SimpleDialog open={open} onClose={handleCloseDialog}/>
    </div>
  );
};

export default Home;
