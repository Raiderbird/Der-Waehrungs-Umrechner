import { Component, OnInit } from '@angular/core';
import { httpService } from '../services/httpService';
import { ListboxModule } from 'primeng/listbox';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-currency-display',
  imports: [ListboxModule,CommonModule, FormsModule],
  templateUrl: './currency-display.html',
  styleUrl: './currency-display.css',
})
export class CurrencyDisplay implements OnInit {
  currencyList: string[] = []
  selectedStartCurrency: string | null = null
  selectedEndCurrency: string | null = null
  constructor(private httpService:httpService) {}

  ngOnInit(): void {
    this.httpService.getAvailableCurrencies().subscribe((data)=>{
      this.currencyList = Object.keys(data).map(code => `${code} (${data[code]})`)
      console.log(this.currencyList)
    })}
}
