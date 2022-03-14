import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import React from "react";
import { withStyles } from "@mui/styles";
import { navBar } from "../css/main";

function Header(props) {
  const { classes } = props;
  return (
    <header>
      <AppBar position="relative" className={classes.center}>
        <Toolbar> Todo test made with <span role="img" aria-label="heart-emoji">❤️</span></Toolbar>
      </AppBar>
    </header>
  );
}

export default withStyles(navBar)(Header);