import { Button, Chip, List, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getAllStudents from "../helper/getAllStudents";

export default function ProjectEdit() {
  const { id } = useParams();
  const [project, setProject] = useState({
    owner: {},
    contributors: [],
    technologies: [],
    mentors: [],
  });
  const [helper, setHelper] = useState(0);
  const [techToAdd, setTech] = useState("");
  const [students, setStudents] = useState([{}]);
  let defaultStudents = [];

  const handleAddContributor = (e, v) => {
    let temp = project;
    temp.contributors = v;
    setProject(temp);
    setHelper(helper === 0 ? 1 : 0);
  };

  const handleAddTech = (e) => {
    e.preventDefault();

    if (!project.technologies.includes(techToAdd)) {
      let temp = new Object(project);
      temp.technologies.push(techToAdd);
      setTech("");
      setProject(temp);
    }
  };

  useEffect(() => {
    getAllStudents(setStudents);
  }, []);

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
      <TextField
        shrink
        variant="outlined"
        margin="normal"
        id="name"
        label="Name"
        name="name"
        autoComplete="name"
        value={project.name}
        onChange={(e) => {
          let temp = new Object(project);
          temp.name = e.target.value;
          setProject(temp);
          setHelper(helper === 0 ? 1 : 0);
        }}
      />
      <br />{" "}
      <TextField
        shrink
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="content"
        multiline
        maxRows={3}
        label="Description"
        name="content"
        autoComplete="content"
        value={project.description}
        onChange={(e) => {
          let temp = new Object(project);
          temp.description = e.target.value;
          setProject(temp);
          setHelper(helper === 0 ? 1 : 0);
        }}
      />
      <br />
      <Autocomplete
        multiple
        id="tags-outlined"
        options={students}
        getOptionLabel={(option) => option.name}
        filterSelectedOptions
        limitTags={2}
        onChange={handleAddContributor}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Add contributors"
            placeholder="Contributors"
          />
        )}
      />
      <TextField
        variant="outlined"
        margin="normal"
        id="skill"
        label="Add skill"
        name="skill"
        autoComplete="skill"
        value={techToAdd}
        shrink
        onChange={(e) => setTech(e.target.value)}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={handleAddTech}
      >
        Add technology
      </Button>
      <List component="nav" aria-label="secondary mailbox folders">
        {project.technologies.map((technology) => {
          return (
            <Chip
              label={technology}
              onDelete={() => {
                let temp = new Object(project);
                temp.technologies.splice(
                  temp.technologies.indexOf(technology),
                  1
                );
                setProject(temp);
                setHelper(helper === 0 ? 1 : 0);
              }}
            />
          );
        })}
      </List>
      <Button
        type="submit"
        fullWidth
        variant="outlined"
        color="primary"
        onClick={handleEditProject}
      >
        Edit project
      </Button>
    </div>
  );
}
