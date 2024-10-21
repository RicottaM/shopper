import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRouter } from 'expo-router';
import { CartItem } from '../models/cartItem.model';
import { Product } from '../models/product.model';
import { CartModel } from '../models/cart.model';
import { useGetAppData } from '../hooks/useGetAppData';

export default function Code() {
  const navigation = useNavigation();
  const router = useRouter();

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const getAppData = useGetAppData();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const carts = await fetch(process.env.REACT_APP_API_URL + `/carts`);
        const cartsData = await carts.json();
        const userId = await getAppData('userId');
        const userCart = cartsData.find((cart: CartModel) => cart.user_id === userId);

        if (userCart) {
          const response = await fetch(process.env.REACT_APP_API_URL + `/cart-items`);
          const data = await response.json();
          const userCartItems = data.filter((cartItem: CartItem) => cartItem.cart_id === userCart.cart_id);
          setCartItems(userCartItems);
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    const fetchCartProducts = async () => {
      try {
        const productsResponse = await fetch(process.env.REACT_APP_API_URL + `/products`);
        const productsData = await productsResponse.json();
        const filteredProducts = cartItems.map((cartItem: CartItem) => {
          return productsData.find((product: Product) => product.product_id === cartItem.product_id);
        });

        setCartProducts(filteredProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchCartItems();
    fetchCartProducts();
  }, [cartItems]);

  function getProductsIds() {
    const productIds: number[] = [];

    cartProducts.forEach((cartProduct: Product) => {
      productIds.push(cartProduct.product_id);
    });

    return productIds;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButtonContainer} onPress={() => router.back()}>
        <MaterialIcons name="arrow-back-ios" size={32} color="#013b3d" />
      </TouchableOpacity>
      {cartProducts.length > 0 ? (
        <View style={styles.codeContainer}>
          <View style={styles.codeBorder}>
            <QRCode value={JSON.stringify(getProductsIds())} size={250} />
          </View>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a0cbb3',
  },
  backButtonContainer: {
    marginTop: 100,
    justifyContent: 'center',
    marginLeft: 40,
  },
  codeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: 100,
    flex: 1,
  },
  codeBorder: {
    borderWidth: 5,
    borderColor: '#013b3d',
    padding: 10,
    borderRadius: 10,
  },
});
