import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { CurrencyNamesInterface } from '../interface/currency-names-interface';

@Injectable({
  providedIn: 'root',
})
export class httpService {

  constructor(private httpClient: HttpClient) {
  }
  getAvailableCurrencies(): Observable<CurrencyNamesInterface> {
    return this.httpClient.get<CurrencyNamesInterface>('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json')
  }
}
