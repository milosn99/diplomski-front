import { Button, makeStyles, Typography } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import NewExam from "../components/NewExam";
import NewProfessor from "../components/NewProfessor";
import NewRecruiter from "../components/NewRecruiter";
import NewStudent from "../components/NewStudent";
import RemoveRecruiter from "../components/RemoveRecruiter";

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
  const [professorOpen, setProfessorOpen] = useState(false);
  const [recruiterOpen, setRecruiterOpen] = useState(false);
  const [removeOpen, setRemoveOpen] = useState(false);
  const [examOpen, setExamOpen] = useState(false);

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
        <NewStudent
          open={studentOpen}
          onPost={(e) => {
            setStudentOpen(false);
            SetStudentCount(studentCount + 1);
          }}
        />
      </div>
      <div className={classes.single}>
        <Typography>{`Professors:${professorCount}`}</Typography>
        <Button
          type="submit"
          onClick={(e) => {
            setProfessorOpen(true);
          }}
        >
          Add new
        </Button>
        <NewProfessor
          open={professorOpen}
          onPost={(e) => {
            setProfessorOpen(false);
            SetProfessorCount(professorCount + 1);
          }}
        />
      </div>
      <div className={classes.single}>
        <Typography>{`Recruiters${recruiterCount}`}</Typography>
        <Button
          type="submit"
          onClick={(e) => {
            setRecruiterOpen(true);
          }}
        >
          Add new
        </Button>
        <NewRecruiter
          open={recruiterOpen}
          onPost={(e) => {
            setRecruiterOpen(false);
            SetRecruiterCount(recruiterCount + 1);
          }}
        />
        <Button
          type="submit"
          onClick={(e) => {
            setRemoveOpen(true);
          }}
        >
          Remove a recruiter
        </Button>
        <RemoveRecruiter
          open={removeOpen}
          onClose={(e) => {
            setRemoveOpen(false);
          }}
        />
      </div>
      <div className={classes.single}>
        <Button
          type="submit"
          onClick={(e) => {
            setExamOpen(true);
          }}
        >
          Add exam
        </Button>
        <NewExam
          open={examOpen}
          onPost={(e) => {
            setExamOpen(false);
          }}
        />
      </div>
    </div>
  );
}
