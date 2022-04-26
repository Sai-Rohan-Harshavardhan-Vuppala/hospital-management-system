import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useState, useContext } from "react";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

export function MainListItems() {
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["jwt", "test"]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const handleLogout = function () {
    const token = localStorage.getItem("jwt");
    //const user = JSON.parse(localStorage.getItem("user"));
    localStorage.clear();
    setLoading(true);
    var url = "/api/logout";
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        dispatch({ type: "CLEAR" });
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        setLoading(true);
      });
  };
  //setCookie("jwt", "false", { path: "/" });
  //setCookie("test", "false", { path: "/" });

  return (
    <React.Fragment>
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="My appointments" />
      </ListItemButton>
      {user.role === "admin" && (
        <ListItemButton
          onClick={() => {
            navigate("/create-doctor");
          }}
        >
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary="Create a doctor" />
        </ListItemButton>
      )}
      {user.role === "admin" && (
        <ListItemButton
          onClick={() => {
            navigate("/create-opd-schedule");
          }}
        >
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary="Create OPD Schedule" />
        </ListItemButton>
      )}
      {
        <ListItemButton>
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary="Orders" />
        </ListItemButton>
      }
      <ListItemButton>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Customers" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Reports" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Integrations" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        {loading === true ? (
          <ListItemText primary="Loading..." />
        ) : (
          <ListItemText
            primary="Logout"
            onClick={() => {
              handleLogout();
            }}
          />
        )}
      </ListItemButton>
    </React.Fragment>
  );
}

export const SecondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </React.Fragment>
);
