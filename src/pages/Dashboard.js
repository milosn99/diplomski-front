import {
  CssBaseline,
  Fab,
  Grid,
  makeStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Zoom from "@material-ui/core/Zoom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import getUser from "../helper/getUser";
import UserCard from "../components/UserCard";
import Feed from "../components/Feed";
import NewPost from "../components/NewPost";

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
  const [open, setOpen] = useState(false);

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
    setOpen(true);
  };

  const handleClose = () => {
    console.log("close");
    setOpen(false);
  };

  return (
    <div className={classes.wrap}>
      {user.userType === "student" && (
        <div>
          <Zoom in timeout={500} unmountOnExit>
            <Fab
              color="primary"
              aria-label="add"
              onClick={handleFabClick}
              className={classes.fab}
            >
              <AddIcon />
            </Fab>
          </Zoom>

          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">New post</DialogTitle>
            <DialogContent>
              <NewPost
                onPost={() => {
                  handleClose();
                  getPosts();
                }}
              />
            </DialogContent>
          </Dialog>
        </div>
      )}

      <Grid container component="main" className={classes.content}>
        <CssBaseline />
        <Grid item xs={3}>
          <UserCard user={user} />
        </Grid>
        <Grid item xs={7} classname={classes.feed}>
          <Feed data={data} currentUser={user._id} />
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </div>
  );
}

export default Dashboard;
