import { Button, makeStyles, Typography } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import NewStudent from "../components/NewStudent";

const useStyles = makeStyles((theme) => ({
  single: {
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
  },
}));

export default function AdminDashboard() {
  const [studentCount, SetStudentCount] = useState(0);
  const [professorCount, SetProfessorCount] = useState(0);
  const [recruiterCount, SetRecruiterCount] = useState(0);
  const [studentOpen, setStudentOpen] = useState(false);

  const classes = useStyles();
  useEffect(() => {
    const getStudentCount = async () => {
      let config = {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      };

      axios.get("/api/students/count", config).then((result) => {
        SetStudentCount(result.data.count);
      });
    };
    getStudentCount();
  }, []);

  useEffect(() => {
    const getProfessorCount = async () => {
      let config = {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      };

      axios.get("/api/professors/count", config).then((result) => {
        SetProfessorCount(result.data.count);
      });
    };
    getProfessorCount();
  }, []);

  useEffect(() => {
    const getRecruiterCount = async () => {
      let config = {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      };

      axios.get("/api/recruiters/count", config).then((result) => {
        SetRecruiterCount(result.data.count);
      });
    };
    getRecruiterCount();
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div className={classes.single}>
        <Typography>{`Students:${studentCount}`}</Typography>
        <Button
          type="submit"
          onClick={(e) => {
            setStudentOpen(true);
          }}
        >
          Add new
        </Button>
        <NewStudent open={studentOpen} setOpen={setStudentOpen} />
      </div>
      <div className={classes.single}>
        <Typography>{`Professors:${professorCount}`}</Typography>
        <Button type="submit">Add new</Button>
      </div>
      <div className={classes.single}>
        <Typography>{`Recruiters${recruiterCount}`}</Typography>
        <Button type="submit">Add new</Button>
        <Button type="submit">Remove a recruiter</Button>
      </div>
    </div>
  );
}
