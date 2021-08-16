import {
  AppBar,
  Avatar,
  makeStyles,
  MenuItem,
  Toolbar,
  Menu,
} from "@material-ui/core";
import React from "react";
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
}));

function Navbar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    if (!anchorEl) setAnchorEl(event.currentTarget);
    else setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const history = useHistory();
  const handleLogout = () => {
    localStorage.removeItem("token");
    history.push("/");
    window.location.reload(false);
  };

  const handleEdit = () => {
    history.push("/edit");
  };

  return (
    <div className>
      <AppBar position="fixed" className={classes.navbar}>
        <Toolbar>
          <Avatar
            src={props.avatar}
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
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleEdit}>Edit profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default Navbar;
