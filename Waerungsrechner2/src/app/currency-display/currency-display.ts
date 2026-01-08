import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

import { httpService } from '../services/httpService';
import { CurrencyApiResponse } from '../interface/currency-interface';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { ListboxModule } from 'primeng/listbox';

@Component({
  selector: 'app-currency-display',
  imports: [
    CommonModule,
    FormsModule,
    IftaLabelModule,
    InputNumberModule,
    ListboxModule,
  ],
  templateUrl: './currency-display.html',
  styleUrl: './currency-display.css',
})
export class CurrencyDisplay implements OnInit {
  // Currency list and selections
  currencyList: string[] = [];
  selectedStartCurrencyDisplay?: string;
  selectedEndCurrencyDisplay?: string;

  // Currency codes (extracted from display strings)
  selectedStartCurrency?: string;
  selectedEndCurrency?: string;

  // Input values
  currencyStartValue?: number;
  currencyEndValue?: number;

  // Exchange data
  currencyExchangeValues?: CurrencyApiResponse;

  constructor(private httpService: httpService) {}

  ngOnInit(): void {
    this.httpService.getAvailableCurrencies().subscribe((data) => {
      this.currencyList = Object.keys(data).map((code) => `${code} (${data[code]})`);
    });
  }

  /**
   * Handles change in start currency selection.
   * @param selectedStartCurrencyDisplay The selected currency display string.
   */
  async changedStartCurrency(selectedStartCurrencyDisplay: string): Promise<void> {
    const currencyCode = this.getCodeFromCurrencyList(
      this.currencyList,
      selectedStartCurrencyDisplay
    );
    this.selectedStartCurrency = selectedStartCurrencyDisplay.substring(
      0,
      selectedStartCurrencyDisplay.indexOf(' ')
    );
    this.currencyExchangeValues = await firstValueFrom(
      this.httpService.getStartCurrencyExchangeValues(currencyCode)
    );
    this.calculateEndValue();
  }

  /**
   * Handles change in end currency selection.
   * @param selectedEndCurrencyDisplay The selected currency display string.
   */
  changedEndCurrency(selectedEndCurrencyDisplay: string): void {
    this.selectedEndCurrency = selectedEndCurrencyDisplay.substring(
      0,
      selectedEndCurrencyDisplay.indexOf(' ')
    );
    this.calculateEndValue();
  }

  /**
   * Calculates the end currency value based on start value and exchange rate.
   */
  calculateEndValue(): void {
    if (
      this.currencyStartValue &&
      this.selectedStartCurrency &&
      this.selectedEndCurrency
    ) {
      const exchangeRate =
        this.currencyExchangeValues?.[this.selectedStartCurrency]?.[this.selectedEndCurrency];
      if (exchangeRate) {
        this.currencyEndValue = this.currencyStartValue * exchangeRate;
      }
    }
  }

  /**
   * Extracts the currency code from the display string.
   * @param currencyList The list of currency display strings.
   * @param selectedCurrency The selected currency display string.
   * @returns The currency code.
   */
  private getCodeFromCurrencyList(currencyList: string[], selectedCurrency: string): string {
    const code = selectedCurrency.substring(0, selectedCurrency.indexOf(' '));
    const found = currencyList.find((currency) => {
      const currencyCode = currency.substring(0, currency.indexOf(' '));
      return currencyCode === code;
    });
    if (found) {
      return found.substring(0, found.indexOf(' '));
    }
    console.error('No currency selected or currency list is empty.');
    return '';
  }
}
