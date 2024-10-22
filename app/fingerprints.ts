// src/fingerprints.ts

export interface FingerprintEntry {
    position: { x: number; y: number };
    rssiValues: { [beaconId: string]: number };
}

export const FINGERPRINTS: FingerprintEntry[] = [
    {
        position: { x: 0, y: 0 },
        rssiValues: {
            id1: -64.15,
            id2: -72.55,
            id3: -61.35,
            id5: -70.45,
            id7: -65.5,
        },
    },
    {
        position: { x: -69, y: 69 },
        rssiValues: {
            id1: -63.3,
            id2: -73.5,
            id3: -56.85,
            id5: -73.75,
            id7: -65.8,
        },
    },
    {
        position: { x: -83, y: -168 },
        rssiValues: {
            id1: -64.9,
            id2: -72.75,
            id3: -65.15,
            id5: -70.15,
            id7: -64.5,
        },
    },
    {
        position: { x: 0, y: -130 },
        rssiValues: {
            id1: -62.75,
            id2: -70.4,
            id3: -68.6,
            id5: -64.75,
            id7: -61.95,
        },
    },
    {
        position: { x: 114, y: 0 },
        rssiValues: {
            id1: -61.15,
            id2: -67.15,
            id3: -73.75,
            id5: -67.95,
            id7: -69.15,
        },
    },
    {
        position: { x: 61, y: -79 },
        rssiValues: {
            id1: -68.35,
            id2: -72.95,
            id3: -69.7,
            id5: -64.3,
            id7: -63.5,
        },
    },
    {
        position: { x: 138, y: -30 },
        rssiValues: {
            id1: -68.6,
            id2: -67.75,
            id3: -75.55,
            id5: -56.8,
            id7: -69.15,
        },
    },
    {
        position: { x: 158, y: 125 },
        rssiValues: {
            id1: -66.05,
            id2: -53.8,
            id3: -76.85,
            id5: -66.4,
            id7: -76.6,
        },
    },
    {
        position: { x: 251, y: 127 },
        rssiValues: {
            id1: -73.0,
            id2: -57.8,
            id3: -76.65,
            id5: -70.85,
            id7: -79.45,
        },
    },
];
