import { Button } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getType from "../helper/getType";

function StudentProfile() {
  const [student, setStudent] = useState({});
  const { id } = useParams();
  const [type, setType] = useState("");

  useEffect(() => {
    const getUser = async (setUser) => {
      let config = {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      };

      axios.get(`/api/students/${id}`, config).then((result) => {
        setUser(result.data);
      });
    };
    getType(setType);
    getUser(setStudent);
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
      {type === "professor" ? (
        <Button variant='outlined' color='primary' onClick={handleApprove}>
          Approve student
        </Button>
      ) : (
        ""
      )}
    </div>
  );
}

export default StudentProfile;
