import React from "react";
import styles from "../styles/Cart.module.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from '@mui/material/Divider';
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { useDispatch, useSelector } from "react-redux";
import MainButton from "../components/MainButton";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { removeProduct } from "../reducers/cart";

import BookingModal from "../components/BookingModal";
function cart() {
  const router = useRouter();
  const cart = useSelector((state) => state.cart.value);
const [payment, setPayment] = useState(false)
const dispatch = useDispatch();

async function deleteCartLine(item) {
  const {productId} = item
   dispatch(removeProduct({ productId }));
};


const goShopping = () => {
  router.push("/")}
  return (
    <section className={styles.cartBox}>
      <h3>Votre Panier</h3>
      <List sx={{ width: "100vw", textAlign: "center" }}>
     {/* Headers */}
     <ListItem >
            <ListItemText primary={"Articles"} sx={{ width: "40vw", minWidth: "75px" }} />
            <ListItemText primary={"Prix"} sx={{ width: "10vw", minWidth: "75px" }} />
            <ListItemText primary={"Quantité"} sx={{ width: "10vw", minWidth: "75px" }} />
            <ListItemText primary={"Total"} sx={{ width: "10vw", minWidth: "75px" }} />
            <div className={styles.deleteBtn}></div>
          </ListItem>
        
            <Divider variant="middle"/>
        {/* Items */}
        {cart.items.map((item) => (
          <ListItem key={item.productId}>
            <ListItemText primary={item.name} sx={{ width: "40vw", minWidth: "75px" }} />
            <ListItemText primary={item.price} sx={{ width: "10vw", minWidth: "75px" }} />
            <ListItemText primary={item.quantity} sx={{ width: "10vw", minWidth: "75px" }} />
            <ListItemText primary={item.quantity * item.price} sx={{ width: "10vw", minWidth: "75px" }} />
            <button
              className={styles.deleteBtn}
              onClick={() => deleteCartLine(item)}
            >
              <DeleteForeverOutlinedIcon sx={{ fontSize: "24px", textAlign: "center" }} />
            </button>
          </ListItem>
        ))}
        
        {/* Total line */}
            <Divider variant="middle"/>
        <ListItem>
            <ListItemText primary={""} sx={{width: "40vw", minWidth: "75px"}}/>
            <ListItemText primary={""} sx={{width: "10vw", minWidth: "75px"}}/>
            <ListItemText primary={"Prix total"} sx={{width: "10vw", minWidth: "75px", fontWeight:"700"}}/>
            <ListItemText primary={cart.total_price.toFixed(2)} sx={{width: "10vw", minWidth: "75px", fontWeight:"700"}}/>
            <div className={styles.deleteBtn}></div>
        </ListItem>
      </List>
      <MainButton
              text={<>{"Payer"}</>}
              color="green"
              width="70%"
              caption="Go to payment"
              onClick={() => setPayment(true)}
            />
      <MainButton
              text={<>{"Continuer le shopping"}</>}
              color="transparent"
              width="70%"
              caption="Back to shopping list"
              onClick={() => goShopping()}
            />
            <BookingModal
        open={payment}
        onClose={() => setPayment(false)}
      />
    </section>
  );
}

export default cart;
