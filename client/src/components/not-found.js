import React, { Component } from "react";
import { Typography } from "@mui/material";
import { withStyles } from "@mui/styles";
import { Link } from "react-router-dom";

const classes = {
  root: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  links: {
    flexDirection: "row",
    justifyContent: "space-between",
    maxWidth: "50%",
  },
};

class NotFound extends Component {
  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.root}>
        <div className={classes.toolbar} />
        <Typography variant="h6">404 NOT FOUND</Typography>
        <div className={classes.links}>
          <Link to="/"> Home </Link>
          <Link to="#" onClick={() => this.props.history.goBack()}>
            Back
          </Link>
        </div>
      </div>
    );
  }
}

export default withStyles(classes)(NotFound);