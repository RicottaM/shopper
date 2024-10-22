// src/hooks/useBluetoothService.ts

import { useState, useEffect, useRef } from 'react';
import { Platform, PermissionsAndroid } from 'react-native';
import { ScannedDevice } from '../types/ScannedDevice';
import bleManager from '../BleManagerInstance';
import { FINGERPRINTS } from '../fingerprints';
import { BEACON_POSITIONS } from '../constants';

export function useBluetoothService() {
    const [devices, setDevices] = useState<ScannedDevice[]>([]);
    const [isScanning, setIsScanning] = useState<boolean>(false);
    const [fingerprintPosition, setFingerprintPosition] = useState<{ x: number; y: number } | null>(null);
    const deviceSetRef = useRef<Set<string>>(new Set());
    const scanIntervalRef = useRef<NodeJS.Timeout | null>(null);

    const performKNN = (
        currentRSSI: { [beaconId: string]: number },
        k: number = 3
    ): { x: number; y: number } | null => {
        console.log('Current RSSI:', currentRSSI); // Logowanie aktualnych RSSI

        // Przygotuj wektor cech z aktualnych RSSI
        const beaconIds = Object.keys(FINGERPRINTS[0].rssiValues);
        const currentFeatures: number[] = beaconIds.map(beaconId => currentRSSI[beaconId] || -100);

        console.log('Current Features for KNN:', currentFeatures); // Logowanie cech dla KNN

        // Oblicz odległość euklidesową między currentFeatures a każdym fingerprint
        const distances: { entry: typeof FINGERPRINTS[0]; distance: number }[] = FINGERPRINTS.map(entry => {
            const entryFeatures: number[] = beaconIds.map(beaconId => entry.rssiValues[beaconId] || -100);
            let distance = 0;
            for (let i = 0; i < currentFeatures.length; i++) {
                distance += Math.pow(currentFeatures[i] - entryFeatures[i], 2);
            }
            distance = Math.sqrt(distance);
            return { entry, distance };
        });

        console.log('Distances:', distances); // Logowanie odległości

        // Posortuj według odległości
        distances.sort((a, b) => a.distance - b.distance);

        // Wybierz k najbliższych sąsiadów
        const neighbors = distances.slice(0, k);

        console.log('Neighbors:', neighbors); // Logowanie sąsiadów

        if (neighbors.length === 0) return null;

        // Oblicz średnią pozycji z k najbliższych sąsiadów
        const avgPosition = neighbors.reduce(
            (acc, neighbor) => {
                acc.x += neighbor.entry.position.x;
                acc.y += neighbor.entry.position.y;
                return acc;
            },
            { x: 0, y: 0 }
        );

        avgPosition.x /= neighbors.length;
        avgPosition.y /= neighbors.length;

        console.log('Average Position:', avgPosition); // Logowanie średniej pozycji

        return { x: avgPosition.x, y: avgPosition.y };
    };

    const scanDevices = async () => {
        if (isScanning) {
            // Zatrzymaj skanowanie
            bleManager.stopDeviceScan();
            if (scanIntervalRef.current) {
                clearInterval(scanIntervalRef.current);
                scanIntervalRef.current = null;
            }
            setIsScanning(false);
        } else {
            // Rozpocznij skanowanie
            // Sprawdź uprawnienia na Androidzie
            if (Platform.OS === 'android' && Platform.Version >= 23) {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: 'Location Permission',
                        message: 'Bluetooth Low Energy requires Location permission',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    },
                );
                if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                    console.log('Location permission denied');
                    return;
                }
            }

            setDevices([]);
            deviceSetRef.current.clear();

            bleManager.startDeviceScan(null, null, (error, scannedDevice) => {
                if (error) {
                    console.error('Device scan error:', error);
                    return;
                }

                if (scannedDevice) {
                    const beaconData = BEACON_POSITIONS[scannedDevice.id];
                    if (beaconData) {
                        const beaconId = beaconData.id;
                        const uuid = scannedDevice.id;

                        if (!deviceSetRef.current.has(uuid)) {
                            deviceSetRef.current.add(uuid);
                            setDevices((prevDevices) => [
                                ...prevDevices,
                                { device: scannedDevice, filteredRssi: scannedDevice.rssi ?? 0, id: beaconId },
                            ]);
                        } else {
                            // Aktualizuj RSSI
                            setDevices((prevDevices) =>
                                prevDevices.map((scanned) =>
                                    scanned.device.id === uuid
                                        ? { ...scanned, filteredRssi: scannedDevice.rssi ?? scanned.filteredRssi }
                                        : scanned,
                                ),
                            );
                        }
                    }
                    // Wyłącz logowanie dla nieznanych beaconów
                    // else {
                    //     console.log('Beacon position not found for device:', scannedDevice.id);
                    // }
                }
            });

            scanIntervalRef.current = setInterval(() => {
                setDevices((prevDevices) => {
                    const sortedDevices = [...prevDevices].sort((a, b) => {
                        return (b.filteredRssi ?? 0) - (a.filteredRssi ?? 0);
                    });

                    const topDevices = sortedDevices
                        .filter(device => BEACON_POSITIONS[device.device.id])
                        .slice(0, 3); // Możesz dostosować liczbę beaconów

                    if (topDevices.length >= 1) { // Zmniejszmy warunek do >=1, aby KNN działał z mniejszą ilością beaconów
                        // Przygotuj aktualne RSSI
                        const currentRSSI: { [beaconId: string]: number } = {};
                        topDevices.forEach(device => {
                            currentRSSI[device.id] = device.filteredRssi;
                        });

                        console.log('Scanning RSSI:', currentRSSI); // Logowanie RSSI przed KNN

                        // Wykonaj fingerprinting
                        const fpPosition = performKNN(currentRSSI, 4); // k=3
                        if (fpPosition) {
                            setFingerprintPosition(fpPosition);
                        } else {
                            console.log('KNN did not return a position');
                            setFingerprintPosition(null);
                        }
                    } else {
                        console.log('Not enough beacons for KNN');
                        setFingerprintPosition(null);
                    }

                    return sortedDevices;
                });
            }, 1000);

            setIsScanning(true);
        }
    };

    useEffect(() => {
        return () => {
            // Cleanup przy odmontowaniu komponentu
            if (isScanning) {
                bleManager.stopDeviceScan();
            }
            if (scanIntervalRef.current) {
                clearInterval(scanIntervalRef.current);
                scanIntervalRef.current = null;
            }
        };
    }, []);

    return {
        devices,
        isScanning,
        scanDevices,
        fingerprintPosition,
    };
}
