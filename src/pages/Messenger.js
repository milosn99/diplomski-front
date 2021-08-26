import { Button, Typography, TextField, makeStyles } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import ChatOnline from "../components/ChatOnline";
import Conversation from "../components/Conversation";
import Message from "../components/Message";

const useStyles = makeStyles((theme) => ({
  messenger: {
    height: "calc(100vh-70px)",
    display: "flex",
  },
  chatMenu: {
    flex: 3.5,
  },
  chatMenuInput: {
    width: "90%",
    padding: "10px 0",
    border: "none",
    borderRadius: "1px solid gray",
  },
  chatBox: {
    flex: 5.5,
  },
  chatBoxWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    position: "relative",
    marginTop: theme.spacing(1),
    padding: theme.spacing(0.5),
    height: "90vh",
  },
  chatBoxTop: {
    height: "100%",
    overflowY: "scroll",
    paddingRight: theme.spacing(0.5),
  },
  chatBoxBottom: {
    marginTop: theme.spacing(0.25),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  chatMessageInput: {
    width: "80%",
    height: "90px",
    padding: theme.spacing(0.5),
  },
  chatSubmitButton: {
    width: theme.spacing(3.5),
    height: theme.spacing(2),
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    color: "white",
  },
  chatOnline: {
    flex: 3,
  },
  chatMenuWrapper: {
    padding: theme.spacing(0.5),
    height: "100%",
  },
  chatOnlineWrapper: {
    padding: theme.spacing(0.5),
    height: "100%",
  },
  noConversationText: {
    position: "absolute",
    top: "10%",
    fontSize: "3rem",
    color: "rgb(224,220,220)",
    cursor: "default",
  },
}));

function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);
  const [available, setAvailable] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const socket = useRef();
  const scrollRef = useRef();
  const classes = useStyles();

  useEffect(() => {
    const getUser = async () => {
      let config = {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      };

      axios.get("/api/me", config).then((result) => {
        setUser(result.data);
      });
    };
    getUser();
  }, []);

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

  useEffect(() => {
    socket.current = io("http://localhost:3001", { transports: ["websocket"] });
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user?._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        available.filter((f) => users.some((u) => u.userId === f._id))
      );
    });
  }, [user, available]);

  useEffect(() => {
    const getConversations = async () => {
      let config = {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      };
      const res = await axios.get("/api/conversations", config);
      setConversations(res.data);
    };
    getConversations();
  }, []);

  useEffect(() => {
    let config = {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    };
    const getMessages = async () => {
      const res = await axios.get("/api/messages/" + currentChat?._id, config);
      setMessages(res.data);
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: { _id: user._id, name: user.name },
      text: newMessage,
      conversation: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      let config = {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      };
      const res = await axios.post("api/messages", message, config);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div>
      <div className={classes.messenger}>
        <div className={classes.chatMenu}>
          <div className={classes.chatMenuWrapper}>
            {conversations?.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
        <div className={classes.chatBox}>
          <div className={classes.chatBoxWrapper}>
            {currentChat ? (
              <>
                <div className={classes.chatBoxTop}>
                  {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Message message={m} own={m?.sender._id === user._id} />
                    </div>
                  ))}
                </div>
                <div className={classes.chatBoxBottom}>
                  <TextField
                    className={classes.chatMessageInput}
                    variant='outlined'
                    margin='normal'
                    id='newMessage'
                    label='Type a message'
                    name='newMessage'
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <Button
                    type='submit'
                    variant='contained'
                    color='primary'
                    onClick={handleSubmit}
                    className={classes.chatSubmitButton}
                  >
                    Send
                  </Button>
                </div>
              </>
            ) : (
              <Typography className={classes.noConversationText}>
                Open a conversation to start a chat.
              </Typography>
            )}
          </div>
        </div>
        <div className={classes.chatOnline}>
          <div className={classes.chatOnlineWrapper}>
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user?._id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Messenger;
