import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { InventoryService, InventoryTransaction } from '../../services/inventory.service';

@Component({
  selector: 'app-transaction-history',
  imports: [CommonModule],
  templateUrl: './transaction-history.component.html',
  styleUrl: './transaction-history.component.css'
})
export class TransactionHistoryComponent {

  stockCode = '';
  transactions: InventoryTransaction[] = [];
  loading = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private inventoryService: InventoryService
  ) {}

  ngOnInit(): void {
    this.stockCode = this.route.snapshot.paramMap.get('stockCode') || '';
    this.loadTransactionHistory();
  }

  loadTransactionHistory(): void {
    if (!this.stockCode) {
      this.error = 'Invalid stock code';
      return;
    }
    this.loading = true;
    this.error = '';

    this.inventoryService.getTransactionsByStockCode(this.stockCode).subscribe({
      next: (data: InventoryTransaction[]) => {
        this.transactions = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching transaction history:', err);
        this.error = 'Failed to load transaction history';
        this.loading = false;
      }
    });
  }

}
