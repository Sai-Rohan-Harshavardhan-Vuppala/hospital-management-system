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
const theme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  // const [gender, setGender] = useState("");
  // const [message, setMessage] = useState("");
  const { state, dispatch } = useContext(UserContext);
  const [loading, setLoading] = useState("Loading...");
  //   const [loading1, setLoading1] = useState(true);
  const [doctors, setDoctors] = useState([]);
  const [doctor, setDoctor] = useState(null);
  const [opds, setOpds] = useState([]);
  const [opd, setOpd] = useState(null);
  const [opds1, setOpds1] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [room, setRoom] = useState(null);
  const [avail, setAvail] = useState([
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
  ]);
  const [time, setTime] = useState([
    "09:00:00",
    "09:30:00",
    "10:00:00",
    "10:30:00",
    "11:00:00",
    "11:30:00",
    "15:00:00",
    "15:30:00",
    "16:00:00",
    "16:30:00",
    "17:00:00",
    "17:30:00",
  ]);

  console.log({ doctors });
  console.log({ doctor });
  console.log({ opds });
  console.log({ opds1 });

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      var url = "/api/admin/doctors";
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          setDoctors(res.data.doctors);
          setOpds1(res.data.opds);
          setRooms(res.data.rooms);
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
      .post("/api/admin/opd_schedule", {
        doctorId: doctor,
        date_: opd,
        room_no: room,
        availability: avail,
      })
      .then((res) => {
        if (res.data.status === "Opd-schedule and Opd-tokens are created") {
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
  const makeDate = (day) => {
    var d = day.getDate().toString();
    var m = (day.getMonth() + 1).toString();
    var y = day.getFullYear().toString();
    if (d.length === 1) d = "0" + d;
    if (m.length === 1) m = "0" + m;
    return y + "-" + m + "-" + d;
  };

  const nextSevenDates = (k) => {
    console.log(k);
    var p = new Date(),
      day,
      arr = [],
      f,
      j;
    for (let i = 0; i < 7; i++) {
      p = new Date();
      day = new Date(p);
      day.setDate(p.getDate() + i);
      f = makeDate(day);
      for (j = 0; j < k.length; j++) {
        console.log("--", k[j]);
        if (f === k[j]) break;
      }
      if (j === k.length) {
        arr.push(f);
        console.log(f);
      }
    }
    return arr;
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
                  Create OPD Schedule
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
                          Doctor
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={doctor}
                          label="Doctor"
                          onChange={(event) => {
                            setDoctor(event.target.value);
                            console.log(event.target.value);
                            var i,
                              arr = [];
                            console.log(opds1);
                            for (i = 0; i < opds1.length; i++) {
                              console.log(opds1[i]);
                              if (opds1[i].doctorId === event.target.value) {
                                let date = new Date(opds1[i].mdate);

                                arr.push(makeDate(date));
                              }
                            }
                            console.log(arr);
                            // if (i === opds1.length) {
                            //   var date = new Date();
                            //   setOpds(nextSevenDates(date));
                            // }
                            setOpds(nextSevenDates(arr));
                          }}
                        >
                          {doctors?.map((el) => {
                            return (
                              <MenuItem value={el?.doctorId} key={el?.doctorId}>
                                {el?.dname}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Date
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={opd}
                          label="Date"
                          onChange={(event) => {
                            setOpd(event.target.value);
                          }}
                        >
                          {opds?.map((el) => {
                            return (
                              <MenuItem value={el} key={el}>
                                {el}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    </Grid>
                    {opd && (
                      <Grid item xs={12}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            Room No
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={room}
                            label="Room No"
                            onChange={(event) => {
                              setRoom(event.target.value);
                            }}
                          >
                            {rooms?.map((el) => {
                              return (
                                <MenuItem value={el?.room_no} key={el?.room_no}>
                                  {el?.room_no}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      </Grid>
                    )}
                    <Grid item xs={12}>
                      {opd && (
                        <Box sx={{ padding: "0px 30px" }}>
                          {time.map((el, idx) => {
                            return (
                              <FormControlLabel
                                key={idx}
                                control={
                                  <Checkbox
                                    label={el}
                                    checked={avail[idx]}
                                    inputProps={{ "aria-label": "controlled" }}
                                    id={idx}
                                    onChange={(event) => {
                                      let av = [...avail];
                                      av[idx] = event.target.checked;
                                      setAvail(av);
                                      console.log(idx, event.target.checked);
                                    }}
                                  />
                                }
                                label={el}
                              />
                            );
                          })}
                        </Box>
                      )}
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

  return <Navigate to="/create-opd-schedule" />;
}
