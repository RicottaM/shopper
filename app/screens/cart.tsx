import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  Feather,
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
} from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import { CartItem } from "../models/CartItem";
import { Product } from "../models/Product";
import { Unit } from "../models/Unit";

export default function Cart() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);
  const router = useRouter();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  useEffect(() => {
    const setCartItemsByCart = async (cartId: number = 1) => {
      try {
        const response = await fetch(`http://localhost:3000/cart-items`);
        const data = await response.json();
        const userCartItems = data.filter(
          (cartItem: CartItem) => cartItem.cart_id === cartId
        );

        setCartItems(userCartItems);
      } catch (error) {
        console.error("Błąd podczas pobierania produktów z koszyka:", error);
      }
    };

    const fetchUnits = async () => {
      try {
        const response = await fetch(`http://localhost:3000/units`);
        const data = await response.json();
        setUnits(data);
      } catch (error) {
        console.error("Błąd podczas pobierania jednostek:", error);
      }
    };

    fetchUnits();
    setCartItemsByCart();
  }, []);

  useEffect(() => {
    const setProductsByCart = async () => {
      try {
        const response = await fetch(`http://localhost:3000/products`);
        const data = await response.json();

        const filteredCartProducts: Product[] = cartItems.map(
          (cartItem: CartItem) => {
            return data.find(
              (product: Product) => product.product_id === cartItem.product_id
            );
          }
        );

        setCartProducts(filteredCartProducts);
        setFilteredProducts(filteredCartProducts);
      } catch (error) {
        console.error("Błąd podczas pobierania produktów:", error);
      }
    };

    setProductsByCart();
  }, [cartItems]);

  const handleSearch = (text: string) => {
    setSearchQuery(text);

    const filteredData = cartProducts.filter((product: Product) =>
      product.name.toLowerCase().includes(text.toLowerCase())
    );

    setFilteredProducts(filteredData);
  };

  const removeFromCart = async (product: Product): Promise<void> => {
    try {
      const cartItemToRemove = cartItems.find(
        (cartItem: CartItem) => cartItem.product_id === product.product_id
      );

      if (cartItemToRemove) {
        const response = await fetch(
          `http://localhost:3000/cart-items/${cartItemToRemove.cart_item_id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          const updatedCartItems = cartItems.filter(
            (item: CartItem) =>
              item.cart_item_id !== cartItemToRemove.cart_item_id
          );
          setCartItems(updatedCartItems);

          const updatedCartProducts = cartProducts.filter(
            (p: Product) => p.product_id !== product.product_id
          );

          setCartProducts(updatedCartProducts);
          setFilteredProducts(updatedCartProducts);
        } else {
          throw new Error("Błąd podczas usuwania elementu z koszyka");
        }
      }
    } catch (error) {
      console.error("Błąd podczas usuwania produktu:", error);
    }
  };

  const getUnitSymbol = (unitId: number): string => {
    const productUnit = units.find((unit: Unit) => unit.unit_id === unitId);

    return productUnit ? productUnit.unit_symbol : "-";
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search products"
          value={searchQuery}
          onChangeText={handleSearch}
          selectionColor="#013b3d"
        />
        <FontAwesome5
          name="search"
          size={22}
          color="#013b3d"
          style={styles.searchIcon}
        />
      </View>

      <ScrollView contentContainerStyle={styles.gridContainer}>
        {filteredProducts.map((product: Product, index: number) => (
          <View key={index} style={styles.gridItem}>
            <View style={styles.productNameContainer}>
              <Text style={styles.productName}>{product.name}</Text>
            </View>
            <Text style={styles.productText}>
              {product.price + " $ / " + getUnitSymbol(product.unit_id)}
            </Text>
            <Text
              style={styles.productText}
              onPress={() => removeFromCart(product)}
            >
              <Feather
                name="x-square"
                size={26}
                color="#013b3d"
                style={styles.searchIcon}
              />
            </Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.navbar}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.back()}
        >
          <FontAwesome5 name="arrow-circle-left" size={32} color="#013b3d" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.navigate("/")}
        >
          <FontAwesome5 name="home" size={32} color="#013b3d" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          //onPress={() => router.navigate("/screens/navigation")}
        >
          <FontAwesome5 name="flag-checkered" size={32} color="#013b3d" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.navigate("/screens/login")}
        >
          <FontAwesome name="user" size={32} color="#013b3d" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#a0cbb3",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e8fefd",
    width: 330,
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
    marginTop: 80,
    marginHorizontal: 50,
  },
  searchInput: {
    flex: 1,
    fontSize: 20,
    fontWeight: "500",
    color: "#013b3d",
    backgroundColor: "#e8fefd",
    borderWidth: 1,
    borderColor: "#e8fefd",
  },
  searchIcon: {
    marginLeft: 10,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  gridItem: {
    width: 150,
    height: 150,
    margin: 15,
    backgroundColor: "#e8fefd",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  productText: {
    fontSize: 18,
    color: "#013b3d",
    fontWeight: "600",
    padding: 5,
    paddingHorizontal: 15,
    display: "flex",
    textAlign: "center",
    alignItems: "center",
  },
  productNameContainer: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  productName: {
    fontSize: 18,
    color: "#013b3d",
    fontWeight: "600",
    textAlign: "center",
    marginHorizontal: 15,
    marginTop: 10,
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 40,
    paddingBottom: 50,
    paddingTop: 30,
  },
  navButton: {
    alignItems: "center",
    backgroundColor: "#e8fefd",
    marginHorizontal: 15,
    padding: 15,
    borderRadius: 15,
    width: 66,
    height: 62,
  },
});
