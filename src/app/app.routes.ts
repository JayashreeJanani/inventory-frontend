import { Routes } from '@angular/router';
import { InventoryListComponent } from './components/inventory-list/inventory-list.component';
import { ProductInventoryComponent } from './components/product-inventory/product-inventory.component';
import { ProductWarehouseDetailComponent } from './components/product-warehouse-detail/product-warehouse-detail.component';
import { TransactionHistoryComponent } from './components/transaction-history/transaction-history.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { Login } from './components/login/login';
import { authGuard } from './guards/auth-guard';
import { roleGuard } from './guards/role-guard';


export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path:'login',component: Login},
  {path: 'dashboard', component: DashboardComponent, canActivate: [authGuard,roleGuard],data:{roles: ['admin','manager','viewer']}},
  { path: 'inventory', component: InventoryListComponent, canActivate: [authGuard,roleGuard], data:{roles:['admin','manager']}},
  { path: 'product/:stockCode', component: ProductInventoryComponent,canActivate:[authGuard,roleGuard],data:{roles:['admin','manager'] }},
  { path: 'product/:stockCode/warehouse/:warehouseId', component: ProductWarehouseDetailComponent, canActivate:[authGuard,roleGuard],data:{roles:['admin','manager']} },
  { path: 'transactions/:stockCode', component: TransactionHistoryComponent, canActivate:[authGuard,roleGuard],data:{roles:['admin']}}
];
