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
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import IconButton from "@mui/material/IconButton";

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  const { state, dispatch } = useContext(UserContext);
  const [rows, setRows] = useState(null);
  const [loading, setLoading] = useState("Loading...");
  const [error, setError] = useState("");
  const [user, setuser] = useState(JSON.parse(localStorage.getItem("user")));
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (user) {
      if (user.role !== "admin")
        var url = "/api/user/appointments/" + user.role + "s/" + user.id;
      else var url = "api/admin/appointments";
      axios
        .get(url, {
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
  if (state)
    return (
      <Grid container sx={{ width: "100%" }}>
        <Grid item xs={12}>
          {!loading && rows && (
            <React.Fragment>
              <Title>
                {user.role === "admin" ? "Appointments" : "My appointments"}
              </Title>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Appointment Id
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
                    <>
                      {user.role !== "patient" && (
                        <TableCell sx={{ fontWeight: "bold" }}>
                          Patient Name
                        </TableCell>
                      )}
                    </>
                    <>
                      {user.role !== "doctor" && (
                        <TableCell sx={{ fontWeight: "bold" }}>
                          Doctor Name
                        </TableCell>
                      )}
                    </>
                    {/* <TableCell>Ship To</TableCell>
              <TableCell>Payment Method</TableCell> */}
                    <TableCell sx={{ fontWeight: "bold" }} align="right">
                      Time
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="right">
                      Room No.
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.aptId}</TableCell>
                      <TableCell>{row.date_}</TableCell>
                      <>
                        {user.role !== "patient" && (
                          <TableCell>{row.pname}</TableCell>
                        )}
                      </>
                      <>
                        {user.role !== "doctor" && (
                          <TableCell>{row.dname}</TableCell>
                        )}
                      </>

                      {/* <TableCell>{row.shipTo}</TableCell>
                <TableCell>{row.paymentMethod}</TableCell> */}
                      <TableCell align="right">{`${row.time_}`}</TableCell>
                      <TableCell align="right">{`${row.room_no}`}</TableCell>
                      {user.role === "patient" && (
                        <IconButton
                          onClick={() => {
                            setLoading("Loading...");
                            var a = rows.filter((el) => {
                              return el.aptId !== row.aptId;
                            });
                            setRows(a);
                            axios
                              .delete(`/api/user/appointments/${row.aptId}`)
                              .then((res) => {
                                console.log(res);
                                if (res.data.status === "success")
                                  console.log("success");
                                else console.log("failure");
                              })
                              .catch((err) => {
                                setError(err.message);
                              });
                            setLoading("");
                          }}
                        >
                          <DeleteOutlinedIcon
                            sx={{
                              display: "inline",
                              zIndex: "tooltip",
                              mt: 0,
                            }}
                          />
                        </IconButton>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {/* <Link
                color="primary"
                href="#"
                onClick={preventDefault}
                sx={{ mt: 3 }}
              >
                See more orders
              </Link> */}
            </React.Fragment>
          )}
          {loading && <Typography>Loading...</Typography>}
          {error && <Typography>{error}</Typography>}
        </Grid>
      </Grid>
    );
  else {
    return <Navigate to="/login"></Navigate>;
  }
}
