// src/hooks/useBluetoothService.ts

import { useState, useEffect, useRef } from 'react';
import { Platform, PermissionsAndroid } from 'react-native';
import { ScannedDevice } from '../types/ScannedDevice';
import bleManager from '../BleManagerInstance';
import { Matrix, add, multiply, subtract, inv, identity, matrix, transpose } from 'mathjs';
import { BEACON_POSITIONS } from '../constants';
import { BEACON_IDS } from '../constants';

interface PointWithRadius {
    x: number;
    y: number;
    r: number;
}

export function useBluetoothService() {
    const [devices, setDevices] = useState<ScannedDevice[]>([]);
    const [isScanning, setIsScanning] = useState<boolean>(false);
    const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
    const deviceSetRef = useRef<Set<string>>(new Set());
    const scanIntervalRef = useRef<NodeJS.Timeout | null>(null);

    // Stan filtra Kalmana
    const kalmanFilterState = useRef<{
        x: Matrix; // Wektor stanu [x, y]^T
        P: Matrix; // Macierz kowariancji
    }>({
        x: matrix([[0], [0]]) as Matrix,
        P: identity(2) as Matrix,
    });

    const rssiToDistance = (rssi: number, txPower: number = -59, n: number = 4): number => {
        return Math.pow(10, (txPower - rssi) / (10 * n));
    };

    const trilaterate = (
        p1: PointWithRadius,
        p2: PointWithRadius,
        p3: PointWithRadius
    ): { x: number; y: number } | null => {
        const A = 2 * (p2.x - p1.x);
        const B = 2 * (p2.y - p1.y);
        const C =
            p1.r ** 2 -
            p2.r ** 2 -
            p1.x ** 2 +
            p2.x ** 2 -
            p1.y ** 2 +
            p2.y ** 2;
        const D = 2 * (p3.x - p2.x);
        const E = 2 * (p3.y - p2.y);
        const F =
            p2.r ** 2 -
            p3.r ** 2 -
            p2.x ** 2 +
            p3.x ** 2 -
            p2.y ** 2 +
            p3.y ** 2;

        const denominator = A * E - B * D;
        if (denominator === 0) {
            // Brak rozwiązania
            return null;
        }

        const x = (C * E - B * F) / denominator;
        const y = (A * F - C * D) / denominator;

        return { x, y };
    };


    const applyKalmanFilterToPosition = (
        measurement: { x: number; y: number }
    ): { x: number; y: number } => {
        const state = kalmanFilterState.current;

        // Macierz przejścia stanu (A)
        const A = identity(2) as Matrix;
        const H = identity(2) as Matrix; // Macierz obserwacji
        const Q = multiply(identity(2), 0.1) as Matrix; // Szum procesu
        const R = multiply(identity(2), 5) as Matrix;   // Szum pomiaru

        // Predykcja
        const x_pred = multiply(A, state.x) as Matrix;
        const P_pred = add(multiply(multiply(A, state.P), transpose(A)), Q) as Matrix;

        // Pomiar
        const z = matrix([[measurement.x], [measurement.y]]) as Matrix;

        // Innowacja
        const y = subtract(z, multiply(H, x_pred)) as Matrix;
        const S = add(multiply(multiply(H, P_pred), transpose(H)), R) as Matrix;

        // Wzmocnienie Kalmana
        const K = multiply(multiply(P_pred, transpose(H)), inv(S)) as Matrix;

        // Aktualizacja stanu
        const x_updated = add(x_pred, multiply(K, y)) as Matrix;
        const P_updated = multiply(subtract(identity(2), multiply(K, H)), P_pred) as Matrix;

        // Zapisz zaktualizowany stan
        kalmanFilterState.current = {
            x: x_updated,
            P: P_updated,
        };

        // Zwróć estymowaną pozycję
        return {
            x: x_updated.get([0, 0]),
            y: x_updated.get([1, 0]),
        };
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

                if (scannedDevice && BEACON_POSITIONS[scannedDevice.id]) {
                    const uuid = scannedDevice.id;
                    const beaconId = BEACON_IDS[uuid];

                    if (!deviceSetRef.current.has(uuid)) {
                        deviceSetRef.current.add(uuid);
                        setDevices((prevDevices) => [
                            ...prevDevices,
                            { device: scannedDevice, filteredRssi: scannedDevice.rssi ?? 0, id: beaconId }, // Używamy beaconId
                        ]);
                    } else {
                        setDevices((prevDevices) =>
                            prevDevices.map((scanned) =>
                                scanned.device.id === uuid
                                    ? { ...scanned, filteredRssi: scannedDevice.rssi ?? scanned.filteredRssi }
                                    : scanned,
                            ),
                        );
                    }
                }
            });

            scanIntervalRef.current = setInterval(() => {
                setDevices((prevDevices) => {
                    const sortedDevices = [...prevDevices].sort((a, b) => {
                        return (b.filteredRssi ?? 0) - (a.filteredRssi ?? 0);
                    });

                    const topDevices = sortedDevices
                        .filter(device => BEACON_POSITIONS[device.device.id])
                        .slice(0, 3);

                    if (topDevices.length >= 3) {
                        const distances = topDevices.map((device) => {
                            const beaconPosition = BEACON_POSITIONS[device.device.id];
                            const distance = rssiToDistance(device.filteredRssi);
                            return { x: beaconPosition.x, y: beaconPosition.y, r: distance };
                        });

                        const [p1, p2, p3] = distances;

                        const estimatedPosition = trilaterate(p1, p2, p3);

                        if (estimatedPosition) {
                            const filteredPosition = applyKalmanFilterToPosition(estimatedPosition);
                            setPosition(filteredPosition);
                            // Opcjonalnie zaktualizuj positionService
                            // positionService.updateLocation(filteredPosition);
                        }
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
        position,
    };
}