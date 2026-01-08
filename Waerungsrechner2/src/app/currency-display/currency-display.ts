import { Component, OnInit } from '@angular/core';
import { httpService } from '../services/httpService';
import { ListboxModule } from 'primeng/listbox';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { CurrencyApiResponse, CurrencyExchangeInterface } from '../interface/currency-interface';
import { InputNumberModule } from 'primeng/inputnumber';
import { IftaLabelModule } from 'primeng/iftalabel';

@Component({
  selector: 'app-currency-display',
  imports: [ListboxModule, CommonModule, FormsModule,InputNumberModule,IftaLabelModule ],
  templateUrl: './currency-display.html',
  styleUrl: './currency-display.css',
})
export class CurrencyDisplay implements OnInit {
  currencyList: string[] = [];
  selectedStartCurrency?: string;
  selectedEndCurrency?: string;

  currencyStartValue?: number;
  currencyEndValue?: number;

  currencyExchangeValues?: CurrencyApiResponse;

  constructor(private httpService: httpService) {}

  ngOnInit(): void {
    this.httpService.getAvailableCurrencies().subscribe((data) => {
      this.currencyList = Object.keys(data).map((code) => `${code} (${data[code]})`);
    });
  }

  async changedStartCurrency(selectedStartCurrency: string) {
    const currencyCode = this.getCodeFromCurrencyList(this.currencyList, selectedStartCurrency);
    this.currencyExchangeValues = await firstValueFrom(
      this.httpService.getStartCurrencyExchangeValues(currencyCode)
    );
  }

  changedEndCurrency(selectedEndCurrency: string) {
    this.calculateEndValue(selectedEndCurrency.substring(0, selectedEndCurrency.indexOf(' ')));
  }

  calculateEndValue(selectedEndCurrency: string) {
    console.log(selectedEndCurrency);
    console.log(this.selectedStartCurrency);
    console.log(this.currencyStartValue);
    if (this.currencyStartValue && this.selectedStartCurrency && selectedEndCurrency) {
      const exchangeRate = this.currencyExchangeValues?.[this.selectedStartCurrency]?.[selectedEndCurrency];
      if (exchangeRate) {
        this.currencyEndValue = this.currencyStartValue * exchangeRate;
      }
      console.log(exchangeRate)
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
