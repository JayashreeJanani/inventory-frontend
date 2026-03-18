import { Routes } from '@angular/router';
import { InventoryListComponent } from './components/inventory-list/inventory-list.component';
import { ProductInventoryComponent } from './components/product-inventory/product-inventory.component';
import { ProductWarehouseDetailComponent } from './components/product-warehouse-detail/product-warehouse-detail.component';
import { TransactionHistoryComponent } from './components/transaction-history/transaction-history.component';



export const routes: Routes = [
  { path: '', redirectTo: '/inventory', pathMatch: 'full' },
  { path: 'inventory', component: InventoryListComponent },
  { path: 'product/:stockCode', component: ProductInventoryComponent },
  { path: 'product/:stockCode/warehouse/:warehouseId', component: ProductWarehouseDetailComponent },
  { path: 'transactions/:stockCode', component: TransactionHistoryComponent}
];
