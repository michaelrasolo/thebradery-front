import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import styles from "../styles/Modal.module.css";
import MainButton from "./MainButton";
import CircularProgress from "@mui/material/CircularProgress";
import { useState, useEffect } from "react";
import { useRouter } from "next/router"; // Import the useRouter hook
import { useSelector } from "react-redux";

export default function UnbookModal(props) {
  const router = useRouter(); // Get the useRouter instance
  const [email, setEmail] = useState("");
  const [resaCanceled, setResaCanceled] = useState(false);
  const itemId = useSelector((state)=> state.item.value.selectedItem._id);
  const emailPattern = "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}";
  const [error, setError] = useState(false);

  const handleConfirm = () => {
    // Check if the email has a valid format using a regular expression
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.match(emailPattern) || !email) {
      setError(true);
      return; // Stop if the email format is invalid
    }

    // API call if checks are passed
    fetch("https://listopia-backend.vercel.app/items/unbook", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _id: itemId,
        email,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log("réponse du back: ", response.result);
        if (response.result == false) {
          setError(true);
          return;
        }
        setResaCanceled(true);
      })
      .catch((error) =>
        console.error("Erreur lors de la requête PUT :", error)
      );
  };

  // Redirect to index if unbooking is done
  useEffect(() => {
    if (resaCanceled) {
      setTimeout(() => {
        router.push("/");
      }, 1500);
    }
  }, [resaCanceled]);
  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {resaCanceled == false ? (
          <Box className={styles.modal}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Annuler ma réservation du cadeau{" "}
            </Typography>

            <form className={styles.form}>
              <label className={styles.label} for="email">
                Votre email
              </label>
              <input
                className={`${styles.input} ${
                  error && !email.match(emailPattern) && styles.errorBorder
                }`}
                placeholder="bubulle@baby.com"
                type="email"
                id="email"
                required
                pattern={emailPattern}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className={error ? styles.error : styles.noerror}>
                L'email saisi ne correspond pas à la réservation</p>
              <p style={{ marginTop: "1rem", fontSize:"0.75rem" }}>
                J'annule ma réservation de ce cadeau, et le rends à nouveau
                disponible dans la liste de naissance.
              </p>
            </form>
            <MainButton
              color="green"
              width="160px"
              text="Valider"
              onClick={handleConfirm}
            />
          </Box>
        ) : (
          <Box className={styles.modal} style={{ justifyContent: "center" }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
Annulation confirmée            </Typography>
            <p style={{ textAlign: "center", width: "100%" }}>
              Vous allez être redirigé vers la page d'accueil...
            </p>
            <CircularProgress style={{ color: "#335c67", margin: "3vh" }} />
          </Box>
        )}
      </Modal>
    </div>
  );
}
