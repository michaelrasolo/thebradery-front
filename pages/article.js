import React, { useEffect } from "react";
import styles from "../styles/Article.module.css";
import MainButton from "../components/MainButton";
import { useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { addProduct } from "../reducers/cart";
import CircularProgress from "@mui/material/CircularProgress";

function article() {
  const router = useRouter();
  const dispatch = useDispatch();
  const item = useSelector((state) => state.item.value.selectedItem);
  const cart = useSelector((state) => state.cart.value);

  const [toCart,setToCart] = useState(false);
  
  // Quantity management
  const [quantity, setQuantity] = useState(0);
  const incrementQuantity = () => {
    console.log(cart);
    if (quantity < item.inventory) {
      setQuantity(quantity + 1);
    }
  };
  const decrementQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  async function addToCart() {
    // Add product price and quantity to the cart reducer
    const { productId, price, name } = item;
    await dispatch(addProduct({ productId, quantity, price, name }));
    // Route app to cart
    setToCart(true);
    setTimeout(() => {
      router.push("/cart"); 
    }, 1000);
  }

  // Redirection if product selection error
  useEffect(() => {
    if (item.name == null) {
      router.push("/");
    } 
  }, [item.name, router]);

  return (
    <main>
      <div className={styles.articleContainer}>
        <div className={styles.itemHeader}>
          <img src={item.image} alt={item.name} className={styles.itemPic} />
          <div className={styles.itemInfoContainer}>
            <div className={styles.itemInfo}>
              <div className={styles.itemTitles}>
                <h2 className={styles.h2}>{item.name}</h2>
              </div>
              <h2 className={styles.h3} style={{ marginLeft: "2vw" }}>
                {item.price}€
              </h2>
            </div>
            <div>
              <div className={styles.counter}>
                <button
                  className={styles.counterBtn}
                  onClick={decrementQuantity}
                >
                  -
                </button>
                <h2 className={styles.h3}>{quantity}</h2>
                <button
                  className={styles.counterBtn}
                  onClick={incrementQuantity}
                >
                  +
                </button>
              </div>
              <p className={styles.quantity}>
                Quantité disponible: {item.inventory}
              </p>
            </div>
            {toCart ? 
            (<MainButton
              text={<CircularProgress style={{ color: "#ffffff", width:"20px", height:"20px"}} />}
              color="green"
              width="90%"
              caption="Add to cart"
              onClick={() => addToCart()}
            />):
            (<MainButton
              text={<>{" Ajouter au panier"}</>}
              color="green"
              width="90%"
              caption="Add to cart"
              onClick={() => addToCart()}
            />)
            }
          </div>
        </div>
      </div>
    </main>
  );
}

export default article;
