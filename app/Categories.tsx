import React, { useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRouter } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";

const categories = [
  { id: 1, name: "Garden" },
  { id: 2, name: "Kitchen" },
  { id: 3, name: "Furniture" },
  { id: 4, name: "Lightning" },
  { id: 5, name: "AGD" },
  { id: 6, name: "Bathroom" },
  { id: 7, name: "Electronics" },
  { id: 8, name: "Toys" },
  { id: 9, name: "Clothing" },
  { id: 10, name: "Books" },
  { id: 11, name: "Electricity" },
  { id: 12, name: "Sports" },
  { id: 13, name: "Women" },
  { id: 14, name: "Art" },
  { id: 15, name: "Heating" },
  { id: 16, name: "Beer" },
  { id: 17, name: "Alcohol" },
  { id: 18, name: "Bedroom" },
  { id: 19, name: "Programming" },
  { id: 20, name: "Men" },
];

export default function Categories() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCategories, setFilteredCategories] = useState(categories);
  const router = useRouter();
  const navIconSize = 32;
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const handleSearch = (text: string) => {
    setSearchQuery(text);

    const filteredData = categories.filter((category) =>
      category.name.toLowerCase().includes(text.toLowerCase())
    );

    setFilteredCategories(filteredData);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search categories"
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <FontAwesome5
          name="search"
          size={22}
          color="#013b3d"
          style={styles.searchIcon}
        />
      </View>

      <ScrollView contentContainerStyle={styles.gridContainer}>
        {filteredCategories.map((category) => (
          <View key={category.id} style={styles.gridItem}>
            <Text style={styles.categoryText}>{category.name}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.navbar}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => console.log("Pressed Cart")}
        >
          <FontAwesome5
            name="map-marked-alt"
            size={navIconSize}
            color="#013b3d"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.push("/")}
        >
          <FontAwesome5 name="home" size={navIconSize} color="#013b3d" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => console.log("Pressed Basket")}
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
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
    marginTop: 80,
    marginHorizontal: 30,
  },
  searchInput: {
    flex: 1,
    fontSize: 20,
    fontWeight: "500",
    color: "#013b3d",
    backgroundColor: "#e8fefd",
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
  categoryText: {
    fontSize: 18,
    color: "#013b3d",
    fontWeight: "600",
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
