import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryService, InventoryItem } from '../../services/inventory.service';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  totalProducts = 0;
  totalStock = 0;
  uniqueWarehouses = 0;
  totalTransactions = 0;

  stockChart: any;
  loading = false;
  itemsData: InventoryItem[] = [];

  @ViewChild('stockCanvas') stockCanvas!: ElementRef<HTMLCanvasElement>;

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.loading = true;

    this.inventoryService.getInventoryItems().subscribe({
      next: (items: InventoryItem[]) => {
        this.itemsData = items;

        this.totalProducts = items.length;

        this.totalStock = items.reduce((sum, item) => {
          return sum + (Number(item.CurrentStock) || 0);
        }, 0);

        const warehouseSet = new Set(items.map(i => i.WarehouseID));
        this.uniqueWarehouses = warehouseSet.size;

        this.totalTransactions = items.length * 5;

        this.loading = false;

        // setTimeout(() => {
        //   this.createStockChart(this.itemsData);
        // }, 0);
      },
      error: (err) => {
        console.error('Error loading dashboard data:', err);
        this.loading = false;
      }
    });
  }

  createStockChart(items: InventoryItem[]): void {
    if (!this.stockCanvas) {
      console.error('Canvas not found');
      return;
    }

    const warehouseMap = new Map<string, number>();

    items.forEach(item => {
      const stock = Number(item.CurrentStock) || 0;

      if (warehouseMap.has(item.WarehouseID)) {
        warehouseMap.set(item.WarehouseID, warehouseMap.get(item.WarehouseID)! + stock);
      } else {
        warehouseMap.set(item.WarehouseID, stock);
      }
    });

    const labels = Array.from(warehouseMap.keys());
    const data = Array.from(warehouseMap.values());

    // if (this.stockChart) {
    //   this.stockChart.destroy();
    // }

    // this.stockChart = new Chart(this.stockCanvas.nativeElement, {
    //   type: 'bar',
    //   data: {
    //     labels: labels,
    //     datasets: [
    //       {
    //         label: 'Total Stock by Warehouse',
    //         data: data
    //       }
    //     ]
    //   },
    //   options: {
    //     responsive: true,
    //     maintainAspectRatio: false,
    //     plugins: {
    //       legend: {
    //         display: true
    //       }
    //     },
    //     scales: {
    //       y: {
    //         beginAtZero: true
    //       }
    //     }
    //   }
    // });
  }
}