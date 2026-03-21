import { Component } from '@angular/core';
import { Auth } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  username = '';
  password = '';
  errorMessage = '';
  loading = false;

  constructor(
    private authService: Auth,
    private router: Router
  ){}

  OnLogin(): void{

    this.errorMessage = '';

    if(!this.username || !this.password){
      this.errorMessage = 'Please enter username and password';
      return;
    }

    this.loading = true;

    this.authService.login(this.username, this.password).subscribe({
      next: ()=>{
        this.loading = false;
        this.router.navigate(['/dashboard']);

      },

      error: ()=>{
        this.loading =false;
        this.errorMessage = 'Invalid username or password';
      }


    });


  }


}
