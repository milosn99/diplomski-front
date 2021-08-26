import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ProjectInfo() {
  const { id } = useParams();
  const [project, setProject] = useState({
    owner: {},
    contributors: [],
    technologies: [],
    mentors: [],
  });

  useEffect(() => {
    const getProject = async (id) => {
      let config = {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      };
      const result = await axios.get(`/api/projects/${id}`, config);
      setProject(result.data);
    };
    getProject(id);
  }, [id]);

  const handleApprove = async (e) => {
    e.preventDefault();
    let config = {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    };

    await axios.put(
      `/api/professors/projects`,
      { project: { _id: project._id, name: project.name } },
      config
    );
  };

  return (
    <div>
      {project.name + " " + project.owner.name}{" "}
      {/* {type === "professor" ? (
        <Button variant='outlined' color='primary' onClick={handleApprove}>
          I mentored this project
        </Button>
      ) : (
        ""
      )} */}
    </div>
  );
}
