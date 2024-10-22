// src/fingerprints.ts

export interface FingerprintEntry {
    position: { x: number; y: number };
    rssiValues: { [beaconId: string]: number };
}

export const FINGERPRINTS: FingerprintEntry[] = [
    {
        position: { x: 0, y: 0 },
        rssiValues: {
            id1: -76,
            id2: -70,
            id3: -66,
            id5: -68,
            id7: -63,
        },
    },
    {
        position: { x: -69, y: 69 },
        rssiValues: {
            id1: -62,
            id2: -63,
            id3: -67,
            id5: -66,
            id7: -80,
        },
    },
    {
        position: { x: -83, y: -168 },
        rssiValues: {
            id1: -60,
            id2: -75,
            id3: -63,
            id5: -74,
            id7: -62,
        },
    },
    {
        position: { x: 114, y: -130 },
        rssiValues: {
            id1: -67,
            id2: -73,
            id3: -79,
            id5: -62,
            id7: -65,
        },
    },
    {
        position: { x: 114, y: 0 },
        rssiValues: {
            id1: -56,
            id2: -70,
            id3: -77,
            id5: -66,
            id7: -74,
        },
    },
    {
        position: { x: 175, y: -79 },
        rssiValues: {
            id1: -69,
            id2: -65,
            id3: -67,
            id5: -57,
            id7: -72,
        },
    },
    {
        position: { x: 138, y: -30 },
        rssiValues: {
            id1: -60,
            id2: -68,
            id3: -77,
            id5: -58,
            id7: -64,
        },
    },
    {
        position: { x: 158, y: 125 },
        rssiValues: {
            id1: -65,
            id2: -57,
            id3: -63,
            id5: -62,
            id7: -74,
        },
    },
    {
        position: { x: 251, y: 127 },
        rssiValues: {
            id1: -67,
            id2: -56,
            id3: -80,
            id5: -72,
            id7: -76,
        },
    },
];