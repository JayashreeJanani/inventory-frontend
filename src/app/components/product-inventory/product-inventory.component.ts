import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {RouterLink} from '@angular/router';
import { InventoryService, InventoryItem } from '../../services/inventory.service';
import { Input } from '@angular/core';

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
  
  constructor(
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
      },
      error: (err) => {
        console.error('Error fetching product inventory:', err);
        this.error = 'Failed to load product inventory';
        this.loading = false;
      }
    });
  }
}