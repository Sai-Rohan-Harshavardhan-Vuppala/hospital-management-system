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
    //   import * as React from 'react';
    // import { DataGrid } from '@mui/x-data-grid';

    // const columns = [
    //   { field: 'id', headerName: 'ID', width: 70 },
    //   { field: 'firstName', headerName: 'First name', width: 130 },
    //   { field: 'lastName', headerName: 'Last name', width: 130 },
    //   {
    //     field: 'age',
    //     headerName: 'Age',
    //     type: 'number',
    //     width: 90,
    //   },
    //   {
    //     field: 'fullName',
    //     headerName: 'Full name',
    //     description: 'This column has a value getter and is not sortable.',
    //     sortable: false,
    //     width: 160,
    //     valueGetter: (params) =>
    //       `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    //   },
    // ];

    // const rows = [
    //   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    //   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    //   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    //   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    //   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    //   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    //   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    //   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    //   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    // ];

    // export default function DataTable() {
    //   return (
    //     <div style={{ height: 400, width: '100%' }}>
    //       <DataGrid
    //         rows={rows}
    //         columns={columns}
    //         pageSize={5}
    //         rowsPerPageOptions={[5]}
    //         checkboxSelection
    //       />
    //     </div>
    //   );
    // }
    return (
      <Grid container sx={{ width: "100%" }}>
        <Grid item xs={12}>
          {rows && (
            <React.Fragment>
              <Title>
                {user.role === "admin" ? "Appointments" : "My appointments"}
              </Title>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Appointment Id</TableCell>
                    <TableCell>Date</TableCell>
                    <>
                      {user.role !== "patient" && (
                        <TableCell>Patient Name</TableCell>
                      )}
                    </>
                    <>
                      {user.role !== "doctor" && (
                        <TableCell>Doctor Name</TableCell>
                      )}
                    </>
                    {/* <TableCell>Ship To</TableCell>
              <TableCell>Payment Method</TableCell> */}
                    <TableCell align="right">Time</TableCell>
                    <TableCell align="right">Room No.</TableCell>
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
  else {
    return <Navigate to="/login"></Navigate>;
  }
}
