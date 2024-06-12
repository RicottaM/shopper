import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "@nativescript/angular";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BluetoothComponent } from "./components/bluetooth/bluetooth.component";
import { HomeComponent } from "./views/home/home.component";
import { CategoriesComponent } from "./views/categories/categories.component";
import { ProductsComponent } from "./views/products/products.component";
import { CartComponent } from "./views/cart/cart.component";
import { MapComponent } from "./views/map/map.component";
import { StoreGridComponent } from "./components/store-grid/store-grid.component";

@NgModule({
  bootstrap: [AppComponent],
  imports: [NativeScriptModule, AppRoutingModule],
  declarations: [
    AppComponent,
    BluetoothComponent,
    HomeComponent,
    CategoriesComponent,
    ProductsComponent,
    CartComponent,
    MapComponent,
    StoreGridComponent,
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
