import { Component, OnInit } from '@angular/core';
import { InventoryService, InventoryItem,ReorderData,ReorderResponse } from '../../services/inventory.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Import RouterModule for routerLink


@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.css'],
  imports: [CommonModule, RouterModule]  // Importing RouterModule to use routerLink in the template
})
export class InventoryListComponent implements OnInit {
  inventoryItems: InventoryItem[] = [];
  loading = false;
  error = '';
  //For Forecast purpose
  reorderMap: {[key: string]: ReorderData} = {};

  constructor(private inventoryService: InventoryService) {}
  
  ngOnInit(): void {
    this.loadInventory();
  }

  loadInventory(): void {
    this.loading = true;
    this.error = '';
    this.inventoryService.getInventoryItems().subscribe({
      next: (data) => {
        this.inventoryItems = data;
        this.loading = false;
        this.loadReorderRecommendations();
      },
      error: (err) => {
        console.error('Error fetching inventory:', err);
        this.error = 'Failed to load inventory';
        this.loading = false;
      }
    });
  }

   //Forecast
  loadReorderRecommendations(): void{
  
    this.inventoryItems.forEach(item=>{
      console.log("Calling reorder API",item.StockCode,item.WarehouseID)
      this.inventoryService
      .getReorderRecommendation(item.StockCode, item.WarehouseID).subscribe({
        next:(response: ReorderResponse) =>{
          console.log("API response:",response);
          if(response.success){
            
            const key = this.getReorderKey(item.StockCode, item.WarehouseID);
            console.log('Reorder key',key);
            console.log("Reorder data:",response);
            
            this.reorderMap[key] =response.data;
            console.log('Reorder[key]',this.reorderMap[key]);
          }
        },

        error:(err) =>{
          console.error("Error in loading reorder recommendation:",err);
        }

      });
    });
  }

  getReorderKey(stockCode: string, warehouseId: string): string {
    return `${stockCode}-${warehouseId}`;
  }

}
