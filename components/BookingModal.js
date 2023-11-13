import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import styles from "../styles/Modal.module.css";
import MainButton from "./MainButton";
import CircularProgress from "@mui/material/CircularProgress";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { setCustomerInfo, emptyCart } from "../reducers/cart";

export default function BookingModal(props) {
  const router = useRouter();

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [resaConfirmed, setResaConfirmed] = useState(false);

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.value);

  const emailPattern = "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}";

  const [error, setError] = useState(false);

  const handleConfirm = async () => {
    // Check for empty fields
    if (!customerName || !customerEmail) {
      setError(true);
      return; // Stop if empty field
    }

    // Regex for email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!customerEmail.match(emailPattern)) {
      setError(true);
      return; // Stop if the email format is invalid
    }

    // Add name and email to reducer
    const customer = {
      customer_email: customerEmail,
      customer_name: customerName,
    };
    dispatch(setCustomerInfo(customer));

    try {

      // API Call to create order and update inventory
      const response = await fetch("http://localhost:5050/orders/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cart: cart,
        }),
      });
      setResaConfirmed(true);
    } catch (error) {
      console.error("Erreur lors de la requête PUT :", error);
    }
  };

  useEffect(() => {
    if (resaConfirmed) {
      setTimeout(() => {
        router.push("/");
        // dispatch(emptyCart())
      }, 1000);
    }
  }, [resaConfirmed]);

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="Payment"
        aria-describedby="Finalize your order"
      >
        {resaConfirmed == false ? (
          <Box className={styles.modal}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Passer la commande{" "}
            </Typography>

            <form className={styles.form}>
              <label className={styles.label} for="name">
                Nom
              </label>
              <input
                className={`${styles.input} ${
                  error && !customerName && styles.errorBorder
                }`}
                placeholder="Votre nom ici"
                type="text"
                id="name"
                name="name"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
              <label className={styles.label} for="email">
                Email
              </label>
              <input
                className={`${styles.input} ${
                  error &&
                  !customerEmail.match(emailPattern) &&
                  styles.errorBorder
                }`}
                placeholder="your@email.com"
                type="email"
                id="email"
                required
                pattern={emailPattern}
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
              />

              <Accordion sx={{ boxShadow: 0 }}>
                <AccordionSummary
                  sx={{ p: 0 }}
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <p style={{ color: "#335C67" }}>
                    Ajouter une carte de paiement
                  </p>
                </AccordionSummary>
                <AccordionDetails
                  sx={{ display: "flex", flexDirection: "column" }}
                >
                  <input
                    className={`${styles.input}`}
                    placeholder="Numéro de carte"
                    type="text"
                    id="card number"
                    required
                  />
                  <input
                    className={`${styles.input}`}
                    placeholder="Nom sur la carte"
                    type="text"
                    id="holder"
                    required
                  />
                  <input
                    className={`${styles.input}`}
                    placeholder="Date d'expiration"
                    type="text"
                    id="date"
                    required
                  />
                  <input
                    className={`${styles.input}`}
                    placeholder="CCV"
                    type="text"
                    id="security code"
                    required
                  />
                </AccordionDetails>
              </Accordion>
              <p style={{ marginTop: "6px", fontSize: "0.75rem" }}>
                *La carte n'est pas obligatoire pour ce test
              </p>
            </form>
            <MainButton
              color="green"
              width="100%"
              text="Valider le paiement"
              onClick={handleConfirm}
            />
          </Box>
        ) : (
          <Box className={styles.modal} style={{ justifyContent: "center" }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Merci pour votre achat !
            </Typography>
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
