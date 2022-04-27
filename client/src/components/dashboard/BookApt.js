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
import Input from "@mui/material/Input";
import Chip from "@mui/material/Chip";
const theme = createTheme();

// const time_=[
//     "09:00:00",
//     "09:30:00",
//     "10:00:00",
//     "10:30:00",
//     "11:00:00",
//     "11:30:00",
//     "15:00:00",
//     "15:30:00",
//     "16:00:00",
//     "16:30:00",
//     "17:00:00",
//     "17:30:00",
//   ]

export default function BookApt() {
  const navigate = useNavigate();
  // const [gender, setGender] = useState("");
  // const [message, setMessage] = useState("");
  const { state, dispatch } = useContext(UserContext);
  const [loading, setLoading] = useState("Loading...");
  //   const [loading1, setLoading1] = useState(true);
  const [departments, setDepartments] = useState([]);
  const [department, setDepartment] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [doctor, setDoctor] = useState(null);
  const [opds, setOpds] = useState([]);
  const [date, setDate] = useState(null);
  // const [opds1, setOpds1] = useState([]);
  const [time, setTime] = useState(null);
  // const [click, setClick] = useState([
  //   true,
  //   true,
  //   true,
  //   true,
  //   true,
  //   true,
  //   true,
  //   true,
  //   true,
  //   true,
  //   true,
  //   true,
  // ]);
  console.log(state.id);
  console.log({ doctors });
  console.log({ doctor });
  console.log({ date });
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      axios
        .get("/api/user/departments", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          setDepartments(res.data.departments);
          setDoctors(res.data.doctors);
          setOpds(res.data.opds);
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
    axios
      .post("/api/user/appointments", {
        doctorId: doctor,
        date_: date,
        time_: opds[time].time_,
        patientId: state.id,
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

  const unique = (value, index, self) => {
    return self.indexOf(value) === index;
  };

  const makeDate = (day) => {
    var d = day.getDate().toString();
    var m = (day.getMonth() + 1).toString();
    var y = day.getFullYear().toString();
    if (d.length === 1) d = "0" + d;
    if (m.length === 1) m = "0" + m;
    return y + "-" + m + "-" + d;
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
                  Book appointment
                </Typography>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ mt: 3, width: "100%" }}
                >
                  <Grid container spacing={2}>
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
                          }}
                        >
                          {departments?.map((el) => {
                            return (
                              <MenuItem value={el?.deptId} key={el?.doctorId}>
                                {el?.deptName}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      {department && (
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            Doctor
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={doctor}
                            label="Doctor"
                            onChange={(event) => {
                              setDoctor(event.target.value);
                            }}
                          >
                            {doctors
                              .filter((el) => {
                                //console.log(el, el.deptId === department);
                                return el.deptId === department;
                              })
                              .map((el) => {
                                return (
                                  <MenuItem
                                    value={el.doctorId}
                                    key={el.doctorId}
                                  >
                                    <Typography>
                                      <Box>{el.dname}</Box>
                                      <Box
                                        style={{
                                          color: "rgb(100,100,100)",
                                          fontSize: "14px",
                                        }}
                                      >
                                        {el.role}
                                      </Box>
                                    </Typography>
                                  </MenuItem>
                                );
                              })}
                          </Select>
                        </FormControl>
                      )}
                    </Grid>
                    {doctor && (
                      <Grid item xs={12}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            Date
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={date}
                            label="Date"
                            onChange={(event) => {
                              setDate(event.target.value);
                            }}
                          >
                            {opds
                              .filter((el) => {
                                return el.doctorId === doctor;
                              })
                              .map((el) => {
                                var day = new Date(el.mdate);
                                // console.log(el, day);
                                return makeDate(day);
                              })
                              .filter(unique)
                              .map((el) => {
                                return (
                                  <MenuItem value={el} key={el}>
                                    {el}
                                  </MenuItem>
                                );
                              })}
                          </Select>
                        </FormControl>
                      </Grid>
                    )}
                    {date && (
                      <Grid item xs={12}>
                        <Box sx={{ padding: "0px 30px" }}>
                          {opds
                            .map((el, idx) => {
                              var day = new Date(el.mdate);
                              // console.log(el, day);
                              // return makeDate(day);
                              return {
                                data: el,
                                idx: idx,
                                date: makeDate(day),
                              };
                            })
                            .filter((el, idx) => {
                              return (
                                el.data.doctorId === doctor && date === el.date
                              );
                            })
                            .map((el) => {
                              return (
                                <Chip
                                  color={
                                    el.data.availability === "Free"
                                      ? "primary"
                                      : el.data.availability === "Allotted"
                                      ? "secondary"
                                      : "default"
                                  }
                                  sx={{ marginLeft: 0.5, marginBottom: 0.5 }}
                                  label={el.data.time_}
                                  key={el.idx}
                                  onClick={(event) => {
                                    console.log(opds);
                                    if (el.data.availability === "Free") {
                                      var a = opds;
                                      if (time != null)
                                        a[time].availability = "Free";
                                      a[el.idx].availability = "Allotted";
                                      setTime(el.idx);
                                      setOpds(opds);
                                    }
                                  }}
                                />
                              );
                            })}
                        </Box>
                      </Grid>
                    )}
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2, mb: 2 }}
                  >
                    Submit
                  </Button>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        )}
      </>
    );

  return <Navigate to="/book-appointment" />;
}
