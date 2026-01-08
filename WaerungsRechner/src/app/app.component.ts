import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CurrencyDisplayComponent } from './currency-display/currency-display.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CurrencyDisplayComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'WaerungsRechner';
}
