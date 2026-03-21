import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';

// import { InventoryListComponent } from "./components/inventory-list/inventory-list.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar], // Add RouterOutlet and Navbar to the imports array
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'inventory-frontend';
}
