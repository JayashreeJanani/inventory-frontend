import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {RouterLink} from '@angular/router';
import { InventoryService, InventoryItem, ReorderData,ReorderResponse } from '../../services/inventory.service';
import { Input } from '@angular/core';
import { Auth } from '../../services/auth.service';

@Component({
  selector: 'app-product-inventory',
  standalone: true,
  imports: [CommonModule, RouterLink], // Import RouterLink to use routerLink in the template
  templateUrl: './product-inventory.component.html',
  styleUrl: './product-inventory.component.css'
})
export class ProductInventoryComponent {
  @Input() stockCode = '';
  inventoryItems: InventoryItem[] = [];
  loading = false;
  error = '';
  //For Forecast purpose
  reorderMap: {[key: string]: ReorderData} = {};
  
  constructor(
    public authService: Auth,
    private route: ActivatedRoute,
    private inventoryService: InventoryService
  ) {}

  ngOnInit(): void {
    if(!this.stockCode){
      this.stockCode = this.route.snapshot.paramMap.get('stockCode') || '';
    }
    
    if (this.stockCode) {
    this.loadProductInventory();
    }
  }



  loadProductInventory(): void {
    if (!this.stockCode) {
      this.error = 'Invalid stock code';
      return;
    }

    this.loading = true;
    this.error = '';

    this.inventoryService.getInventoryByStockCode(this.stockCode).subscribe({
      next: (data: InventoryItem[]) => {
        this.inventoryItems = data;
        this.loading = false;
        this.loadReorderRecommendations();
      },
      error: (err) => {
        console.error('Error fetching product inventory:', err);
        this.error = 'Failed to load product inventory';
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
