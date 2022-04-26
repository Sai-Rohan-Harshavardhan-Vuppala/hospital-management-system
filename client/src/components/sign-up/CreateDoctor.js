import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Navigate, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../../App";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const theme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  // const [gender, setGender] = useState("");
  // const [message, setMessage] = useState("");
  const { state, dispatch } = useContext(UserContext);
  const [loading, setLoading] = useState("Loading...");
  const [loading1, setLoading1] = useState(true);
  const [departments, setDepartments] = useState([]);
  const [department, setDepartment] = useState(null);
  const [roles, setRoles] = useState([]);
  const [role, setRole] = useState(null);
  const [roles1, setRoles1] = useState([]);

  console.log({ departments });
  console.log({ department });
  console.log({ roles });
  console.log({ roles1 });

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      var url = "/api/admin/departments";
      // axios
      //   .get(url, {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   })
      //   .then((res) => {
      //     console.log(res.data.data.result);
      //     setDepartments(res.data.data.result);
      //     //setError("");
      //     setLoading("");
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //     setDepartments(null);
      //     //setError(err.message);
      //   });
      axios
        .get("/api/admin/roles", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          setDepartments(res.data.departments);
          setRoles1(res.data.roles);
          setLoading("");
        })
        .catch((err) => {
          console.error(err);
          setLoading("");
        });
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event);
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
    axios
      .post("/api/admin/doctors", {
        dname: data.get("name"),
        experience: data.get("experience") * 1,
        email: data.get("email"),
        role: role,
        phno: data.get("phno"),
        deptId: department,
        description: data.get("description"),
      })
      .then((res) => {
        if (res.data.status === "success") {
          //setMessage("");
          navigate("/");
          console.log("Hi");
        }
      })
      .catch((err) => {
        //setMessage("Signup failed. Please try again");
        console.log(err);
      });

    // else {
    //   console.log(res.message);
    //   setMessage(res.message);
    //   console.log(message);
    // }
  };
  if (state)
    return (
      <>
        {loading === "Loading..." ? (
          <Typography>loading</Typography>
        ) : (
          <ThemeProvider theme={theme}>
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
                  Create doctor
                </Typography>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ mt: 3 }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="firstName"
                        label="Name"
                        name="name"
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Department
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={department}
                          label="Department"
                          onChange={(event) => {
                            setDepartment(event.target.value);
                            setRoles(
                              roles1.filter((el) => {
                                return el.deptId === event.target.value;
                              })
                            );
                          }}
                        >
                          {departments?.map((el) => {
                            return (
                              <MenuItem value={el?.deptId} key={el?.deptId}>
                                {el?.deptName}
                              </MenuItem>
                            );
                          })}
                          {/* <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem> */}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Role
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={role}
                          label="Role"
                          onChange={(event) => {
                            setRole(event.target.value);
                          }}
                        >
                          {roles?.map((el) => {
                            return (
                              <MenuItem value={el?.roleId} key={el?.roleId}>
                                {el?.role}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="name"
                        label="Qualifications"
                        name="desciption"
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="experience"
                        label="Experience"
                        type="number"
                        id="name"
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="phno"
                        label="Phone No"
                        // id="name"
                      />
                    </Grid>
                    {/* <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="firstName"
                    label="YYYY-MM-DD"
                    name="dob"
                    autoFocus
                  />
                </Grid> */}
                    {/* <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="confirm-password"
                    label="Confirm Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid> */}
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Submit
                  </Button>
                  <Grid container justifyContent="flex-end">
                    <Grid item>
                      <Link href="/login" variant="body2">
                        Already have an account? Sign in
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        )}
      </>
    );

  return <Navigate to="/create-doctor" />;
}
