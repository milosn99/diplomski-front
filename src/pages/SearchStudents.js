import {
  Avatar,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  NativeSelect,
  Paper,
  TableBody,
  TableCell,
  TableRow,
  TextField,
} from "@material-ui/core";
import { TableHead } from "@material-ui/core";
import { Table, TableContainer, TablePagination } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

function SearchStudents() {
  const [page, setPage] = useState(0);
  const [students, setStudents] = useState(null);
  const [count, setCount] = useState(0);
  const [year, setYear] = useState(0);
  const [skill, setSkill] = useState("");

  let params = new URLSearchParams(useLocation().search);
  const history = useHistory();

  useEffect(() => {
    const getStudents = async () => {
      let config = {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      };

      let result = await axios.get(
        `/api/students/filter?${params.toString()}`,
        config
      );
      setStudents(result.data);
      result = await axios.get(
        `/api/students/count?${params.toString()}`,
        config
      );
      setCount(result.data.count);
    };
    setPage(parseInt(params.get("page")) || 0);
    getStudents();
  }, []);

  const handleFilter = () => {
    if (year !== 0) params.set("year", year);
    else params.delete("year");

    if (skill !== "") params.set("skills", skill);
    else params.delete("skills");

    history.push({
      search: `?${params.toString()}`,
    });
    window.location.reload();
  };

  return (
    <div
      style={{
        width: "100vw",
        marginTop: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", flexDirection: "row" }}>
        <FormControl>
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
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="skill"
            label="Skill"
            name="skill"
            autoComplete="skill"
            onChange={(e) => setSkill(e.target.value)}
          />
          <Button
            onClick={handleFilter}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Filter
          </Button>
        </FormControl>
      </div>
      <TableContainer component={Paper} style={{ width: "50%" }}>
        <Table aria-label="simple table" size="small">
          <TableHead>
            <TableRow>
              <TableCell>Student name</TableCell>
              <TableCell align="right">Year</TableCell>
              <TableCell align="right">Recommended by</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students?.map((row) => (
              <TableRow
                key={row.name}
                onClick={(e) => {
                  history.push(`/student/${row._id}`);
                }}
                style={{ cursor: "pointer" }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Avatar src={`http://localhost:3001/${row.avatar}`} />
                  <div style={{ marginLeft: "10px" }}>{row.name}</div>
                </TableCell>
                <TableCell align="right">{row.year}</TableCell>
                <TableCell align="right">
                  {row.professors.map((p) => p.name)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={count}
          page={page}
          rowsPerPage={10}
          onPageChange={(e, p) => {
            params.set("page", p);
            history.push({
              search: `?${params.toString()}`,
            });
            window.location.reload();
          }}
        />
      </TableContainer>
    </div>
  );
}

export default SearchStudents;
