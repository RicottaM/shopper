// src/screens/NavigationScreen.tsx

import React from 'react';
import { View, Text, Button, StyleSheet, Dimensions, Image } from 'react-native';
import { useBluetoothService } from '../hooks/useBluetoothService';

const NavigationScreen = () => {
    const { devices, isScanning, scanDevices, fingerprintPosition } = useBluetoothService();

    // Zakładamy, że mapa ma szerokość 500 cm i wysokość 500 cm
    const mapWidthCm = 500;
    const mapHeightCm = 500;

    // Wymiary ekranu
    const screenWidth = Dimensions.get('window').width - 32; // Padding
    const screenHeight = 300; // Możesz dostosować wysokość mapy

    // Funkcja do konwersji pozycji z cm na piksele
    const convertPositionToPixels = (x: number, y: number) => {
        const scaleX = screenWidth / mapWidthCm;
        const scaleY = screenHeight / mapHeightCm;
        return {
            left: x * scaleX - 10, // -10 aby centrować marker (zakładając 20x20 px marker)
            top: screenHeight - (y * scaleY) - 10, // Odwrócenie osi Y, jeśli mapa ma (0,0) w dolnym lewym
        };
    };

    return (
        <View style={styles.container}>
            <Button title={isScanning ? 'Stop Scanning' : 'Start Scanning'} onPress={scanDevices} />

            {/* Wyświetlamy tylko pozycję z fingerprintingu */}
            <View style={styles.positionContainer}>
                <View style={styles.positionBox}>
                    <Text style={styles.positionTitle}>Fingerprinting (KNN):</Text>
                    {fingerprintPosition ? (
                        <Text style={styles.locationText}>
                            x = {fingerprintPosition.x.toFixed(2)} cm, y = {fingerprintPosition.y.toFixed(2)} cm
                        </Text>
                    ) : (
                        <Text style={styles.locationText}>Obliczanie pozycji...</Text>
                    )}
                </View>
            </View>

            {/* Mapa z markerami */}
            <View style={styles.mapContainer}>
                <Image
                    source={require('../assets/floor_map.png')} // Upewnij się, że ścieżka jest poprawna
                    style={styles.mapImage}
                    resizeMode="cover"
                />
                {/* Marker dla Fingerprinting */}
                {fingerprintPosition && (
                    <View style={[styles.marker, convertPositionToPixels(fingerprintPosition.x, fingerprintPosition.y), { backgroundColor: 'green' }]}>
                        <View style={styles.markerDot} />
                    </View>
                )}
            </View>

            {/* Wyświetlanie listy urządzeń */}
            <View style={styles.deviceListContainer}>
                <Text style={styles.deviceListTitle}>Devices:</Text>
                {devices.map((item) => (
                    <View key={item.device.id} style={styles.deviceItem}>
                        <Text style={styles.deviceName}>{item.device.name ?? 'Unnamed Device'}</Text>
                        <Text>RSSI: {item.filteredRssi.toFixed(2)}</Text>
                        <Text style={{ color: 'gray' }}>ID: {item.id}</Text>
                    </View>
                ))}
            </View>
        </View>
    );

};

export default NavigationScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    positionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    positionBox: {
        flex: 1,
        marginHorizontal: 5,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#f9f9f9',
    },
    positionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    locationText: {
        fontSize: 14,
    },
    mapContainer: {
        width: '100%',
        height: 300,
        position: 'relative',
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    mapImage: {
        width: '100%',
        height: '100%',
    },
    marker: {
        position: 'absolute',
        width: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    markerDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    deviceListContainer: {
        marginTop: 10,
    },
    deviceListTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    deviceItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    deviceName: {
        fontSize: 16,
        fontWeight: '600',
    },
});
