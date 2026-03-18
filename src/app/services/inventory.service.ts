import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 export interface InventoryItem {
  StockCode: string;
  WarehouseID: string;
  Description: string;
  CurrentStock: number;
  AveragePrice: number;
  LastUpdated?: string;
  Country?: string;
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
}
