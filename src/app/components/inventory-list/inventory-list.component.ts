import { Component, OnInit } from '@angular/core';
import { InventoryService, InventoryItem } from '../../services/inventory.service';
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
      },
      error: (err) => {
        console.error('Error fetching inventory:', err);
        this.error = 'Failed to load inventory';
        this.loading = false;
      }
    });
  }
}
