import { Avatar, makeStyles, Typography } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";

const useStyles = makeStyles((theme) => ({
  conversation: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0.5),
    cursor: "pointer",
    marginTop: theme.spacing(1),
  },
  conversationImg: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    objectFit: "cover",
    marginRight: "20px",
  },
  conversationName: {
    fontWeight: "500",
  },
}));

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    const friend = conversation.members.find((m) => m !== currentUser?._id);

    const getUser = async () => {
      let config = {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      };
      const res = await axios.get(`/api/users/${friend}`, config);
      setUser(res.data);
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className={classes.conversation}>
      <Avatar className={classes.conversationImg} src={user?.avatar} alt='' />
      <Typography className={classes.conversationName}>{user?.name}</Typography>
    </div>
  );
}
