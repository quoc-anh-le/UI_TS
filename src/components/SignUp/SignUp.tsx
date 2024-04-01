import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAlert, useAuthStore } from "../../store/store";
import { z } from "zod";
import axios from "axios";

const defaultTheme = createTheme();

const SignUp = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const { setAlert } = useAlert()

  const formSchema = z
    .object({
      firstname: z.string().min(2, "min length must be 2").max(10),
      lastname: z.string().min(2, "min length must be 2").max(10),
      email: z.string().email("Wrong email pattern"),
      password: z.string().min(8).max(20),
      passwordConfirm: z.string().min(8).max(20),
      is_admin: z.boolean().default(false),
    })
    .refine((data) => data.password === data.passwordConfirm, {
      message: "Passwords do not match",
      path: ["passwordConfirm"],
    });

  type SignUpForm = z.infer<typeof formSchema>;
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [formValue, setFormValue] = useState<SignUpForm>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    passwordConfirm: "",
    is_admin: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validateForm = formSchema.safeParse(formValue);
    if (!validateForm.success) {
      const errors: Record<string, string> = {};
      validateForm.error.errors.forEach((error) => {
        if (error.path) {
          errors[error.path[0]] = error.message;
        }
      });
      setValidationErrors(errors);
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/register",
        JSON.stringify(formValue)
      );
      const { data } = await response;
      if (data.status === 200) {
        setAlert(true, data.message, 'success')
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/login");
    }
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstname"
                  value={formValue.firstname}
                  onChange={handleChange}
                  required
                  fullWidth
                  id="firstname"
                  label="First Name"
                  autoFocus
                  error={!!validationErrors.firstname}
                  helperText={validationErrors.firstname}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  value={formValue.lastname}
                  onChange={handleChange}
                  id="lastname"
                  label="Last Name"
                  name="lastname"
                  autoComplete="family-name"
                  error={!!validationErrors.lastname}
                  helperText={validationErrors.lastname}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  value={formValue.email}
                  onChange={handleChange}
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error={!!validationErrors.email}
                  helperText={validationErrors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  value={formValue.password}
                  onChange={handleChange}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={!!validationErrors.password}
                  helperText={validationErrors.password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  value={formValue.passwordConfirm}
                  onChange={handleChange}
                  name="passwordConfirm"
                  label="Password confirm"
                  type="password"
                  id="password-confirm"
                  autoComplete="password-confirm"
                  error={!!validationErrors.passwordConfirm}
                  helperText={validationErrors.passwordConfirm}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login">Already have an account? Sign in</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;
