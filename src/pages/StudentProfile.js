import { Button, Grid, CssBaseline, makeStyles } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Feed from "../components/Feed";
import UserInfo from "../components/UserInfo";
import getType from "../helper/getType";

const useStyles = makeStyles((theme) => ({
  feed: {
    height: "95vh",
    overflow: "auto",
    marginRight: theme.spacing(5),
  },
}));

function StudentProfile() {
  const [student, setStudent] = useState({});
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

      axios.get(`/api/students/${id}`, config).then((result) => {
        setStudent(result.data);
      });
    };
    getType(setType);
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
      { student: { _id: student._id, name: student.name } },
      config
    );
  };

  return (
    <div>
      <Grid container component="main" classname={classes.content}>
        <CssBaseline />
        <Grid item xs={1}></Grid>
        <Grid item xs={5}>
          <UserInfo user={student} />
          {type === "professor" ? (
            <Button variant="outlined" color="primary" onClick={handleApprove}>
              Approve student
            </Button>
          ) : (
            ""
          )}
        </Grid>
        <Grid item xs={5} classname={classes.feed}>
          <Feed data={data} />
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
    </div>
  );
}

export default StudentProfile;
