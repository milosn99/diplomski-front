import { IconButton } from "@material-ui/core";
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Input,
  InputLabel,
  List,
  makeStyles,
  MenuItem,
  Select,
  Snackbar,
  TextField,
} from "@material-ui/core";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import getUser from "../helper/getUser";
import NewProject from "../components/NewProject";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  input: {
    display: "none",
  },
}));

function EditProfile(props) {
  const [skillToAdd, setSkill] = useState("");
  const [interestToAdd, setInterest] = useState("");
  const [user, setUser] = useState({ skills: [], projects: [], interests: [] });
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [projectDialogOpen, setProjectDialogOpen] = useState(false);
  const [severity, setSeverity] = useState("");
  const [message, setMessage] = useState("");
  const [project, setProject] = useState(null);
  const [helper, setHelper] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [newProjectOpen, setNewProjectOpen] = useState(false);

  useEffect(() => {
    getUser(setUser);
  }, []);

  const classes = useStyles();

  const handleChange = (event) => {
    setProject(event.target.value || "");
  };

  const handleClickOpen = () => {
    setProjectDialogOpen(true);
  };

  const handleClose = () => {
    setProjectDialogOpen(false);
  };

  const history = useHistory();

  const handleEditProject = () => {
    if (project) {
      let path = `/project/${project._id}/edit`;
      history.push(path);
    }
  };

  const handleAddSkill = (e) => {
    e.preventDefault();

    if (!user.skills.includes(skillToAdd)) {
      let temp = new Object(user);
      temp.skills.push(skillToAdd);
      setSkill("");
      setUser(temp);
    } else {
      setSeverity("error");
      setMessage("Skill already exists");
      setSnackBarOpen(true);
    }
  };

  const handleAddInterest = (e) => {
    e.preventDefault();

    if (!user.interests.includes(interestToAdd)) {
      let temp = new Object(user);
      temp.interests.push(interestToAdd);
      setInterest("");
      setUser(temp);
    } else {
      setSeverity("error");
      setMessage("Interest already exists");
      setSnackBarOpen(true);
    }
  };

  const handleAddProject = (e) => {
    // e.preventDefault();
    // history.push("/projects/new");
    setNewProjectOpen(true);
  };

  const handleUpdateStudent = async (e) => {
    e.preventDefault();
    let config = {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    };

    await axios.put("/api/students/edit/", user, config);

    config = {
      headers: {
        enctype: "multipart/form-data",
        "x-auth-token": localStorage.getItem("token"),
      },
    };

    const data = new FormData();
    data.append("avatar", selectedFile);

    if (selectedFile) {
      await axios.put(`/api/students/photo/${user._id}`, data, config);
    }

    setSeverity("success");
    setMessage("Succesfully updated student");
    setSnackBarOpen(true);
  };

  return (
    <div>
      <input
        accept="image/*"
        className={classes.input}
        id="avatar"
        name="avatar"
        type="file"
        onChange={(e) => {
          setSelectedFile(e.target.files[0]);
        }}
      />
      <label htmlFor="avatar">
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
        >
          <PhotoCamera />
        </IconButton>
      </label>
      <div className={classes.root}>
        <Snackbar
          open={snackBarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackBarOpen(false)}
        >
          <Alert severity={severity}>{message}</Alert>
        </Snackbar>
        <List component="nav" aria-label="secondary mailbox folders">
          {user.skills.map((skill) => {
            return (
              <Chip
                label={skill}
                onDelete={() => {
                  let temp = new Object(user);
                  temp.skills.splice(temp.skills.indexOf(skill), 1);
                  setUser(temp);
                  setHelper(helper === 0 ? 1 : 0);
                }}
              />
            );
          })}
        </List>
        <TextField
          variant="outlined"
          margin="normal"
          id="skill"
          label="Add skill"
          name="skill"
          autoComplete="skill"
          value={skillToAdd}
          onChange={(e) => setSkill(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleAddSkill}
        >
          Add skill
        </Button>
        <List component="nav" aria-label="secondary mailbox folders">
          {user.interests.map((interest) => {
            return (
              <Chip
                label={interest}
                onDelete={() => {
                  let temp = new Object(user);
                  temp.interests.splice(temp.interests.indexOf(interest), 1);
                  setUser(temp);
                  setHelper(helper === 0 ? 1 : 0);
                }}
              />
            );
          })}
        </List>
        <TextField
          variant="outlined"
          margin="normal"
          id="interest"
          label="Add interest"
          name="interest"
          autoComplete="interest"
          value={interestToAdd}
          onChange={(e) => setInterest(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleAddInterest}
        >
          Add interest
        </Button>
      </div>
      <div lassName={classes.root}>
        <Button variant="outlined" color="primary" onClick={handleAddProject}>
          Add new project
        </Button>
        <Dialog open={newProjectOpen} onClose={(e) => setNewProjectOpen(false)}>
          <DialogTitle>New project</DialogTitle>
          <DialogContent>
            <NewProject
              onPost={(e) => {
                setNewProjectOpen(false);
                getUser(setUser);
              }}
            />
          </DialogContent>
        </Dialog>
        <Dialog open={projectDialogOpen} onClose={handleClose}>
          <DialogTitle>Choose a project</DialogTitle>
          <DialogContent>
            <form className={classes.container}>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-dialog-select-label">Project</InputLabel>
                <Select
                  labelId="demo-dialog-select-label"
                  id="demo-dialog-select"
                  value={project}
                  onChange={handleChange}
                  input={<Input />}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {user.projects.map((item) => {
                    return <MenuItem value={item}>{item.name}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleEditProject} color="primary">
              Edit
            </Button>
          </DialogActions>
        </Dialog>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Edit an existing project
        </Button>
      </div>
      <Button
        type="submit"
        fullWidth
        variant="outlined"
        color="primary"
        className={classes.submit}
        onClick={handleUpdateStudent}
      >
        Save changes
      </Button>
    </div>
  );
}

export default EditProfile;
