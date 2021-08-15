import { CssBaseline, Fab, Grid, makeStyles } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Zoom from "@material-ui/core/Zoom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Post from "./Post";
import getUser from "../helper/getUser";
import UserCard from "./UserCard";
import Feed from "./Feed";

const useStyles = makeStyles((theme) => ({
  fab: {
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    position: "fixed",
  },
  feed: {
    height: "95vh",
    overflow: "auto",
  },
}));

function Dashboard() {
  const [data, setData] = useState([]);
  const classes = useStyles();
  const [user, setUser] = useState({});

  const getPosts = async () => {
    let config = {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    };

    let result = await axios.get("/api/posts", config);

    setData(result.data);
  };

  useEffect(() => {
    getUser(setUser);
    getPosts();
  }, []);

  const history = useHistory();

  const handleFabClick = (e) => {
    e.preventDefault();
    let path = `/posts/new`;
    history.push(path);
  };

  return (
    <div className={classes.wrap}>
      <Zoom in timeout={500} unmountOnExit>
        <Fab
          color='primary'
          aria-label='add'
          onClick={handleFabClick}
          className={classes.fab}
        >
          <AddIcon />
        </Fab>
      </Zoom>

      <Grid container component='main' classname={classes.content}>
        <CssBaseline />
        <Grid item xs={4}>
          <UserCard user={user} />
        </Grid>
        <Grid item xs={4} classname={classes.feed}>
          <Feed data={data} />
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
    </div>
  );
}

export default Dashboard;
