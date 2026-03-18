import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { InventoryService, InventoryItem } from '../../services/inventory.service';

@Component({
  selector: 'app-product-warehouse-detail',
  imports: [CommonModule],
  templateUrl: './product-warehouse-detail.component.html',
  styleUrl: './product-warehouse-detail.component.css'
})
export class ProductWarehouseDetailComponent {
  stockCode = '';
  warehouseId = '';
  inventoryItem: InventoryItem | null = null;
  loading = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private inventoryService: InventoryService
  ) {}

  ngOnInit(): void {
  this.stockCode = this.route.snapshot.paramMap.get('stockCode') || '';
  this.warehouseId = this.route.snapshot.paramMap.get('warehouseId') || '';

  console.log('stockCode:', this.stockCode);
  console.log('warehouseId:', this.warehouseId);

  this.loadProductWarehouseDetail();
}

 loadProductWarehouseDetail(): void {
    if (!this.stockCode || !this.warehouseId) {
      this.error = 'Invalid stock code or warehouse ID';
      return;
    }

    this.loading = true;
    this.error = '';

    this.inventoryService
    .getInventoryByStockCodeAndWarehouse(this.stockCode, this.warehouseId)
    .subscribe({
      next: (data: InventoryItem) => {
  console.log('warehouse detail response:', data);
  this.inventoryItem = data;
  this.loading = false;
},
      error: (err) => {
        console.error('Error fetching warehouse detail:', err);
        this.error = 'Failed to load warehouse detail';
        this.loading = false;
      }
    });
  }

}
