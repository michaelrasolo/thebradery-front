import styles from "../styles/Navbar.module.css";
import SideMenu from "./SideMenu";
import { useState } from "react";
import Menu from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useSelector } from "react-redux";
import Link from "next/link";

function Navbar() {
  const [menuState, setMenuState] = useState(false);
const cart = useSelector((state)=> state.cart.value.items)
const cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  const toggleDrawer = (open) => {
    setMenuState(open);
  };

  return (
    <header className={styles.navbarContainer}>
      <nav>
        <IconButton onClick={() => toggleDrawer(true)}>
          <Menu sx={{ m: 1, b: 1, color: "#335C67", fontSize: 32 }} />
        </IconButton>

        <SideMenu open={menuState} onClose={() => toggleDrawer(false)} />
      </nav>

      <div className={styles.logoBox}>
        <h1 className={styles.logo}>
         The Fripery 
        </h1>
      </div>
      <Link href="/cart">
      <button className={styles.cart}><ShoppingBagIcon style={{ color: "#335C67", fontSize: 38}}/><span style={{ position: "absolute", top: "58%", left: "50%", transform: "translate(-50%, -50%)", color: "white", fontSize: 12}}>{cartQuantity}</span></button>
      </Link>
    </header>
  );
}

export default Navbar;
