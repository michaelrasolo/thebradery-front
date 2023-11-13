import React from 'react'
import styles from "../styles/Comp.module.css"
function MainButton(props) {
    const buttonStyle = {
        backgroundColor: props.color === "transparent" ? "transparent" : "#335C67",
        color: props.color === "transparent" ? "#335C67" : "#FEF8F0",
        width: props.width,
        minHeight: `${parseInt(props.width, 10) / 5}px`,

    }
  return (
    <button className={styles.mainBtn} style={buttonStyle} title={props.caption} onClick={props.onClick} >{props.text} </button>
  )
}

export default MainButton