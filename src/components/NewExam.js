import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
  Input,
  InputLabel,
  MenuItem,
  NativeSelect,
  Select,
  TextField,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import getAllStudents from "../helper/getAllStudents";

function NewExam(props) {
  const [subject, setSubject] = useState(null);
  const [student, setStudent] = useState(null);
  const [allSub, setAllSub] = useState([]);
  const [grade, setGrade] = useState(5);
  const [allStudents, setAllStudents] = useState([]);

  useEffect(() => {
    const getAllSub = async () => {
      let config = {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      };
      const result = await axios.get("api/subjects", config);
      setAllSub(result.data);
    };
    getAllSub();
    getAllStudents(setAllStudents);
  }, []);

  const handleAdd = async () => {
    let config = {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    };
    const data = {
      exam: {
        subject,
        grade,
      },
    };
    await axios.put(`api/students/exam/${student._id}`, data, config);
    props.onPost();
  };

  return (
    <div>
      <Dialog open={props.open} onClose={(e) => props.onPost()}>
        <DialogTitle>New student</DialogTitle>
        <DialogContent>
          <form>
            <InputLabel id="s-dialog-select-label">Student</InputLabel>
            <Select
              fullWidth
              labelId="s-dialog-select-label"
              id="s-dialog-select"
              value={student}
              onChange={(e) => setStudent(e.target.value)}
              input={<Input />}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {allStudents?.map((item) => {
                return <MenuItem value={item}>{item.name}</MenuItem>;
              })}
            </Select>
            <FormHelperText>Choose student</FormHelperText>
            <InputLabel id="demo-dialog-select-label">Subject</InputLabel>
            <Select
              fullWidth
              labelId="demo-dialog-select-label"
              id="demo-dialog-select"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              input={<Input />}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {allSub?.map((item) => {
                return <MenuItem value={item}>{item.name}</MenuItem>;
              })}
            </Select>
            <FormHelperText>Choose subject</FormHelperText>
            <InputLabel htmlFor="type-native-helper">Grade</InputLabel>
            <NativeSelect
              required
              fullWidth
              value={grade}
              onChange={(e) => {
                setGrade(e.target.value);
              }}
              inputProps={{
                name: "type",
                id: "type-native-helper",
              }}
            >
              <option aria-label="None" value="" />
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
            </NativeSelect>
            <FormHelperText>Choose grade</FormHelperText>
          </form>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleAdd}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default NewExam;
