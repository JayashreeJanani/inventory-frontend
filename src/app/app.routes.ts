import { Routes } from '@angular/router';
import { InventoryListComponent } from './components/inventory-list/inventory-list.component';
import { ProductInventoryComponent } from './components/product-inventory/product-inventory.component';
export const routes: Routes = [
  { path: '', redirectTo: '/inventory', pathMatch: 'full' },
  { path: 'inventory', component: InventoryListComponent },
  { path: 'product/:stockCode', component: ProductInventoryComponent }
];
