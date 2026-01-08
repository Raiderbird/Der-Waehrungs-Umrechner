import { Component, OnInit } from '@angular/core';
import { httpService } from '../services/httpService';
import { ListboxModule } from 'primeng/listbox';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { CurrencyApiResponse } from '../interface/currency-interface';
import { InputNumberModule } from 'primeng/inputnumber';
import { IftaLabelModule } from 'primeng/iftalabel';

@Component({
  selector: 'app-currency-display',
  imports: [ListboxModule, CommonModule, FormsModule, InputNumberModule, IftaLabelModule],
  templateUrl: './currency-display.html',
  styleUrl: './currency-display.css',
})
export class CurrencyDisplay implements OnInit {
  currencyList: string[] = [];
  selectedStartCurrency?: string;
  selectedEndCurrency?: string;
  selectedStartCurrencyDisplay?: string;

  currencyStartValue?: number;
  currencyEndValue?: number;
  selectedEndCurrencyDisplay?: string;
  currencyExchangeValues?: CurrencyApiResponse;

  constructor(private httpService: httpService) {}

  ngOnInit(): void {
    this.httpService.getAvailableCurrencies().subscribe((data) => {
      this.currencyList = Object.keys(data).map((code) => `${code} (${data[code]})`);
    });
  }

  async changedStartCurrency(selectedStartCurrencyDisplay: string) {
    const currencyCode = this.getCodeFromCurrencyList(
      this.currencyList,
      selectedStartCurrencyDisplay
    );
    this.selectedStartCurrency = this.selectedStartCurrencyDisplay?.substring(
      0,
      this.selectedStartCurrencyDisplay.indexOf(' ')
    );
    this.currencyExchangeValues = await firstValueFrom(
      this.httpService.getStartCurrencyExchangeValues(currencyCode)
    );
  }

  changedEndCurrency(selectedEndCurrencyDisplay: string) {
    this.selectedEndCurrency = selectedEndCurrencyDisplay.substring(
      0,
      selectedEndCurrencyDisplay.indexOf(' ')
    );
    this.calculateEndValue();
  }

  calculateEndValue() {
    if (this.currencyStartValue && this.selectedStartCurrency && this.selectedEndCurrency) {
      const exchangeRate =
        this.currencyExchangeValues?.[this.selectedStartCurrency]?.[this.selectedEndCurrency];
      if (exchangeRate) {
        this.currencyEndValue = this.currencyStartValue * exchangeRate;
      }
    }
  }

  getCodeFromCurrencyList(currencyList: string[], selectedCurrency: string): string {
    selectedCurrency = selectedCurrency.substring(0, selectedCurrency.indexOf(' '));
    const found = currencyList.find((currency) => {
      const code = currency.substring(0, currency.indexOf(' '));
      return code === selectedCurrency;
    });
    if (found) {
      return found.substring(0, found.indexOf(' '));
    }
    console.error('No currency selected or currency list is empty.');
    return '';
  }
}
