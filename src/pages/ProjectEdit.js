import { Button } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ProjectEdit() {
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
  }, [id]);

  const handleEditProject = async () => {
    let config = {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    };
    const result = await axios.put(`/api/projects/edit/${id}`, project, config);
    setProject(result.data);
  };

  return (
    <div>
      {project.name + " " + project.owner.name}{" "}
      <Button
        type='submit'
        fullWidth
        variant='outlined'
        color='primary'
        onClick={handleEditProject}
      >
        Edit project
      </Button>
    </div>
  );
}
