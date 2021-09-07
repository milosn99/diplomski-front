import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { Button, TextField } from "@material-ui/core";

export default function ProjectInfo() {
  const { id } = useParams();
  const [project, setProject] = useState({
    owner: {},
    contributors: [],
    technologies: [],
    mentors: [],
  });
  const [type, setType] = useState("");
  const [comment, setComment] = useState("");

  const history = useHistory();

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
    setType(jwt_decode(localStorage.getItem("token")).userType);
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
      { project: { _id: project._id, name: project.name }, comment },
      config
    );
    history.push("/");
  };

  return (
    <div>
      {project.name + " " + project.owner.name}{" "}
      {type === "professor" ? (
        <div>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="comment"
            multiline
            maxRows={5}
            label="Say something about the project"
            name="comment"
            autoComplete="comment"
            autoFocus
            onChange={(e) => setComment(e.target.value)}
          />
          <Button variant="outlined" color="primary" onClick={handleApprove}>
            I mentored this project
          </Button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
