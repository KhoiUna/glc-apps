import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import FoodBankOutlinedIcon from "@mui/icons-material/FoodBankOutlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { appBarTheme } from "../themes/themes";
import Link from "next/link";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

export default function Header({
  headerText,
  username,
}: {
  headerText: string;
  username: string;
}) {
  const menuArray = [
    {
      title: `Logged in as ${username}`,
      icon: <ArrowRightAltIcon />,
      href: "",
    },
    { title: "Cooking", icon: <FoodBankOutlinedIcon />, href: "/" },
    { title: "Events", icon: <EventOutlinedIcon />, href: "/events" },
    { title: "Log out", icon: <LogoutIcon />, href: "/api/logout" },
  ];

  const [state, setState] = useState({
    top: false,
  });

  const anchor = "top";
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {menuArray.map((item, index) => (
          <Link href={item.href} key={index}>
            <ListItem button>
              <ListItemIcon>{item.icon}</ListItemIcon>

              <ListItemText primary={item.title} />
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={appBarTheme}>
          {headerText !== "Login" && (
            <>
              <Drawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
              >
                {list(anchor)}
              </Drawer>

              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={toggleDrawer(anchor, true)}
              >
                <MenuIcon />
              </IconButton>
            </>
          )}

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {headerText}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
