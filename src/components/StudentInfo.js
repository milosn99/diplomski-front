import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
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

export default function StudentInfo(props) {
  const classes = useStyles();

  const history = useHistory();

  return (
    <div className={classes.wrap}>
      <Card className={classes.card}>
        <CardContent>
          <Avatar
            alt={props.user.name}
            src={props.user.avatar}
            className={classes.large}
          />
        </CardContent>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {props.user.name}
          </Typography>
          <Typography variant="body2" className={classes.headline}>
            {props.user.headline}
          </Typography>
        </CardContent>
        <CardContent className={classes.table}>
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
                      <TableCell align="right">Technologies</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {props.user.projects.map((row) => (
                      <TableRow key={row.name}>
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">
                          {row.technologies.join(", ")}
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
              <Typography className={classes.heading}>Skills</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List dense={true}>
                {props.user.skills.map((skill) => {
                  return (
                    <ListItem>
                      <ListItemText primary={skill} />
                    </ListItem>
                  );
                })}
              </List>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>
                Recommended by
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List dense={true}>
                {props.user.professors.map((professor) => {
                  return (
                    <ListItem>
                      <ListItemText primary={professor.name} />
                    </ListItem>
                  );
                })}
              </List>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>
                Extracurriculars
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Event</TableCell>
                      <TableCell align="right">Organizator</TableCell>
                      <TableCell align="right">Position</TableCell>
                      <TableCell align="right">Description</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {props.user.projects.map((row) => (
                      <TableRow key={row.name}>
                        <TableCell component="th" scope="row">
                          {row.event}
                        </TableCell>
                        <TableCell align="right">{row.organization}</TableCell>
                        <TableCell align="right">{row.position}</TableCell>
                        <TableCell align="right">{row.description}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>
        </CardContent>
        <CardActions className={classes.editButton}>
          <Button
            variant="contained"
            size="small"
            onClick={(e) => {
              history.push("/edit");
            }}
          >
            Edit profile
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
