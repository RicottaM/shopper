import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";
import { BluetoothComponent } from "./components/bluetooth/bluetooth.component";
import { HomeComponent } from "./views/home/home.component";
import { CategoriesComponent } from "./views/categories/categories.component";
import { ProductsComponent } from "./views/products/products.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "bluetooth", component: BluetoothComponent },
  { path: "categories", component: CategoriesComponent },
  { path: "products", component: ProductsComponent },
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {}
