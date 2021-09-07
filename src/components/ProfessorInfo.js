import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React from "react";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  wrap: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    marginRight: theme.spacing(3),
    marginTop: theme.spacing(2),
    overflow: "visible",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: "1.5rem",
    textAlign: "center",
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
  headline: {
    textAlign: "center",
    fontSize: "1.2rem",
  },
  table: {
    width: "90%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  editButton: {
    marginBottom: theme.spacing(1.5),
  },
}));

function ProfessorInfo(props) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Projects</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Project</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.user.projects?.map((row) => (
                  <TableRow key={row.name} style={{ cursor: "pointer" }}>
                    <TableCell
                      component="th"
                      scope="row"
                      onClick={(e) => {
                        history.push(`/project/${row._id}`);
                      }}
                    >
                      {row.name}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>
            Students I recommend
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Student</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.user.students?.map((row) => (
                  <TableRow
                    key={row.name}
                    style={{ cursor: "pointer" }}
                    onClick={(e) => history.push(`/user/${row._id}`)}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default ProfessorInfo;
