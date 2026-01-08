import { Component, signal } from '@angular/core';
import { CurrencyDisplay } from "./currency-display/currency-display";

@Component({
  selector: 'app-root',
  imports: [ CurrencyDisplay],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Waerungsrechner2');
}
