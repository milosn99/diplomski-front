import { CssBaseline, Grid, makeStyles } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import getUser from "../helper/getUser";
import Feed from "./Feed";
import UserCard from "./UserCard";
import UserInfo from "./UserInfo";

const useStyles = makeStyles((theme) => ({
  feed: {
    height: "95vh",
    overflow: "auto",
    marginRight: theme.spacing(5),
  },
}));

function Profile() {
  const [user, setUser] = useState({});
  const [data, setData] = useState([]);
  const classes = useStyles();

  const getPosts = async () => {
    let config = {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    };

    let result = await axios.get("/api/me/posts", config);

    setData(result.data);
  };

  useEffect(() => {
    getUser(setUser);
    getPosts();
  }, []);

  return (
    <div>
      <Grid container component="main" classname={classes.content}>
        <CssBaseline />
        <Grid item xs={1}></Grid>
        <Grid item xs={5}>
          <UserInfo user={user} />
        </Grid>
        <Grid item xs={5} classname={classes.feed}>
          <Feed data={data} />
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
    </div>
  );
}

export default Profile;
