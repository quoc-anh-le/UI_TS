import { useEffect, useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { PieChart, Pie, Tooltip, Legend, Cell } from "recharts";
import { useParams } from "react-router-dom";
import createAxiosInstance from "../../service/api";

export type Option = {
  title: string;
  selected: boolean;
  id: string;
  chooser: number;
  question_id: string;
};

export type Question = {
  title: string;
  options: Option[];
  required?: boolean;
  open?: boolean;
};

type SurveyStatistic = {
  id: string;
  title: string;
  description: string;
  participant: string;
  created_by: string;
  created_at: string;
  questions: Question[];
};

type PieOption = {
  name: string;
  value: number;
};

type PieQuestion = {
  question: string;
  options: PieOption[];
};

const Statistic = () => {
  const { id } = useParams();
  const [survey, setSurvey] = useState<SurveyStatistic>({} as SurveyStatistic);
  const [data, setData] = useState<PieQuestion[]>([]);
  const axiosInstance = createAxiosInstance()

  const getStatisticSurveyDetail = async () => {
    try {
      const response = await axiosInstance({
        url: `form/statistic/${id}`,
        method: "GET",
      });
      const { data, status } = await response.data;

      if (status === 200) {
        setSurvey(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStatisticSurveyDetail();
  }, []);

  useEffect(() => {
    const data =
      survey.questions &&
      survey.questions.map((question) => ({
        question: question.title,
        options: question.options.map((option) => ({
          name: option.title,
          value: (option.chooser / parseInt(survey.participant)) * 100 ?? 0,
        })),
      }));
    setData(data);
  }, [survey]);

  return (
    <div style={{ padding: "4%" }}>
      <Typography variant="h4" color="primary" gutterBottom>
        Survey result
      </Typography>
      <Typography paragraph color="green">
        {`The total number of survey participants: ${survey.participant}`}
      </Typography>
      <Card
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" sx={{ textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden", display:"block" }}>{survey.title}</Typography>
        <Typography paragraph>{survey.description}</Typography>
      </Card>

      {Array.isArray(data) &&
        data.map((question: PieQuestion) => (
          <Card
            key={question.question}
            sx={{
              marginBottom: "16px",
              borderRadius: "8px",
              transition: "box-shadow 0.3s ease-in-out",
              ":hover": {
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
              },
            }}
            variant="outlined"
          >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" sx={{ margin: "20px 0" }}>
                {question.question}
              </Typography>

              <PieChart width={600} height={280}>
                <Pie
                  dataKey={"value"}
                  data={question.options}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  {question.options.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={`hsl(${Math.random() * 360}, 50%, 50%, 0.9)`}
                    />
                  ))}
                </Pie>
                <Tooltip />

                <Legend style={{ display: "flex", flexDirection: "column" }} />
              </PieChart>
            </CardContent>
          </Card>
        ))}
    </div>
  );
};

export default Statistic;
