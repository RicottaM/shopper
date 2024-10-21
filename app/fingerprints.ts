interface FingerprintEntry {
    position: { x: number; y: number };
    rssiValues: { [beaconId: string]: number }; // Średnie wartości RSSI dla każdego beacona
}

export const FINGERPRINTS: FingerprintEntry[] = [
    {
        position: { x: 50, y: 100 },
        rssiValues: {
            'id1': -70,
            'id2': -75,
            'id3': -80,
            'id5': -65,
            'id7': -85,
        },
    },
    {
        position: { x: 150, y: 200 },
        rssiValues: {
            'id1': -65,
            'id2': -60,
            'id3': -85,
            'id5': -70,
            'id7': -80,
        },
    },
    // Dodaj pozostałe punkty pomiarowe
];
