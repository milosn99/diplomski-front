import {
  Avatar,
  Button,
  CardContent,
  makeStyles,
  Typography,
  Card,
  CardActions,
} from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  wrap: {
    height: "95vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    marginRight: theme.spacing(3),
    marginTop: theme.spacing(-7),
    overflow: "visible",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: theme.spacing(25),
    height: theme.spacing(32),
  },
  title: {
    fontSize: 14,
    textAlign: "center",
  },
  large: {
    width: theme.spacing(9),
    height: theme.spacing(9),
  },
  headline: {
    textAlign: "center",
    fontSize: "0.8rem",
  },
}));

function UserCard(props) {
  const classes = useStyles();

  const history = useHistory();

  const handleClick = (e) => {
    e.preventDefault();
    history.push("/me");
  };

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
            {props.user.headline ||
              props.user.position ||
              props.user.title + " at " + props.user.department}
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" onClick={handleClick} size="small">
            Visit profile
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default UserCard;
