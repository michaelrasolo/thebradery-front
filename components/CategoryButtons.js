import React from "react";
import { useState } from "react";
import styles from "../styles/Comp.module.css";

function CategoryButtons(props) {
  const categories = props.categories;
  const [selected, setSelected] = useState(null);

  const handleSelection = (value) => {
    setSelected(value);
    props.onPress(value);
  };

  const buttonList = categories.map((category, i) => (
    <button
      key={i}
      onClick={() => handleSelection(category)}
      value={props.value}
      className={`${styles.catButtons} ${
        selected === category ? styles.selected : ""
      }`}
    >
      {category}
    </button>
  ));

  return <div className={styles.catBtnContainer}>{buttonList}</div>;
}

export default CategoryButtons;
