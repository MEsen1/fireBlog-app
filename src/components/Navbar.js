import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../helpers/firebase";
import { signOut } from "firebase/auth";
import { AuthContext } from "../contexts/AuthContext";
import { useAuth } from "../contexts/AuthContext";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Icon from "../assets/icon.png";
import User from "../assets/user.png";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Navbar = () => {
  //const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  const navigate = useNavigate();
  const { currentUser, signOutFunct } = useAuth();

  const signOutFunc = () => {
    console.log(currentUser.email);
    setAnchorEl(null);
    signOutFunct();
    console.log(currentUser.email);
    console.log("signed out");
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => navigate("/")}
          >
            <Avatar src={Icon} />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>
          {currentUser?.email ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div>
                <Typography variant="h6">{currentUser.email}</Typography>
              </div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar src={User} />
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => navigate("/profile")}>
                  Profile
                </MenuItem>
                <MenuItem onClick={() => navigate("/new-blog")}>New</MenuItem>
                <MenuItem onClick={() => signOutFunc()}>Logout</MenuItem>
              </Menu>
            </div>
          ) : (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar src={User} />
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => navigate("/login")} href="/login">
                  Login
                </MenuItem>
                <MenuItem onClick={() => navigate("/register")}>
                  Register
                </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default Navbar;
