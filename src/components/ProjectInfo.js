import { Button } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";

export default function ProjectInfo() {
  const { id } = useParams();
  const [project, setProject] = useState({
    owner: {},
    contributors: [],
    technologies: [],
    mentors: [],
  });

  const getProject = async (id) => {
    let config = {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    };
    const result = await axios.get(`/api/projects/${id}`, config);
    setProject(result.data);
  };

  useEffect(() => {
    getProject(id);
  }, []);

  return <div>{project.name + " " + project.owner.name} </div>;
}
