import {
  Avatar,
  Card,
  CardContent,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import ProfessorInfo from "./ProfessorInfo";
import RecruiterInfo from "./RecruiterInfo";
import StudentInfo from "./StudentInfo";

const useStyles = makeStyles((theme) => ({
  wrap: {
    display: "flex",
    width: "95%",
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

function UserInfo(props) {
  const classes = useStyles();

  const history = useHistory();

  const content = () => {
    switch (props.user?.userType) {
      case "student":
        return (
          <div>
            <StudentInfo user={props.user} />
          </div>
        );
      case "professor":
        return (
          <div>
            <ProfessorInfo user={props.user} />
          </div>
        );
      case "recruiter":
        return (
          <div>
            <RecruiterInfo user={props.user} />
          </div>
        );
      default:
        return <div>{""}</div>;
    }
  };

  return (
    <div className={classes.wrap}>
      <Card className={classes.card}>
        <CardContent>
          <Avatar
            alt={props.user.name}
            src={`http://localhost:3001/${props.user.avatar}`}
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
            {props.user.headline || props.user.position || props.user.title}
          </Typography>
        </CardContent>
        <CardContent className={classes.table}>{content()}</CardContent>
      </Card>
    </div>
  );
}

export default UserInfo;
