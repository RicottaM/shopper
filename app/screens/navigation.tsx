import React, { useLayoutEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { useHandleRouteChange } from '../hooks/useHandleRouteChange';

export default function Navigation() {
  const router = useRouter();
  const navigation = useNavigation();

  const handleRoutePress = useHandleRouteChange();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButtonContainer} onPress={() => router.back()}>
        <MaterialIcons name="arrow-back-ios" size={32} color="#013b3d" />
      </TouchableOpacity>
      {
        // w tym miejscu umieszczany mape wraz ze stores
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#a0cbb3',
  },
  buttonText: {
    fontSize: 24,
    fontWeight: '500',
    color: '#013b3d',
  },
  icon: {
    marginTop: 2,
    marginLeft: 6,
    color: '#013b3d',
  },
  backButtonContainer: {
    marginTop: 100,
    justifyContent: 'center',
    marginLeft: 40,
  },
});
