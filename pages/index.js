import ItemCard from "../components/ItemCard";
import styles from "../styles/Index.module.css";
import CategoryButtons from "../components/CategoryButtons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectItem } from "../reducers/item";
import { useRouter } from "next/router";
import Link from "next/link";
import CircularProgress from "@mui/material/CircularProgress";
import backend from "../config";

function Index() {
  const router = useRouter();
  const dispatch = useDispatch();
  const selectedItem = useSelector((state) => state.item.value);
  const [category, setCategory] = useState("");
  const [itemList, setItemList] = useState([]);
  const [loading, setLoading] = useState(true);

  // FUNCTION FETCH ITEMS (BY CATEGORY IF NECESSARY)
  const fetchItems = () => {
    // Your fetch code to get items based on the selected category
    fetch(`http://localhost:5050/products/${category}`)
      .then((response) => response.json())
      .then((item) => {
        // console.log(item);
        setItemList(item.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
        setLoading(false);
      });
  };

  // USE EFFECT INITIALISATION AND CATEGORY CHANGE
  useEffect(() => {
    fetchItems(); // Initial fetch when the component mounts
    // console.log(itemList);
    const handleRouteChange = (url) => {
      // If navigation to the Index page
      if (url === router.asPath) {
        // Perform the re-fetch of items
        fetchItems();
      }
    };

    //
    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [category]);

  // Select a category
  const handleCategory = (value) => {
    if (value === "Tous les produits") {
      setCategory("");
    } else {
      setCategory(value);
    }
  };

  // Select article and set the reducer
  async function handleCardPress(item) {
    await dispatch(selectItem(item));
    console.log(("item in reducer:", selectedItem));
  }

  let itemDisplay = null;
  if (itemList.length > 0) {
    itemDisplay = itemList.map((item, i) => (
      <Link href="/article">
        <ItemCard
          key={i}
          price={item.price}
          itemName={item.name}
          image={item.image}
          onClick={() => handleCardPress(item)}
        />
      </Link>
    ));
  }

  return (
    <div className={styles.indexContainer}>
      <div className={styles.banner}></div>
      <CategoryButtons
        onPress={handleCategory}
        categories={[
          "Tous les produits",
          "Hauts",
          "Bas",
          "Chaussures",
          "Accessoires",
        ]}
      />
      {loading ? (
        <div className={styles.indexContainer}>
          <CircularProgress style={{ color: "#335c67", margin: "3vh" }} />
          <p>Chargement des produits</p>
        </div>
      ) : (
        <main className={styles.itemsContainer}>{itemDisplay}</main>
      )}{" "}
    </div>
  );
}

export default Index;
