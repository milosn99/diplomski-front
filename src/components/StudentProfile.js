import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function StudentProfile() {
  const [user, setUser] = useState({});
  const { id } = useParams();
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

  useEffect(() => {
    getUser(setUser);
  }, []);

  return <div>{user.name}</div>;
}

export default StudentProfile;
