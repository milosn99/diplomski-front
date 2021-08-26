import { Avatar, makeStyles, Typography } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";

const useStyles = makeStyles((theme) => ({
  chatOnlineFriend: {
    display: "flex",
    alignItems: "center",
    fontWeight: "500",
    cursor: "pointer",
    marginTop: theme.spacing(0.5),
  },
  chatOnlineImgContainer: {
    position: "relative",
    marginRight: theme.spacing(0.5),
  },
  chatOnlineImg: {
    width: theme.spacing(2),
    height: theme.spacing(2),
    borderRadius: "50%",
    objectFit: "cover",
    border: "1px solid white",
  },
}));

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
  const [available, setAvailable] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    const getAllUsers = async () => {
      let config = {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      };

      let result = await axios.get("/api/users", config);

      setAvailable(result.data);
    };
    getAllUsers();
  }, []);

  const handleClick = async (user) => {
    try {
      let config = {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      };
      let res = await axios.get(`api/conversations/find/${user._id}`, config);
      if (!res.data) {
        res = await axios.post(
          `api/conversations`,
          { receiverId: user._id },
          config
        );
        res = await axios.get(`api/conversations/find/${user._id}`, config);
      }
      setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={classes.ChatOnline}>
      {available.map((o) => (
        <div
          className={classes.chatOnlineFriend}
          onClick={() => handleClick(o)}
        >
          <div className={classes.chatOnlineImgContainer}>
            <Avatar className={classes.chatOnlineImg} src={o?.avatar} alt='' />
          </div>
          <Typography className={classes.ChatOnlineName}>{o?.name}</Typography>
        </div>
      ))}
    </div>
  );
}
