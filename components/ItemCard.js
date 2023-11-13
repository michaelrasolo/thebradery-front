import React from "react";
import styles from "../styles/ItemCard.module.css";

function ItemCard(props) {
  return (

      <div className={styles.cardContainer} onClick={props.onClick}>

      <div className={styles.picContainer}>
      <img className={styles.itemPic} src={props.image} alt={props.itemName} />
      </div>
      <div className={styles.descContainer}>
        <h3 className={styles.title}>{props.itemName}</h3>
        <div className={styles.itemDetails}>
          <h3 className={styles.price}>{props.price}€</h3>
        </div>
      </div>
            </div>
  );
}

export default ItemCard;
