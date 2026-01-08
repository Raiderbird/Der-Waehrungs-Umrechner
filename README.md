# Der-Waehrungs-Umrechner Documentation

Ein Angular Projekt mit typescript und CSS 
Tests werden ignoriert
genutzt wird Visual Studios CoPilot agent verwendet
verwendete api: https://github.com/fawazahmed0/exchange-api
mit get endpunkt: https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@{date}/{apiVersion}/
{endpoint}
https://www.exchangerate-api.com/docs/standard-requests

github desktop installiert un Repository erstellt
Projekt erstellt mit ng new Waerungsrechner mit css ausgewählt
cd WaerungsRechner
ng generate component currencyDisplay
angular laguage server und angular snippets extensions installiert
angular update von v19 auf v20 / neues projekt erstellt mit v20
npm i primeng@20.4.0 / installieren von prime ng zum verschönern und verwendung deren html input elementen
create http service
ng generate interface currencyNamesInterface  - um die erhaltenen daten zu parsen
primeng theme installiert
npm install primeng @primeng/themes

Inline Code Empfelungen gehen so hart auf den sack, junge die halluzinieren einfach den ['key'] wert als wäre der ein festwert












ai fragen und antworten:

https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json turn this result into a class/string[] dictionary

Edited
httpService.ts+16-2
The code has been updated to fetch the currencies JSON and transform it into a dictionary where keys are currency names (strings) and values are arrays of currency codes (string[]). This handles cases where multiple codes share the same name.

The method now returns an Observable<Record<string, string[]>>, which you can subscribe to in your components. For example:
this.httpService.getAvailableCurrencies().subscribe(dict => {
  console.log(dict); // e.g., { "US Dollar": ["usd"], "Belarusian Ruble": ["byn", "byr"] }
});
------------
empfolone ai code: 
getAvailableCurrencies(): Observable<Record<string, string[]>> {
    return this.httpClient.get<Record<string, string>>('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json').pipe(
      map(data => {
        const dict: Record<string, string[]> = {};
        for (const code in data) {
          const name = data[code];
          if (!dict[name]) {
            dict[name] = [];
          }
          dict[name].push(code);
        }
        return dict;
      })
    );
  }
  verwendet wird:
    getAvailableCurrencies(): Observable<Record<string, string>[]> {
    return this.httpClient.get<Record<string, string>[]>('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json')
  }


 user:add missing import for ngModel

currency-display.ts

Edited
currency-display.ts+2-1
currency-display.ts

The import for FormsModule has been added to enable ngModel in the template. The component now includes FormsModule in its imports array.

Grok Code Fast 1 • 1x
----------------
AI hat FormsModule eingefügt


parse the currenylist to display in the listbox

Edited
currency-display.ts+1-1
Edited
currency-display.html+2-2
Edited
currency-display.ts+1-1
The currencyList has been updated to parse the data into displayable strings for the listbox. Each item now shows the currency code followed by its name in parentheses, e.g., "usd (US Dollar)". This is achieved by mapping over Object.keys(data) (the currency codes) and formatting each as ${code} (${data[code]}).

The listbox options are now simple strings, so optionLabel was removed from the template.
The selected currencies (selectedStartCurrency and selectedEndCurrency) remain as strings for compatibility.
This should display the currencies clearly in the PrimeNG Listbox component. If you need further customization (e.g., filtering or different formatting), let me know!
--------------
AI hat das mapping für currenyList geändert

pakete installieren: npm install
im lokalen port laufen: ng serve
proket bauen: ng build