import { Avatar } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import "./chatOnline.css";

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
  const [friends, setFriends] = useState([]);
  const [available, setAvailable] = useState([]);

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
    <div className='chatOnline'>
      {available.map((o) => (
        <div className='chatOnlineFriend' onClick={() => handleClick(o)}>
          <div className='chatOnlineImgContainer'>
            <Avatar className='chatOnlineImg' src={o?.avatar} alt='' />
            <div className='chatOnlineBadge'></div>
          </div>
          <span className='chatOnlineName'>{o?.name}</span>
        </div>
      ))}
    </div>
  );
}
