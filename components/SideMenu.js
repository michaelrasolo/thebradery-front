import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';

import Home from "@mui/icons-material/Home";
import styles from "../styles/Navbar.module.css";
import Link from "next/link";

export default function SideMenu(props) {
  const toggleDrawer = () => {
    props.onClose();
  };

  const list = () => (
    <Box
      sx={{ width: 250, height: "100vh", backgroundColor: "#FEF8F0" }}
      role="presentation"
    >
      <List sx={{ width: 250, textAlign:"center" }}>
        <Link href="/" style={{ textDecoration: "none", color: "#44433e" }}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary={"Accueil"} />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link href="/cart" style={{ textDecoration: "none", color: "#44433e" }}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ShoppingBagOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={"Panier"} />
            </ListItemButton>
          </ListItem>
        </Link>
        
        
      </List>
    </Box>
  );

  return (
    <SwipeableDrawer
      anchor="left"
      open={props.open}
      onClose={props.onClose}
      onOpen={props.onOpen}
      sx={{ marginTop: 200 }}
    >
      <div role="presentation" onClick={toggleDrawer} onKeyDown={toggleDrawer}>
        {list()}
      </div>
    </SwipeableDrawer>
  );
}
