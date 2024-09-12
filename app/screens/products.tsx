import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";
import { Entypo, Feather, FontAwesome5 } from "@expo/vector-icons";
import { Product } from "../models/Product";
import { Unit } from "../models/Unit";

export default function Products() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [units, setUnits] = useState<Unit[]>([]);
  const { categoryId } = useLocalSearchParams();
  const router = useRouter();
  const navigation = useNavigation();
  const navIconSize = 32;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/products/category/${categoryId}`
        );
        const data = await response.json();

        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Błąd podczas pobierania kategorii:", error);
      }
    };

    const fetchUnits = async () => {
      try {
        const response = await fetch(`http://localhost:3000/units`);
        const data = await response.json();

        setUnits(data);
      } catch (error) {
        console.error("Błąd podczas pobierania kategorii:", error);
      }
    };

    fetchUnits();
    fetchProductsByCategory();
  }, []);

  const handleSearch = (text: string) => {
    setSearchQuery(text);

    const filteredData = products.filter((product: Product) =>
      product.name.toLowerCase().includes(text.toLowerCase())
    );

    setFilteredProducts(filteredData);
  };

  const getUnitSymbol = (unitId: number): string => {
    const productUnit = units.find((unit: Unit) => unit.unit_id === unitId);

    return productUnit ? productUnit.unit_symbol : "-";
  };

  function addToCart(product: Product) {
    const newCartItem = {
      cart_id: 1,
      product_id: product.product_id,
      quantity: 1,
    };

    fetch("http://localhost:3000/cart-items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCartItem),
    })
      .then((response: Response) => {
        if (response.ok) {
          Alert.alert(`"${product.name}" has been added to your cart.`);
        } else {
          throw new Error(
            `Błąd podczas dodawania do koszyka: ${response.statusText}`
          );
        }
      })
      .catch((error) => {
        console.error("Błąd:", error);
      });
  }

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
              <Text style={styles.productText}>{product.name}</Text>
            </View>
            <Text style={styles.productText}>
              {product.price + " $ / " + getUnitSymbol(product.unit_id)}
            </Text>
            <Text style={styles.productText} onPress={() => addToCart(product)}>
              <FontAwesome5
                name="plus-square"
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
          onPress={() => router.push("/screens/categories")}
        >
          <FontAwesome5 name="th-list" size={navIconSize} color="#013b3d" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.push("/")}
        >
          <FontAwesome5 name="home" size={navIconSize} color="#013b3d" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.push("/screens/cart")}
        >
          <FontAwesome5
            name="shopping-basket"
            size={navIconSize}
            color="#013b3d"
          />
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
    alignItems: "center",
    borderRadius: 15,
  },
  productNameContainer: {
    height: 55,
    justifyContent: "center",
    alignItems: "center",
  },
  productText: {
    fontSize: 18,
    color: "#013b3d",
    fontWeight: "600",
    padding: 5,
    paddingHorizontal: 15,
    textAlign: "center",
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
    padding: 15,
    borderRadius: 15,
  },
});
