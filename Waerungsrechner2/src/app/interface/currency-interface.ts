export interface CurrencyNamesInterface {
  [key: string]: string;
}
export interface CurrencyExchangeInterface {
  [key: string]: number;
}
export interface CurrencyApiResponse {
  [key: string]: CurrencyExchangeInterface;
}
