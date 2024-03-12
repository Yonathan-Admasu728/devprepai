import React, { useState } from "react";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Logo from "../components/Logo";
import styles from "../styles/Navbar.module.css";

function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { data: session } = useSession();
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const isDashboard = router.pathname === "/dashboard";

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignIn = () => {
    signIn("google");
    handleClose();
  };

  const handleBlog = () => {
    router.push("/blog");
    handleClose();
  };

  const handleContactUs = () => {
    router.push("/contact");
    handleClose();
  };

  const handleMyAccount = () => {
    router.push("/myaccount");
    handleClose();
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
    handleClose();
  };
  return (
    <>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        className={styles.fullWidthAppBar}
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          overflowX: "hidden",
          // backgroundColor: isDashboard ? '#0d0212' : 'rgba(0, 0, 0, 0.2)'
          backgroundColor: isDashboard
            ? "rgba(0, 0, 0, 0.2)"
            : "rgba(13, 18, 36)",
        }}
      >
        <Toolbar
          sx={{ justifyContent: "space-between", paddingX: { xs: 2, sm: 3 } }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="home"
            onClick={() => router.push("/")}
            sx={{ color: "#fcbc5a", mr: 2 }}
          >
            {/* <Typography variant="h6" color="primary" noWrap>
              DEVPREPAI
            </Typography> */}
            <Logo />
          </IconButton>

          {isMobile ? (
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleMenu}
              sx={{ color: "#fcbc5a" }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <div>
              
              <Button
                color="inherit"
                onClick={handleSignIn}
                sx={{ color: "#fff", marginX: 1 }}
                className={styles.capitalize}
              >
                My progress
              </Button>
              <Button
                color="inherit"
                onClick={handleBlog}
                sx={{ color: "#fff", marginX: 1 }}
                className={styles.capitalize}
              >
                Blog
              </Button>
              <Button
                color="inherit"
                onClick={handleContactUs}
                sx={{ color: "#fff", marginX: 1 }}
                className={styles.capitalize}
              >
                Contact
              </Button>

              {session ? (
                <>
                 <Button
                color="inherit"
                onClick={handleSignIn}
                sx={{ color: "#fff", marginX: 1 }}
                className={styles.capitalize}
              >
                Subscribe
              </Button>
                  <Button
                    color="inherit"
                    onClick={handleMyAccount}
                    sx={{ color: "#fff", marginX: 1 }}
                    className={styles.capitalize}
                  >
                    My Account
                  </Button>
                  <Button
                    color="inherit"
                    onClick={handleSignOut}
                    sx={{ color: "#fff", marginX: 1 }}
                    className={styles.capitalize}
                  >
                    Log Out
                  </Button>
                </>
              ) : (
                <Button
                  color="inherit"
                  onClick={handleSignIn}
                  sx={{ color: "#fff", marginX: 1 }}
                  className={styles.capitalize}
                >
                  Memeber Area
                </Button>
               
              )}
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
         {session ? 
          [
            <MenuItem key="blog" onClick={handleBlog}>Blog</MenuItem>,
            <MenuItem key="contact" onClick={handleContactUs}>Contact Us</MenuItem>,
            <MenuItem key="account" onClick={handleMyAccount}>My Account</MenuItem>,
            <MenuItem key="logout" onClick={handleSignOut}>Logout</MenuItem>
          ] :  (
          <MenuItem onClick={handleSignIn}>Memeber Area</MenuItem>
        )}
      </Menu>
    </>
  );
}

export default Navbar;
