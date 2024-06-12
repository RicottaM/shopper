import { Component, NgZone } from "@angular/core";
import { Bluetooth, Peripheral } from "@nativescript-community/ble";

@Component({
  selector: "Bluetooth",
  templateUrl: "./bluetooth.component.html",
  styleUrls: ["./bluetooth.component.css"],
})
export class BluetoothComponent {
  private bluetooth = new Bluetooth();
  public devices: Array<Peripheral> = [];
  private deviceSet = new Set<string>();
  public isScanning: boolean = false;
  private scanInterval: any;
  public sortedDevices: Array<Peripheral> = [];
  private macToNameMapping = {
    "0C:B2:B7:45:BB:B2": "k1",
    "FC:45:C3:A2:F8:6A": "k2",
    "FC:45:C3:91:24:02": "k3",
    "E0:E5:CF:38:7B:FB": "k4",
    "3C:A3:08:0D:16:06": "k5",
    "34:15:13:DF:BF:1F": "k6",
    "88:3F:4A:E9:20:7D": "k7",
  };

  constructor(private zone: NgZone) {}

  // Kalman filter variables
  private rssiMeasurements: { [key: string]: number[] } = {};
  private kalmanState: { [key: string]: number } = {};
  private kalmanCovariance: { [key: string]: number } = {};
  private processNoise = 0.008; // process noise covariance
  private measurementNoise = 1; // measurement noise covariance

  public scanDevices() {
    if (this.isScanning) {
      this.bluetooth.stopScanning();
      clearInterval(this.scanInterval);
    } else {
      this.devices = [];
      this.deviceSet.clear();
      this.sortedDevices = [];

      this.bluetooth.startScanning({
        onDiscovered: (peripheral: Peripheral) => {
          if (peripheral.localName === "HMSoft") {
            if (!this.deviceSet.has(peripheral.UUID)) {
              this.deviceSet.add(peripheral.UUID);
              this.devices.push(peripheral);
            } else {
              let existingDevice = this.devices.find(
                (device) => device.UUID === peripheral.UUID
              );
              if (existingDevice) {
                existingDevice.RSSI = peripheral.RSSI;
              }
            }
            this.applyKalmanFilter(peripheral.UUID, peripheral.RSSI);
          }
        },
      });

      this.scanInterval = setInterval(() => {
        this.zone.run(() => {
          this.devices.sort((a, b) => b.RSSI - a.RSSI); // Sort devices by filtered RSSI

          if (this.devices.length >= 1) {
            this.sortedDevices = [this.devices[0]]; // Take the first device only
          }
        });
      }, 500);
    }
    this.isScanning = !this.isScanning;
  }

  // Kalman filter implementation
  private applyKalmanFilter(uuid: string, rssi: number) {
    if (!this.kalmanState[uuid]) {
      // Initialize Kalman filter state and covariance if not already present
      this.kalmanState[uuid] = rssi;
      this.kalmanCovariance[uuid] = 1;
      this.rssiMeasurements[uuid] = [];
    }

    // Add new RSSI measurement to history
    this.rssiMeasurements[uuid].push(rssi);

    // Prediction step
    let predictedState = this.kalmanState[uuid];
    let predictedCovariance = this.kalmanCovariance[uuid] + this.processNoise;

    // Measurement update step
    let kalmanGain =
      predictedCovariance / (predictedCovariance + this.measurementNoise);
    let updatedState = predictedState + kalmanGain * (rssi - predictedState);
    let updatedCovariance = (1 - kalmanGain) * predictedCovariance;

    // Update the Kalman filter state and covariance
    this.kalmanState[uuid] = updatedState;
    this.kalmanCovariance[uuid] = updatedCovariance;

    // Update RSSI value in the devices array with the filtered value
    let device = this.devices.find((device) => device.UUID === uuid);
    if (device) {
      device.RSSI = updatedState;
    }
  }
}
