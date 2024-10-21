import React, { useLayoutEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Button, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { useSaveAppData } from '../hooks/useSaveAppData';
import { Store } from '../models/store.model';

export default function Map() {
  const router = useRouter();
  const navigation = useNavigation();
  const saveAppData = useSaveAppData();

  const [selectedStore, setSelectedStore] = useState<Store>();

  // narazie sztywno stad
  const stores: Store[] = [
    { store_id: 1, store_name: 'Castorama', latitude: '52.2297', longitude: '21.0122', city: 'Warsaw' },
    { store_id: 2, store_name: 'Pepco', latitude: '52.237', longitude: '21.0175', city: 'Warsaw' },
    { store_id: 3, store_name: 'Obi', latitude: '52.239', longitude: '21.0155', city: 'Warsaw' },
  ];

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const handleSelectStore = async (storeId: number) => {
    await saveAppData('selectedStoreId', storeId.toString(), 7);
    Alert.alert(`Store has been selected succesfully`);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButtonContainer} onPress={() => router.back()}>
        <MaterialIcons name="arrow-back-ios" size={32} color="#013b3d" />
      </TouchableOpacity>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 52.2297,
          longitude: 21.0122,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {stores.map((store: Store) => (
          <Marker
            key={store.store_id}
            coordinate={{ latitude: parseFloat(store.latitude), longitude: parseFloat(store.longitude) }}
            title={store.store_name}
            onPress={() => setSelectedStore(store)}
          />
        ))}
      </MapView>

      {selectedStore && (
        <View style={styles.storeDetails}>
          <Text style={styles.storeName}>{selectedStore.store_name}</Text>
          <TouchableOpacity style={styles.selectButton} onPress={() => handleSelectStore(selectedStore.store_id)}>
            <Text style={styles.selectButtonText}>Select store</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a0cbb3',
  },
  backButtonContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
  },
  map: {
    flex: 1,
    width: '100%',
  },
  storeDetails: {
    position: 'absolute',
    bottom: 70,
    left: 20,
    right: 20,
    backgroundColor: '#e8fefd',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  storeName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#013b3d',
  },
  selectButton: {
    backgroundColor: '#013b3d',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  selectButtonText: {
    color: '#e8fefd',
    fontSize: 18,
    fontWeight: '600',
  },
});
