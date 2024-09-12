import React, { useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import { Image } from "react-native";

export default function Categories() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/logo.png")}
        style={styles.logo}
      />

      {/* Formularz logowania */}
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#013b3d"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#013b3d"
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>

      {/* Link do rejestracji */}
      <TouchableOpacity onPress={() => router.push("/")}>
        <Text style={styles.signupText}>Don't have an account? Sign up!</Text>
      </TouchableOpacity>

      {/* Pasek nawigacyjny */}
      <View style={styles.navbar}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.navigate("/screens/map")}
        >
          <FontAwesome5 name="map-marked-alt" size={32} color="#013b3d" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.navigate("/")}
        >
          <FontAwesome5 name="home" size={32} color="#013b3d" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.navigate("/screens/cart")}
        >
          <FontAwesome5 name="shopping-basket" size={32} color="#013b3d" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.push("/screens/categories")}
        >
          <FontAwesome5 name="th-list" size={32} color="#013b3d" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#a0cbb3",
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 115,
    marginTop: 120,
  },
  formContainer: {
    width: "80%",
    marginTop: 20,
  },
  inputContainer: {
    backgroundColor: "#e8fefd",
    borderRadius: 15,
    fontWeight: 900,
  },
  input: {
    height: 55,
    fontSize: 20,
    paddingHorizontal: 10,
    marginBottom: 15,
    color: "#013b3d",
    fontWeight: 900,
  },
  loginButton: {
    backgroundColor: "#013b3d",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  loginButtonText: {
    color: "#ffffff",
    fontSize: 16,
  },
  signupText: {
    color: "#013b3d",
    fontSize: 14,
    marginTop: 10,
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 30,
    paddingBottom: 50,
    paddingTop: 30,
    bottom: -325, // wyliczone na podstawie sumy wysokości
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
