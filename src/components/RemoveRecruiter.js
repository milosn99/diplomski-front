import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Input,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";

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

function RemoveRecruiter(props) {
  const [recruiter, setRecruiter] = useState(null);
  const [allRecruiters, setAllRecruiters] = useState(null);
  const classes = useStyles();

  const handleDelete = async () => {
    let config = {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    };
    await axios.delete(`api/recruiters/${recruiter._id}`, config);
    props.onClose();
  };

  useEffect(() => {
    const getAllRecruiters = async () => {
      let config = {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      };
      const result = await axios.get(`api/recruiters`, config);
      setAllRecruiters(result.data);
    };
    getAllRecruiters();
  }, []);

  return (
    <div>
      <Dialog open={props.open} onClose={(e) => props.onClose()}>
        <DialogTitle>Choose a recruiter</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-dialog-select-label">Recruiter</InputLabel>
              <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                value={recruiter}
                onChange={(e) => setRecruiter(e.target.value)}
                input={<Input />}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {allRecruiters?.map((item) => {
                  return <MenuItem value={item}>{item.name}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={(e) => props.onClose()} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary">
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default RemoveRecruiter;
