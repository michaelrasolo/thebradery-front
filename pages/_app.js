import "../styles/globals.css";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import item from "../reducers/item";
import cart from "../reducers/cart";
const store = configureStore({
  reducer: { item, cart },
});

function App({ Component, pageProps }) {

  return (
    
    <Provider store={store}>
      <Head>
        <title>Listopia - la wishlist pour les futurs darons</title>
      </Head>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </Provider>
  );
}

export default App;