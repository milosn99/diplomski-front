import { Button, Grid, CssBaseline, makeStyles } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Feed from "../components/Feed";
import UserInfo from "../components/UserInfo";
import jwt_decode from "jwt-decode";

const useStyles = makeStyles((theme) => ({
  feed: {
    height: "95vh",
    overflow: "auto",
    marginRight: theme.spacing(5),
  },
}));

function UserProfile() {
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const [type, setType] = useState("");
  const [data, setData] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    const getUser = () => {
      let config = {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      };

      axios.get(`/api/users/${id}`, config).then((result) => {
        setUser(result.data);
      });
    };
    setType(jwt_decode(localStorage.getItem("token")).userType);
    getUser();
  }, [id]);

  useEffect(() => {
    const getPosts = async () => {
      let config = {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      };

      let result = await axios.get(`/api/posts/${id}`, config);

      setData(result.data);
    };
    getPosts();
  }, [id]);

  const handleApprove = async (e) => {
    e.preventDefault();
    let config = {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    };

    await axios.put(
      `/api/professors/students`,
      { student: { _id: user._id, name: user.name } },
      config
    );
  };

  return (
    <div>
      <Grid container component="main" classname={classes.content}>
        <CssBaseline />
        <Grid item xs={1}></Grid>
        <Grid
          item
          xs={5}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {user && <UserInfo user={user} />}
          {type === "professor" && user?.userType === "student" && (
            <Button
              variant="outlined"
              // fullWidth
              color="primary"
              onClick={handleApprove}
              alignSelf="center"
            >
              Approve student
            </Button>
          )}
        </Grid>
        <Grid item xs={5} classname={classes.feed}>
          <Feed
            data={data}
            currentUser={jwt_decode(localStorage.getItem("token"))._id}
          />
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
    </div>
  );
}

export default UserProfile;
