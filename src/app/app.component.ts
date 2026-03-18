import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { InventoryListComponent } from "./components/inventory-list/inventory-list.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet], // Add RouterOutlet to the imports array
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'inventory-frontend';
}
