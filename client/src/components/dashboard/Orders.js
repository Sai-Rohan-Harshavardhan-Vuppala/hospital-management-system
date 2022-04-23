import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../App";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Navigate, useNavigate } from "react-router-dom";

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  const { state, dispatch } = useContext(UserContext);
  const [rows, setRows] = useState(null);
  const [loading, setLoading] = useState("Loading...");
  const [error, setError] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    const user = JSON.parse(localStorage.getItem("user"));
    if(user)
    {
    var url = "/api/user/appointments/" + user.role + "s/" + user.id;
    axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setRows(res.data.data);
        setError("");
        setLoading("");
      })
      .catch((err) => {
        console.log(err);
        setRows(null);
        setLoading("");
        setError(err.message);
      });
    }
  }, []);
  if(state)
  return (
    <Grid container sx={{ width: "100%" }}>
      <Grid item xs={12}>
        {rows && (
          <React.Fragment>
            <Title>My appointments</Title>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Appointment Id</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Doctor Name</TableCell>
                  {/* <TableCell>Ship To</TableCell>
              <TableCell>Payment Method</TableCell> */}
                  <TableCell align="right">Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.aptId}</TableCell>
                    <TableCell>{row.date_}</TableCell>
                    <TableCell>{row.dname}</TableCell>
                    {/* <TableCell>{row.shipTo}</TableCell>
                <TableCell>{row.paymentMethod}</TableCell> */}
                    <TableCell align="right">{`${row.time_}`}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Link
              color="primary"
              href="#"
              onClick={preventDefault}
              sx={{ mt: 3 }}
            >
              See more orders
            </Link>
          </React.Fragment>
        )}
        {loading && <Typography>Loading...</Typography>}
        {error && <Typography>{error}</Typography>}
      </Grid>
    </Grid>
  );
  else{
    return <Navigate to="/login"></Navigate>
  }
}
