import { makeStyles, Typography } from "@material-ui/core";
import moment from "moment";
import React from "react";

const useStyles = makeStyles((theme) => ({
  message: {
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing(1),
  },
  messageTop: {
    display: "flex",
  },
  messageText: {
    padding: theme.spacing(0.5),
    borderRadius: "20px",
    background: theme.palette.primary.light,
    color: "white",
    maxWidth: theme.spacing(60),
  },
  messageBottom: {
    fontSize: "0.8rem",
  },
  messageOwn: {
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing(1),
    alignItems: "flex-end",
  },
}));

export default function Message({ message, own }) {
  const classes = useStyles();
  return (
    <div className={own ? classes.messageOwn : classes.message}>
      <div className={classes.messageTop}>
        <Typography className={classes.messageText}>{message.text}</Typography>
      </div>
      <div className={classes.messageBottom}>
        {moment(new Date(message.createdAt)).fromNow()}
      </div>
    </div>
  );
}
