import { Button, Chip, List, makeStyles, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import getAllStudents from "../helper/getAllStudents";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
}));

function NewProject() {
  const classes = useStyles();
  const [students, setStudents] = useState([{}]);
  const [project, setProject] = useState({
    contributors: [],
    technologies: [],
  });
  const [helper, setHelper] = useState(0);
  const [techToAdd, setTech] = useState("");

  const history = useHistory();

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
  return (
    <div>
      <TextField
        variant='outlined'
        margin='normal'
        id='name'
        label='Name'
        name='name'
        autoComplete='name'
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
        variant='outlined'
        margin='normal'
        required
        fullWidth
        id='content'
        multiline
        maxRows={3}
        label='Description'
        name='content'
        autoComplete='content'
        autoFocus
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
        id='tags-outlined'
        options={students}
        getOptionLabel={(option) => option.name}
        filterSelectedOptions
        limitTags={2}
        onChange={handleAddContributor}
        renderInput={(params) => (
          <TextField
            {...params}
            variant='outlined'
            label='Add contributors'
            placeholder='Contributors'
          />
        )}
      />
      <TextField
        variant='outlined'
        margin='normal'
        id='skill'
        label='Add skill'
        name='skill'
        autoComplete='skill'
        value={techToAdd}
        onChange={(e) => setTech(e.target.value)}
      />
      <Button
        type='submit'
        variant='contained'
        color='primary'
        onClick={handleAddTech}
      >
        Add technology
      </Button>
      <List component='nav' aria-label='secondary mailbox folders'>
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
        fullWidth
        type='submit'
        variant='outlined'
        color='primary'
        onClick={async (e) => {
          let config = {
            headers: {
              "x-auth-token": localStorage.getItem("token"),
            },
          };

          await axios.post("/api/projects/add", { project: project }, config);

          history.push("/");
        }}
      >
        Save project
      </Button>
    </div>
  );
}

export default NewProject;
