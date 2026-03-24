import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive,RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterModule, FormsModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  selectedStockCode: string = '';
  showTransactionPopup: boolean = false;


  constructor(
    public authService: Auth,
    private router: Router,
    
  ){
    this.selectedStockCode =this.authService.getSelectedStockCode();
  }

  logout():void{
    this.authService.logout();
    this.router.navigate(['/login']);

  }

  openTransactionPopup(): void{
    this.showTransactionPopup = true;
  }

  closeTransactionPopup(): void{
    this.showTransactionPopup = false;
    this.selectedStockCode = '';
  }

  goToTransactionPage(): void{
    const code = this.selectedStockCode.trim();

    if(!code){
      return;
    }

    this.closeTransactionPopup();
    this.router.navigate(['/transactions', code]);
    this.selectedStockCode = '';

  }

}
