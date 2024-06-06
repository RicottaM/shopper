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

  constructor(private zone: NgZone) {}

  public scanDevices() {
    if (this.isScanning) {
      this.bluetooth.stopScanning();

      clearInterval(this.scanInterval);
    } else {
      this.devices = [];
      this.deviceSet.clear();

      let tempDevices = [];

      this.bluetooth.startScanning({
        onDiscovered: (peripheral: Peripheral) => {
          if (peripheral.name === "HMSoft") {
            if (this.deviceSet.has(peripheral.UUID)) {
              let existingDevice = tempDevices.find(
                (device) => device.UUID === peripheral.UUID
              );

              existingDevice.RSSI = peripheral.RSSI;
            } else {
              tempDevices.push(peripheral);
              this.deviceSet.add(peripheral.UUID);
            }
          }
        },
      });
      this.scanInterval = setInterval(() => {
        this.zone.run(() => {
          this.devices = [...tempDevices];
        });
      }, 500);
    }

    this.isScanning = !this.isScanning;
  }
}
