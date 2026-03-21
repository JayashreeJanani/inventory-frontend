import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,tap } from 'rxjs';


//interface for login request

export interface LoginResponse{
  message: string;
  username:string;
  role:string;


}

@Injectable({
  providedIn: 'root',
})
export class Auth {

  private apiUrl = "http://127.0.0.1:8000/api/login";

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(this.apiUrl, {username,password}).pipe(
      tap((response)=>{
        localStorage.setItem('isLoggedIn','true');
        localStorage.setItem('username',response.username);
        localStorage.setItem('role',response.role);

      })
    );

  }

  logout(): void{
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
  }

  isLoggedIn(): boolean{
    return localStorage.getItem('isLoggedIn')  === 'true';
  }

  getRole(): string{
    return localStorage.getItem('role') || '';
  }

  getUsername(): string{
    return localStorage.getItem('username') || '';
  }

  setSelectedStockCode(code: string): void {
  localStorage.setItem('selectedStockCode', code);
}

getSelectedStockCode(): string {
  return localStorage.getItem('selectedStockCode') || '';
}
  
}
