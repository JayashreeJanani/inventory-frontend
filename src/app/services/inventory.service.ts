import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//This interface is used for 3 API endpoints: 
// 1. GET/api/inventory, 
// 2. GET/api/inventory/"stock_code", 
// 3. GET/api/inventory/"stock_code"/"warehouse_id"
 export interface InventoryItem {
  StockCode: string;
  WarehouseID: string;
  Description: string;
  CurrentStock: number;
  AveragePrice: number;
  LastUpdated?: string;
  Country?: string;
 }

export interface InventoryTransaction {
  stockCode: string;
  TransactionKey: string;
  WarehouseID: string;
  Invoice: string;
  CustomerID: string;
  InvoiceDate: string;
  Quantity: number;
  Price: number;
  Country: string;
  Description: string;
}

//This interface is used for the API endpoint: GET/api/dashboard/summary
export interface DashboardSummary {
  totalProducts: number;
  totalStock: number;
  uniqueWarehouses: number;
  totalTransactions: number;
}

//This interface is used for the API enpoint:/GET/api/dashboard/transaction-trend
export interface TransactionTrend {
  period: string;
  count: number;
}

//This interface for Top Products chart
export interface TopProducts{
  StockCode: string;
  Description: string;
  totalQuantity:number;
}

//This is for Forecast 
// export interface ForecastData{
//   stockCode: string;
//   predictedDemand: number;
//   forecastWindowDays: number;
// }

// export interface ForecastResponse{
//   success: boolean;
//   data: ForecastData;
// }
export interface ReorderData{
    stockCode: string;
    WarehouseID: string;
    currentStock: number;
    predictedDemand: number;
    safetyStock: number;
    recommendedReorderQty: number;
    lowStockAlert: boolean;
}

export interface ReorderResponse{
  success: boolean;
  data: ReorderData;
}

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private apiUrl = 'http://127.0.0.1:8000/api/inventory'; // API: GET/api/inventory
  constructor( private http: HttpClient) {}

  getInventoryItems(): Observable<InventoryItem[]> {
    return this.http.get<InventoryItem[]>(this.apiUrl);
  }//This is for the api: GET/api/inventory

  getInventoryByStockCode(stockCode: string): Observable<InventoryItem[]> {
    return this.http.get<InventoryItem[]>(`${this.apiUrl}/${stockCode}`);
  }//This is for the api: GET/api/inventory/"stock_code"

  getInventoryByStockCodeAndWarehouse(stockCode: string, warehouseId: string): Observable<InventoryItem>{
    return this.http.get<InventoryItem>(`${this.apiUrl}/${stockCode}/${warehouseId}`);
  }//This is for the api: GET/api/inventory/"stock_code"/"warehouse_id"

  getTransactionsByStockCode(stockCode: string): Observable<InventoryTransaction[]> {
    return this.http.get<InventoryTransaction[]>(`http://127.0.0.1:8000/api/transactions/${stockCode}`);
  }//This is for the api: GET/api/inventory/"stock_code"/transactions

  getDashboardSummary(): Observable<DashboardSummary> {
  return this.http.get<DashboardSummary>('http://127.0.0.1:8000/api/dashboard/summary');
}//This is for the api: GET/api/dashboard/summary

  getTransactionTrend(): Observable<TransactionTrend[]> {
    return this.http.get<TransactionTrend[]>(
      'http://127.0.0.1:8000/api/dashboard/transaction-trend'
    );
  }//This is for the api: GET/api/dashboard/transaction-trend

  getTopProducts(): Observable<TopProducts[]> {
    return this.http.get<TopProducts[]>('http://127.0.0.1:8000/api/dashboard/top-products');
  }//This is for the api: GET/api/dashboard/top-products

  getReorderRecommendation(stockCode:string, warehouseId: string){
    return this.http.get<ReorderResponse>(`http://127.0.0.1:8000/api/reorder/${stockCode}/${warehouseId}`);
  }

}
