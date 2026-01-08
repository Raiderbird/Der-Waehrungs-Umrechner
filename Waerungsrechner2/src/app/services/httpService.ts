import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { CurrencyApiResponse, CurrencyNamesInterface } from '../interface/currency-interface';

@Injectable({
  providedIn: 'root',
})
export class httpService {
  constructor(private httpClient: HttpClient) {}
  getAvailableCurrencies(): Observable<CurrencyNamesInterface> {
    return this.httpClient.get<CurrencyNamesInterface>(
      'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json'
    );
  }

  getStartCurrencyExchangeValues(currencyCode: string): Observable<CurrencyApiResponse> {
    return this.httpClient.get<CurrencyApiResponse>(
      `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currencyCode}.json`
    );
  }
}
