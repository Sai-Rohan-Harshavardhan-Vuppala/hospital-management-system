import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Dashboard from "./dashboard/Dashboard";
import { useTranslation } from "react-i18next";

function Templates() {
  const { t } = useTranslation();

  return (
    <Grid container spacing={2}>
      <Dashboard />
    </Grid>
  );
}

export default Templates;
