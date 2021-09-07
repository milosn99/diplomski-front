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

function NewRecruiter(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [company, setCompany] = useState(null);
  const [allComp, setAllComp] = useState([]);

  useEffect(() => {
    const getAllComps = async () => {
      let config = {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      };
      const result = await axios.get("api/companies", config);
      setAllComp(result.data);
    };
    getAllComps();
  }, []);

  const handleAdd = async () => {
    let config = {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    };
    const data = {
      recruiter: {
        email,
        password,
        name,
        position,
        company,
      },
    };
    await axios.post(`api/recruiters/new`, data, config);
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
              name="position"
              label="Position"
              type="position"
              id="position"
              onChange={(e) => setPosition(e.target.value)}
            />
            <InputLabel id="demo-dialog-select-label">Recruiter</InputLabel>
            <Select
              fullWidth
              labelId="demo-dialog-select-label"
              id="demo-dialog-select"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              input={<Input />}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {allComp?.map((item) => {
                return <MenuItem value={item}>{item.name}</MenuItem>;
              })}
            </Select>
            <FormHelperText>Choose company</FormHelperText>
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

export default NewRecruiter;
