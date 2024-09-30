import React, { useState, useLayoutEffect, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation, useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { Screens } from '../enum/screens';
import { Image } from 'react-native';
import { useGetAppData } from '../hooks/useGetAppData';
import { useHandleRouteChange } from '../hooks/useHandleRouteChange';

export default function User() {
  const [username, setUsername] = useState('');
  const router = useRouter();
  const navigation = useNavigation();

  const getAppData = useGetAppData();
  const handleRouteChange = useHandleRouteChange();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  useEffect(() => {
    (async () => {
      const username = await getAppData('username');

      setUsername(username);
    })();
  }, []);

  async function handleLogout() {
    await deleteUserData();
    await logoutUser();

    router.push('/');
  }

  const logoutUser = async () => {
    await fetch('http://localhost:3000/auth/logout');
  };

  const deleteUserData = async () => {
    await SecureStore.deleteItemAsync('username');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.userName}>Hi, {username}!</Text>
        <TouchableOpacity style={styles.logOutContainer} onPress={() => handleLogout()}>
          <Text style={styles.logOut}>Log out</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navButton} onPress={() => handleRouteChange(Screens.Map)}>
          <FontAwesome5 name="map-marked-alt" size={32} color="#013b3d" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => router.navigate('/')}>
          <FontAwesome5 name="home" size={32} color="#013b3d" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => handleRouteChange(Screens.Cart)}>
          <FontAwesome5 name="shopping-basket" size={32} color="#013b3d" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => handleRouteChange(Screens.Categories)}>
          <FontAwesome5 name="th-list" size={32} color="#013b3d" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    height: 400,
  },
  userName: {
    color: '#013b3d',
    fontWeight: '500',
    fontSize: 36,
  },
  headerContainer: {
    marginTop: 100,
    marginBottom: 10,
    fontWeight: 'bold',
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    right: 20,
  },
  headerText1: {
    fontSize: 36,
    color: '#013b3d',
    fontWeight: '600',
    letterSpacing: 4,
    top: 20,
  },
  logOutContainer: {
    borderRadius: 15,
    padding: 15,
    backgroundColor: '#e8fefd',
    marginTop: 30,
    justifyContent: 'center',
  },
  logOut: {
    color: '#013b3d',

    fontSize: 24,
    textAlign: 'center',

    fontWeight: '500',
  },
  headerText2: {
    fontSize: 36,
    color: '#e8fefd',
    fontWeight: '600',
    letterSpacing: 4,
    top: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#a0cbb3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: '70%',
    marginTop: 20,
  },
  inputContainer: {
    backgroundColor: '#e8fefd',
    borderRadius: 15,
    paddingTop: 15,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  input: {
    fontSize: 20,
    marginBottom: 15,
    color: '#013b3d',
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: '#013b3d',
    padding: 10,
    borderRadius: 15,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '500',
    borderRadius: 10,
    paddingVertical: 5,
  },
  signupText: {
    color: '#013b3d',
    fontWeight: '500',
    fontSize: 16,
    marginTop: 15,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 30,
    paddingBottom: 50,
    paddingTop: 30,
    bottom: -195,
  },
  navButton: {
    alignItems: 'center',
    backgroundColor: '#e8fefd',
    marginHorizontal: 15,
    padding: 15,
    borderRadius: 15,
    width: 66,
    height: 62,
  },
});
