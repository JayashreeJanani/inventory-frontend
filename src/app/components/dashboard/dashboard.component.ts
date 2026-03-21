import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardSummary, InventoryService, InventoryItem,TransactionTrend,TopProducts } from '../../services/inventory.service';
import { Chart } from 'chart.js/auto';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Import the datalabels plugin
import { ProductInventoryComponent } from '../product-inventory/product-inventory.component';
import { Auth } from '../../services/auth.service';

//chart redister of datalabels);
Chart.register
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ProductInventoryComponent], // Import RouterLink and FormsModule for search functionality
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  totalProducts = 0;
  totalStock = 0;
  uniqueWarehouses = 0;
  totalTransactions = 0;
  searchTerm = '';
  topProductsChart: any;
  showProductPopup = false;
  selectedStockCode = '';


  stockChart: any;
  transactionTrendChart: any;
  loading = false;
  itemsData: InventoryItem[] = [];
  searchResults: InventoryItem[] = [];//This is for search bar in the dashboard.
  // lowStockItems: InventoryItem[] = [];//This for low stock items
  // topProducts: InventoryItem[] = [];//This is for top products based on stock quantity
  @ViewChild('stockCanvas') stockCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('transactionTrendCanvas') transactionTrendCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('topProductsCanvas') topProductsCanvas!: ElementRef<HTMLCanvasElement>;
  constructor(
    private inventoryService: InventoryService, 
    public authService: Auth,
    private router: Router) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  //Search product filter function for the search bar in the dashboard
  filterItems(): void {
    const term = this.searchTerm.toLowerCase().trim();

    if (!term) {
      this.searchResults = [];
      return;
    }

    this.searchResults = this.itemsData
    .filter(item =>
      String(item.StockCode).toLowerCase().includes(term) ||
      String(item.Description).toLowerCase().includes(term)
    )
    .slice(0, 10); // Limit to top 10 results
  }
  //after searching a product and typing enter
  goToProductOnEnter(): void {
    console.log('Enter key pressed. Search term:', this.searchTerm);
    alert('Enter key pressed. Search term: ' + this.searchTerm); // Debugging alert
    const term = this.searchTerm.toLowerCase().trim();

    if (!term) {
      return;
    }

   
  



    this.selectedStockCode = term;
    this.authService.setSelectedStockCode(term);
    this.showProductPopup = true;
    this.openProductPopup(term);
  
  }
  //pop for product-inventory
openProductPopup(stockCode: string): void {
  const term =this.searchTerm.toLowerCase().trim();
  if (!term) {
    return;
  }

  this.selectedStockCode = stockCode;
  this.showProductPopup = true;
}

//close method for popup
closeProductPopup(): void {
  this.showProductPopup = false;
  this.selectedStockCode = '';
  this.searchTerm = '';
  this.searchResults = [];
}

  loadDashboardData(): void {
  this.loading = true;

  this.inventoryService.getDashboardSummary().subscribe({
    next: (summary: DashboardSummary) => {
      this.totalProducts = summary.totalProducts;
      this.totalStock = summary.totalStock;
      this.uniqueWarehouses = summary.uniqueWarehouses;
      this.totalTransactions = summary.totalTransactions;
      this.loading = false;
    },
    error: (err) => {
      console.error('Error loading dashboard summary:', err);
      this.loading = false;
    }
  });

  this.inventoryService.getInventoryItems().subscribe({
    next: (items: InventoryItem[]) => {
      this.itemsData = items;

       //We will uncomment this during demo
  //     this.lowStockItems = items

  // .filter(item => (Number(item.CurrentStock) || 0) < 20)
  // .slice(0, 10); 

      // Threshold of 20 is arbitrary. and it limits to top 10 rows.

//       this.topProducts = [...items]
// .sort((a, b) => (Number(b.CurrentStock) || 0) - (Number(a.CurrentStock) || 0))
// .slice(0, 10); 
// Get top 10 products by stock quantity
      // setTimeout(() => {
      //   this.createStockChart(this.itemsData);
      // }, 0);
   },
    error: (err) => {
      console.error('Error loading inventory for chart:', err);
    }
  });

  this.inventoryService.getTransactionTrend().subscribe({
    next: (trendData: TransactionTrend[]) => {
      setTimeout(() => {
        this.createTransactionTrendChart(trendData);
      }, 100);
    },
    error: (err) => {
      console.error('Error in  loading transaction trend data:', err);
    }
  });
  // this.inventoryService.getTopProducts().subscribe({
  //   next: (topProductsData: TopProducts[]) => {
  //     setTimeout(() => { 
  //       this.createTopProductsChart(topProductsData);
  //     }, 100);
  //   },
  //   error: (err) => {
  //     console.error('Error in loading top products data:', err);
  //   }
  // });

  this.inventoryService.getTopProducts().subscribe({
    next:(data: TopProducts[]) => {
      setTimeout(() => {
        this.createTopProductsChart(data);
      }, 100);
    },
    error: (err) => {
      console.error('Error loading top products data:', err);
    }
  });


}
 createTopProductsChart(products: TopProducts[]): void {
  if (!this.topProductsCanvas) {
    console.error('Top products canvas not found');
    return;
  }

  const labels = products.map(
    p => `${p.Description} (${p.StockCode})`
  );

  const data = products.map(
    p => p.totalQuantity
  );

  if (this.topProductsChart) {
    this.topProductsChart.destroy();
  }

  this.topProductsChart = new Chart(
    this.topProductsCanvas.nativeElement,
    {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Top Products',
            data: data
          }
        ]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          datalabels: {
            anchor: 'end',
            align: 'end',
            formatter: (value) => value,
            font: {
              weight: 'bold'
            }
          }
        },
        scales: {
          x: {
            beginAtZero: true
          }
        }
      },
      plugins: [ChartDataLabels]
    }
  );
}
  createTransactionTrendChart(trendData: TransactionTrend[]) {
    if (!this.transactionTrendCanvas) {
      console.error('Transaction trend canvas not found');
      return;
    }

    const labels = trendData.map(t => t.period);
    const data = trendData.map(t => t.count); 

    if (this.transactionTrendChart) {
      this.transactionTrendChart.destroy();
    } 

    this.transactionTrendChart = new Chart(
      this.transactionTrendCanvas.nativeElement, 
      {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Transactions Over Time',
              data: data,
              fill: false,
              tension: 0.3
            }
          ]
        },

        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      }
    );
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


    
   

    // const labels = Array.from(warehouseMap.keys());
    // const data = Array.from(warehouseMap.values());

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