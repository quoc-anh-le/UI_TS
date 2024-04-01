import classNames from "classnames/bind";
import styles from "./Card.module.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import StorageIcon from "@mui/icons-material/Storage";
import { Divider, IconButton } from "@mui/material";
import { SurveyInfo } from "../../../types/survey";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Popover from "@mui/material/Popover";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { MouseEvent, useState } from "react";
import { useActionStore, useAlert, useAuthStore, useSurveyIndividualStore } from "../../../store/store";
import { EDIT } from "../../../constants/constant";
import { useNavigate } from "react-router-dom";
import BarChartIcon from '@mui/icons-material/BarChart';
import createAxiosInstance from "../../../service/api";

const cx = classNames.bind(styles);

type Props = {
  survey: SurveyInfo;
  index: number;
};

const Card = ({ survey, index }: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const { setAction } = useActionStore();
  const { user } = useAuthStore()
  const { setAlert } = useAlert()
  const { surveyInvidual, setSurveyIndividual } = useSurveyIndividualStore()
  const navigate = useNavigate();
  const axiosInstance = createAxiosInstance();

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const handleOpenEditPage = (event: MouseEvent) => {
    event.stopPropagation();
    setAction(EDIT);
    navigate(`form/edit/${survey.id}`);
  };

  const handleOpenStatisticPage = (event: MouseEvent) => {
    event.stopPropagation();
    navigate(`form/statistic/${survey.id}`)
  }

  const handleDeleteSurvey = async (event: MouseEvent) => {
    event.stopPropagation();
    try {
      const response = await axiosInstance({
        url: `survey/${survey.id}`,
        method: "DELETE"
      })
      if (response.data.status === 200) {
        setAlert(true, response.data.message, 'success')

        setSurveyIndividual(
          surveyInvidual.filter((item) => {
            return item.id !== survey.id;
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div key={index} className={cx("container")}>
      <img src="https://lh3.googleusercontent.com/fife/AK0iWDxt6lbtvaMuIbHFvm_SwwPd9ySkypr8ZhbHtMn3GrbMjNWX3NrCl0KCfrG5C5cg6ziZi7twZ7zNn7aFGyqxx5aV7dIoITCYmlZwDuQD9DrUm7FL2XKY5sCwtFddZ62FDfNveEZERmMUijUkAVGNmzN6KqvLV-CqMC9r5rYNC9MiT32G82RMqD6uKTn5ruzt6LLMpREYa5atyIPSbmf9vMrHkwJQz9UAgUD5SjYUg5bcX0yIN9qnfNISpcqEebnRAELBUtXxlOu0DGbXV3V-G5sJT_HKhvmcQQSxl9SLpnrUImHSQuDIilgrEZywpFJ2g4DjrdsYLdeR8O2IXRDGkKEMxKbZWleHwKwAnPiueKFvmjHFy4-DshPAQv-o-8YEdkYrfAP6_xF64V9lsbFEKORJ9Bz_jQtmi5F5NJa0GPCWCJ_i1ykYgLIV8RDsLmYFCLkd3VV-8Jzc2XdqtGzbrpfMHk-Wg0Lxg3RLtQ68xAhrLF2GOLuT3KIQLBKeKmqlWf3ZMkEyGfgIPYz0A5opxoD2UT8QYNCbqG1v-5POrouGj9HPQ6khHkQLppPVhOEDtV3x5a-DCZUoHEKAlxUjcPrD4dNJHiFDfOhIxiFIp0XOjlLkhOJi-FbdPp7LOp3xzYCHjEOJW8JPZkOgXa7tQZGArU67EI_arPER27YdR4Z8rpbg2PV48brqRRk526Kl2myKrpIKIbCumyWbXatZO5ipQiJia-ndWhCa-mU_XFWW9OugNX_3JZk4Vh8B8e4TBD6Vd5d6b58S9LcKTZwKknPSqgu_o1WO6mxB6u4d302LX4RApkwekss6URaKJEPe59vWkh2CNl2nnpT_zcccsDW6rGbjEYlfgYO1GIQtUtg9T0OYL-v5CkuFR9M8uFt6R-KIASt8PwmwBu7woBG1WH5FmCO9Ku5CdFbXiAxT5_m8KIn9qZawigR8t0os8AbqZ_ZfA-n-QsGPeKq6d0fWUzIj85V0BA61nI0fNUlsM5WKc5VnN4TATafBeJbsBBOyeYgInAP8HDCA9JRLyAvm4ZaQ3Nf-R4ipEV1K8uwUGC5Lb0ytaadqeCLQq6NqOxyf7VxnRQKT3mO7BJtQP84ajFBDEi8BHqnop3gPgA72klwougkOAtTCLuRCApCA-nBNbHD9aQz2qk8G_yB41_X0cXVCeQULk0mhHu26E5jMXiA_NxE-BhErWveTBE3KcksL_BBKg0m02z-cQSj9hKNO7nThRNM80Ky_Va6rpgeqqnmn_XKk3gtCLeD4Q5Pxua31KIfu214ysFx-zL0dq_F2vo_IZZr3g8YRTwxHMjYYKcefkeKZB_s39O6_JQzoY1h0k-cwuCfMJkPMGtldSygaT2xKg9M2xeMGFcjfUCBETntVGNcWwSAI7eaZiBQe_1CpQx3qn0sNgCQ0-Q-z3EOFctIhWtC_xW-45KaqKPGozc60P_DbMuNeY0kLfgAshX8Q069lXcWu6q0o5apHq48KlURjl72s_VCabYYKl8MgangUEq8bRV29fKMn7npd1IvyBz5j69-mPeMjNi6juHEYvQ=w208-h156-p" className={cx("image")} />
      <div className={cx("content")}>
        <h4>{survey.title}</h4>
        <div className={cx("more-info")}>
          <div className={cx("content-left")}>
            <StorageIcon />
            <p className={cx("description")}>{survey.description}</p>
          </div>
          {survey.created_by === user.id && <IconButton onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>}
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Box
              sx={{
                width: "200px",
                maxWidth: 360,
                bgcolor: "background.paper",
              }}
            >
              <nav>
                <List>
                  <ListItem disablePadding>
                    <ListItemButton onClick={handleOpenEditPage}>
                      <ListItemIcon>
                        <EditIcon />
                      </ListItemIcon>
                      <ListItemText primary="Edit" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton onClick={handleOpenStatisticPage}>
                      <ListItemIcon>
                        <BarChartIcon />
                      </ListItemIcon>
                      <ListItemText primary="Statistic" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={handleDeleteSurvey}
                      sx={{
                        "&:hover": {
                          backgroundColor: "#c22424",
                          color: "black",
                        },
                      }}
                    >
                      <ListItemIcon>
                        <DeleteIcon />
                      </ListItemIcon>
                      <ListItemText primary="Delete" />
                    </ListItemButton>
                  </ListItem>
                </List>
              </nav>
              <Divider/>
            </Box>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default Card;
