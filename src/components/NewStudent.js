import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
  InputLabel,
  NativeSelect,
  TextField,
} from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";

function NewStudent(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [index, setIndex] = useState("");
  const [year, setYear] = useState(null);
  const [sp, setSP] = useState("");

  const handleAdd = async () => {
    let config = {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    };
    const data = {
      student: {
        email,
        password,
        name,
        year,
        indexNumber: index,
        studyProgram: sp,
      },
    };
    await axios.post(`api/students/new`, data, config);
    props.onPost();
  };

  return (
    <div>
      <Dialog open={props.open} onClose={(e) => props.onPost()}>
        <DialogTitle>New student</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="name"
              label="Name"
              type="name"
              id="name"
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="index"
              label="Index"
              type="index"
              id="index"
              onChange={(e) => setIndex(e.target.value)}
            />
            <InputLabel htmlFor="type-native-helper">Year</InputLabel>
            <NativeSelect
              required
              fullWidth
              value={year}
              onChange={(e) => {
                setYear(e.target.value);
              }}
              inputProps={{
                name: "type",
                id: "type-native-helper",
              }}
            >
              <option aria-label="None" value="" />
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </NativeSelect>
            <FormHelperText>Choose year</FormHelperText>
            <InputLabel htmlFor="sp-native-helper">Program</InputLabel>
            <NativeSelect
              required
              fullWidth
              value={sp}
              onChange={(e) => {
                setSP(e.target.value);
              }}
              inputProps={{
                name: "sp",
                id: "sp-native-helper",
              }}
            >
              <option aria-label="None" value="" />
              <option value={"Informacioni sistemi i tehnologije"}>Isit</option>
              <option value={"Menadzment i organizacija"}>Mio</option>
              <option value={"Operacioni menadzment"}>OM</option>
              <option value={"Menadzment kvaliteta i standardizacija"}>
                MKS
              </option>
            </NativeSelect>
            <FormHelperText>Choose year</FormHelperText>
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

export default NewStudent;
