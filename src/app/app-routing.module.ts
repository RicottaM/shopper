import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";
import { BluetoothComponent } from "./bluetooth/bluetooth.component";
import { HomeComponent } from "./views/home/home.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "bluetooth", component: BluetoothComponent },
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {}
