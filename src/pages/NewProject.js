import {
  Button,
  Chip,
  FormControl,
  Input,
  InputLabel,
  List,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
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

  const handleAddContributor = (e) => {
    e.preventDefault();
    if (e.target.value && !project.contributors.includes(e.target.value)) {
      let temp = new Object(project);
      temp.contributors.push(e.target.value);
      setProject(temp);
      setHelper(helper === 0 ? 1 : 0);
    }
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
      <FormControl className={classes.formControl}>
        <InputLabel id='demo-dialog-select-label'>Add contributor</InputLabel>
        <Select
          labelId='demo-dialog-select-label'
          id='demo-dialog-select'
          input={<Input />}
          onChange={handleAddContributor}
        >
          <MenuItem value=''>
            <em>None</em>
          </MenuItem>
          {students.map((item) => {
            return <MenuItem value={item}>{item.name}</MenuItem>;
          })}
        </Select>
      </FormControl>
      <List component='nav' aria-label='secondary mailbox folders'>
        {project.contributors.map((item) => {
          return (
            <Chip
              label={item.name}
              onDelete={() => {
                let temp = new Object(project);
                temp.contributors.splice(temp.contributors.indexOf(item), 1);
                setProject(temp);
                setHelper(helper === 0 ? 1 : 0);
              }}
            />
          );
        })}
      </List>
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
