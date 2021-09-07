import {
  Avatar,
  Divider,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import moment from "moment";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import React, { useEffect, useState } from "react";
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
  postBottom: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  postBottomLeft: {
    display: "flex",
    alignItems: "center",
    marginLeft: theme.spacing(2),
  },
  liked: {
    cursor: "pointer",
    color: "#2196f3",
  },
  notLiked: {
    cursor: "pointer",
    color: "gray",
  },
}));

export default function Post(props) {
  const [elevation, setElevation] = useState(2);
  const [likes, setLikes] = useState(props.data.likes.length);
  const [isLiked, setIsLiked] = useState(
    props.data.likes.includes(props.currentUser)
  );
  const classes = useStyles();
  const time = moment(new Date(props.data.timeStamp)).fromNow();

  const history = useHistory();

  const handleUserNameClick = (e) => {
    e.preventDefault();
    history.push(`/student/${props.user._id}`);
  };

  const handleLike = async () => {
    let config = {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    };
    await axios.get(`api/posts/${props.data._id}/like`, config);
    setLikes(isLiked ? likes - 1 : likes + 1);
    setIsLiked(!isLiked);
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
          src={`http://localhost:3001/${props.user.avatar}`}
          className={classes.large}
        />
        <Typography
          color="textSecondary"
          gutterBottom
          className={classes.userText}
          onClick={handleUserNameClick}
          style={{ cursor: "pointer" }}
        >
          {props.user.name}
        </Typography>
        <Typography
          color="textSecondary"
          gutterBottom
          className={classes.userText}
        >
          {time}
        </Typography>
      </div>
      <Divider />
      <Typography color="text2" gutterBottom>
        {props.data.content}
      </Typography>

      {props.data.thumbnail ? (
        <img
          alt={""}
          src={`http://localhost:3001/${props.data.thumbnail}`}
          width={300}
          className={classes.thumbnail}
        />
      ) : (
        ""
      )}
      <Divider />
      <div className={classes.postBottom}>
        <div className={classes.postBottomLeft}>
          <ThumbUpIcon
            className={isLiked ? classes.liked : classes.notLiked}
            onClick={handleLike}
          />
          <Typography style={{ marginLeft: "10px" }}>
            {likes} people like it
          </Typography>
        </div>
      </div>
    </Paper>
  );
}
