// Mapowanie adresów MAC beaconów na ich współrzędne x, y
export const BEACON_POSITIONS: { [key: string]: { x: number; y: number } } = {
    '0C:B2:B7:45:BB:B2': { x: 82, y: 110 },   // id1
    '88:3F:4A:E9:20:7D': { x: 89, y: -160 },  // id7
    'FC:45:C3:91:24:02': { x: -86, y: -27 },  // id3
    '3C:A3:08:0D:16:06': { x: 338, y: -33 },  // id5
    'FC:45:C3:A2:F8:6A': { x: 268, y: 250 },  // id2
};


export const BEACON_IDS: { [key: string]: string } = {
    '0C:B2:B7:45:BB:B2': 'id1',
    '88:3F:4A:E9:20:7D': 'id7',
    'FC:45:C3:91:24:02': 'id3',
    '3C:A3:08:0D:16:06': 'id5',
    'FC:45:C3:A2:F8:6A': 'id2',
};