import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, PermissionsAndroid, Platform } from 'react-native';
import { BleManager, Device } from 'react-native-ble-plx';

export default function Navigation() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [rssiMeasurements, setRssiMeasurements] = useState<{ [key: string]: number[] }>({});
  const [kalmanState, setKalmanState] = useState<{ [key: string]: number }>({});
  const [kalmanCovariance, setKalmanCovariance] = useState<{ [key: string]: number }>({});
  const manager = new BleManager();
  const processNoise = 0.008; // process noise covariance
  const measurementNoise = 1;  // measurement noise covariance

  const macToNameMapping = {
    "0C:B2:B7:45:BB:B2": 1,
    "FC:45:C3:A2:F8:6A": 2,
    "FC:45:C3:91:24:02": 3,
    "E0:E5:CF:38:7B:FB": 4,
    "3C:A3:08:0D:16:06": 5,
    "34:15:13:DF:BF:1F": 6,
    "88:3F:4A:E9:20:7D": 7,
  };

  useEffect(() => {
    const requestPermissions = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          ]);
        } catch (err) {
          console.error('Failed to request permissions', err);
        }
      }
    };

    requestPermissions();
  }, []);

  const startScan = () => {
    setDevices([]);
    setIsScanning(true);
    manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.error(error);
        setIsScanning(false);
        return;
      }
      if (device && device.rssi) {
        applyKalmanFilter(device.id, device.rssi);
        setDevices((prevDevices) => {
          if (!prevDevices.some((d) => d.id === device.id)) {
            return [...prevDevices, device];
          }
          return prevDevices;
        });
      }
    });

    // Stop scanning after 10 seconds
    setTimeout(() => {
      manager.stopDeviceScan();
      setIsScanning(false);
    }, 10000);
  };

  const applyKalmanFilter = (uuid: string, rssi: number) => {
    // Initialize if not present
    if (!kalmanState[uuid]) {
      setKalmanState((prev) => ({ ...prev, [uuid]: rssi }));
      setKalmanCovariance((prev) => ({ ...prev, [uuid]: 1 }));
      setRssiMeasurements((prev) => ({ ...prev, [uuid]: [] }));
    }

    const previousState = kalmanState[uuid] || rssi;
    const previousCovariance = kalmanCovariance[uuid] || 1;
    
    // Prediction step
    const predictedCovariance = previousCovariance + processNoise;
    const kalmanGain = predictedCovariance / (predictedCovariance + measurementNoise);
    const updatedState = previousState + kalmanGain * (rssi - previousState);
    const updatedCovariance = (1 - kalmanGain) * predictedCovariance;

    // Update the state and covariance
    setKalmanState((prev) => ({ ...prev, [uuid]: updatedState }));
    setKalmanCovariance((prev) => ({ ...prev, [uuid]: updatedCovariance }));

    // Update RSSI in the device array
    setDevices((prevDevices) =>
      prevDevices.map((device) =>
        device.id === uuid ? Object.assign(device, { rssi: updatedState }) : device
      )
    );    
  };

  const getDevicePosition = (uuid: string) => {
    return (macToNameMapping as any)[uuid] || 'Unknown Device';
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={startScan} disabled={isScanning}>
        <Text style={styles.buttonText}>{isScanning ? 'Scanning...' : 'Scan for Devices'}</Text>
      </TouchableOpacity>

      <FlatList
        data={devices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.device}>
            <Text style={styles.deviceText}>Name: {item.name || 'Unnamed Device'}</Text>
            <Text style={styles.deviceText}>MAC: {item.id}</Text>
            <Text style={styles.deviceText}>Filtered RSSI: {item.rssi?.toFixed(2)}</Text>
            <Text style={styles.deviceText}>Position: {getDevicePosition(item.id)}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#a0cbb3',
    padding: 20,
  },
  button: {
    backgroundColor: '#e8fefd',
    paddingVertical: 20,
    paddingHorizontal: 24,
    marginTop: 20,
    borderRadius: 25,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: '500',
    color: '#013b3d',
  },
  device: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
  },
  deviceText: {
    fontSize: 16,
    color: '#013b3d',
  },
});
