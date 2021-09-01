import {
  AppBar,
  Avatar,
  makeStyles,
  MenuItem,
  Toolbar,
  Menu,
  Button,
  TextField,
} from "@material-ui/core";
import MessageOutlinedIcon from "@material-ui/icons/MessageOutlined";
import { Autocomplete } from "@material-ui/lab";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  navbar: {
    display: "flex",
    alignItems: "flex-end",
  },
  menu: {
    marginTop: theme.spacing(5),
    transform: "translateX(-2%)",
  },
  messenger: {
    marginRight: theme.spacing(3),
  },
  home: {
    marginRight: theme.spacing(3),
  },
}));

function Navbar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [avatar, setAvatar] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const getAvatar = async () => {
      let config = {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      };

      let result = await axios.get("/api/me/avatar", config);
      setAvatar(result.data);
    };
    getAvatar();
  }, []);

  const handleClick = (event) => {
    if (!anchorEl) setAnchorEl(event.currentTarget);
    else setAnchorEl(null);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
  };

  const history = useHistory();
  const handleLogout = () => {
    localStorage.removeItem("token");
    history.push("/");
    window.location.reload();
  };

  const handleUpdateInput = async (e) => {
    if (!e.target.value) {
      setSuggestions([]);
      return;
    }
    let config = {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
      params: {
        name: e.target.value,
      },
    };

    let result = await axios.get("/api/users/filter", config);
    setSuggestions(result.data);
  };

  return (
    <div className>
      <AppBar position="fixed" className={classes.navbar}>
        <Toolbar>
          <Autocomplete
            options={suggestions}
            freeSolo
            getOptionLabel={(option) => option.name}
            style={{ width: 300, background: "white" }}
            onInputChange={handleUpdateInput}
            onChange={(e, v) => {
              switch (v?.userType) {
                case "student":
                  history.push(`/student/${v._id}`);
                  return;
                case "professor":
                  history.push(`/professor/${v._id}`);
                  return;
                default:
                  return;
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Search users"
                placeholder="Users"
              />
            )}
          />
          <Button
            color="inherit"
            className={classes.home}
            onClick={(e) => history.push("/")}
          >
            Home
          </Button>
          <MessageOutlinedIcon
            className={classes.messenger}
            onClick={(e) => {
              history.push("/messenger");
            }}
          />
          <Avatar
            src={`http://localhost:3001/${avatar}`}
            className={classes.menuButton}
            onClick={handleClick}
          />
          <Menu
            className={classes.menu}
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              onClick={(e) => {
                history.push("/me");
              }}
            >
              Profile
            </MenuItem>
            <MenuItem
              onClick={(e) => {
                history.push("/edit");
              }}
            >
              Edit profile
            </MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default Navbar;
