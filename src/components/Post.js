import {
  Avatar,
  Button,
  Divider,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import moment from "moment";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  feedItem: {
    marginTop: theme.spacing(2),
    width: "100%",
    padding: theme.spacing(1),
    // maxWidth: "800px",
  },
  buttons: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
  thumbnail: {
    marginTop: theme.spacing(1),
    width: "100%",
    maxHeight: "300px",
    objectFit: "contain",
  },
  user: {
    display: "flex",
    alignItems: "center",
  },
  userText: {
    paddingTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
}));

export default function Post(props) {
  const [elevation, setElevation] = useState(2);
  const classes = useStyles();
  const time = moment(new Date(props.data.timeStamp)).fromNow();

  const history = useHistory();

  const handleUserNameClick = (e) => {
    e.preventDefault();
    history.push(`/student/${props.user._id}`);
  };

  return (
    <Paper
      className={classes.feedItem}
      elevation={elevation}
      onMouseOver={() => setElevation(6)}
      onMouseOut={() => setElevation(2)}
    >
      <div class={classes.user}>
        <Avatar
          alt={props.user.name}
          src={props.user.avatar}
          className={classes.large}
        />
        <Typography
          color='textSecondary'
          gutterBottom
          className={classes.userText}
          onClick={handleUserNameClick}
        >
          {props.user.name}
        </Typography>
        <Typography
          color='textSecondary'
          gutterBottom
          className={classes.userText}
        >
          {time}
        </Typography>
      </div>
      <Divider />
      <Typography color='text2' gutterBottom>
        {props.data.content}
      </Typography>

      {props.data.thumbnail ? (
        <img
          src={props.data.thumbnail}
          width={300}
          className={classes.thumbnail}
        />
      ) : (
        ""
      )}
    </Paper>
  );
}
