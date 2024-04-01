import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { forwardRef } from "react";
import { useAlert } from "../../store/store";
import Slide, { SlideProps } from '@mui/material/Slide';

const Alert = forwardRef<HTMLDivElement, AlertProps>(
  function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  }
);

type TransitionProps = Omit<SlideProps, 'direction'>;

function TransitionDown(props: TransitionProps) {
    return <Slide {...props} direction="down" />;
  }

export default function CustomizedSnackbars() {
    const { alert, message, severity, setAlert } = useAlert()

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert(false, "", 'success')
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar open={alert} autoHideDuration={2500} onClose={handleClose}  TransitionComponent={TransitionDown}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message} 
        </Alert>
      </Snackbar>
    </Stack>
  );
}
