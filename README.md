# Der Währungs-Umrechner

Ein Angular-Projekt mit TypeScript und CSS für die Umrechnung von Währungen. Tests werden ignoriert. Der Visual Studio Code Copilot Agent wurde verwendet.

## Projektübersicht

- **Verwendete API:** [fawazahmed0/exchange-api](https://github.com/fawazahmed0/exchange-api)
- **API-Endpunkt:** `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@{date}/{apiVersion}/{endpoint}`

## Voraussetzungen

- Node.js und npm installiert
- Angular CLI installiert

## Installation und Setup

1. Repository klonen oder herunterladen.
2. Abhängigkeiten installieren: `npm install`
3. Projekt lokal starten: `ng serve`
4. Projekt bauen: `ng build`

## Entwicklungsschritte

- GitHub Desktop installiert und Repository erstellt.
- Projekt mit `ng new Waerungsrechner` erstellt, CSS ausgewählt.
- Terminal: `cd WaerungsRechner`
- Component generiert: `ng generate component currencyDisplay`
- Extensions installiert: Angular Language Server und Angular Snippets.
- Angular von v19 auf v20 aktualisiert / Neues Projekt mit v20 erstellt.
- PrimeNG installiert: `npm i primeng@20.4.0` für UI-Komponenten.
- HTTP-Service erstellt und Endpunkt aufgerufen zum holen aller verfügbaren Währungsarten.
- Interface generiert: `ng generate interface currencyNamesInterface` zur Datenverarbeitung.
- Interface Datei umbenannt zu `currencyInterface` und interfaces `CurrencyNamesInterface`,`CurrencyExchangeInterface`,`CurrencyApiResponse` erstellt. 
Inferfaces:
export interface CurrencyNamesInterface {
  [key: string]: string;
}
export interface CurrencyExchangeInterface {
  [key: string]: number;
}
export interface CurrencyApiResponse {
  [key: string]: CurrencyExchangeInterface;
}

- Der erste Get Endpunkt gibt dann ein `CurrencyNamesInterface` Objekt zurück.
- PrimeNG Theme installiert: `npm install primeng @primeng/themes` da die importierten PrimeNG Eingabefelder nicht funktioniert haben
- Werte von den ausgewählten Währungen in den Listen auslesen
- Erstellen der Funktion zum parsen der Währungsarten zu deren Währungscodes
- Im Http Service einen weiteren Endpunkt angesprochen für die Währungsumrechnungswerte, hierfür wurde dann auch der Währungscode verwendet und gibt ein `CurrencyApiResponse` zurück
- Berechnung der Währungsumwandlungswerten falls alle Daten angegeben wurden
- Letztes refactoring und löschen des vorherigen projektes

## Endpunkt Daten
Get-Endpunkt für Währungsarten: https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json
Beispiel Get-Endpunkt für Währungsumrechnungs Werte: https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/aave.json


## Verwendung

Das Projekt ist ein Währungs-Umrechner, der Daten von der Exchange-API abruft und in einer Benutzeroberfläche mit PrimeNG-Komponenten anzeigt.

## Zusätzliche Dokumentation: Was wurde gemacht, AI-Vorschläge und Implementierte Änderungen

### 1. Umwandlung der API-Antwort in ein Dictionary (Klasse/string[] Dictionary)
**Was wurde gemacht:** Die API-Antwort von `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json` sollte in ein Dictionary umgewandelt werden, bei dem die Schlüssel die Währungsnamen (Strings) sind und die Werte Arrays von Währungscodes (string[]).

**AI-Vorschlag:** Der AI schlug vor, die Methode `getAvailableCurrencies()` in `httpService.ts` zu ändern, um die Daten zu transformieren. Der Code sollte ein `Observable<Record<string, string[]>>` zurückgeben und die Daten mappen, indem über die Codes iteriert wird und ein Dictionary erstellt wird, das Namen als Schlüssel und Arrays von Codes als Werte hat. Beispiel-Code:
```typescript
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
```

**Was tatsächlich implementiert wurde:** Der ursprüngliche Code wurde beibehalten, der die API direkt als `Observable<Record<string, string>[]> ` zurückgibt, ohne Transformation. Der AI-Vorschlag wurde nicht übernommen, da die ursprüngliche Implementierung ausreichte. Später wurde der `Observable<Record<string, string>[]> ` mit einem Interface von `[key: string]: string; ` ersetzt, dafür wurde ChatGPT, nicht der GitHub Copilot Agent, verwendet.

### 2. Fehlender Import für ngModel hinzufügen
**Was wurde gemacht:** In `currency-display.ts` fehlte der Import für `FormsModule`, um `ngModel` in der Template zu verwenden.

**AI-Vorschlag:** Der AI schlug vor, `FormsModule` zu den Imports des Components hinzuzufügen.

**Was tatsächlich implementiert wurde:** `FormsModule` wurde zu den Imports in `currency-display.ts` hinzugefügt, um `ngModel` zu aktivieren.

### 3. Fehler: No provider found for _HttpClient
**Was wurde gemacht:** Es gab einen Fehler mit dem HttpClient-Provider in der App-Konfiguration.

**AI-Vorschlag:** Der AI korrigierte `provideHttpClient` zu `provideHttpClient()` in der App-Konfiguration, um den HttpClient-Service bereitzustellen. Dies ist weil der Fehler behoben wurde bevor die AI überhaupt fertig wurde, die AI hatte hier nichts gemacht.

**Was tatsächlich implementiert wurde:** Der Fehler wurde behoben bevor die AI überhaupt Zeite hatte das zu realisieren.

### 4. Iteration durch Schlüssel von getAvailableCurrencies()
**Was wurde gemacht:** Die Daten aus `getAvailableCurrencies()` sollten iteriert werden, um die `currencyList` zu füllen.

**AI-Vorschlag:** Der AI schlug vor, `Object.keys(data)` zu verwenden, um die Schlüssel zu iterieren, und die `currencyList` als Array von Objekten mit `name` und `codes` zu strukturieren. Die Selektionen wurden entsprechend angepasst.

**Was tatsächlich implementiert wurde:** Der Vorschlag wurde teilweise übernommen; `Object.keys(data)` wurde verwendet, aber die `currencyList` blieb als Array von Strings, formatiert als "code (name)".

### 5. Parsen der currencyList für die Anzeige in der Listbox
**Was wurde gemacht:** Die `currencyList` sollte für die PrimeNG Listbox geparst werden, um Währungen anzuzeigen.

**AI-Vorschlag:** Der AI schlug vor, die Daten zu mappen, um Strings wie "usd (US Dollar)" zu erstellen, und `optionLabel` aus der Template zu entfernen.

**Was tatsächlich implementiert wurde:** Der Vorschlag wurde übernommen; die `currencyList` wird nun als Array von Strings formatiert, und die Template wurde angepasst.

### Allgemeine Hinweise
- Pakete installieren: `npm install`
- Projekt lokal starten: `ng serve`
- Projekt bauen: `ng build`
- Verwendete API: https://github.com/fawazahmed0/exchange-api
- Inline-Code-Empfehlungen des AI können manchmal halluzinieren, z.B. feste Werte für ['key'] annehmen, obwohl keine vorhanden sind. (Die allgemeine implementierung der Ai Inline Vorschläge in Visual Studio fühlt sich äußersts unangenehm an, da AI priorität vor dem Autocomplete hat )

## AI-Überarbeitung der Dokumentation

Die Dokumentation wurde vom AI (GitHub Copilot) überarbeitet und verschönert, um eine bessere Struktur, Lesbarkeit und Professionalität zu gewährleisten. Dies umfasst:
- Umstrukturierung in klare Abschnitte mit Überschriften.
- Korrektur von Tippfehlern und Verbesserung der Grammatik.
- Konsistente Formatierung mit Markdown.
- Entfernung informeller Elemente und Hinzufügung logischer Abschnitte wie Voraussetzungen, Installation und Verwendung.

## Letzte Chat-Nachrichten (Vollständiges Protokoll)

Hier ist das vollständige Chat-Protokoll der letzten Interaktionen mit dem AI-Assistenten:

### 1. Benutzer: https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json turn this result into a class/string[] dictionary
**AI:** The JSON is an object where keys are currency codes (strings) and values are currency names (strings). So, it's Record<string, string>. The user wants to turn this into a class/string[] dictionary. Perhaps they mean to create a TypeScript interface or type for this data. I fetched the content and suggested code to transform it into a dictionary where keys are currency names and values are arrays of codes.

### 2. Benutzer: add missing import for ngModel
**AI:** Added FormsModule to the imports in currency-display.ts to enable ngModel.

### 3. Benutzer: error No provider found for _HttpClient
**AI:** Corrected provideHttpClient to provideHttpClient() in app.config.ts.

### 4. Benutzer: how to iterate through keys from this.httpService.getAvailableCurrencies().subscribe((data)=>{})
**AI:** Explained using Object.keys(data) and updated the code to populate currencyList.

### 5. Benutzer: parse the currenylist to display in the listbox
**AI:** Formatted currencyList as strings like "usd (US Dollar)" and removed optionLabel.

### 6. Benutzer: mind adding additional documentation to the readme.md of what was made and what was suggested by the ai/ what was actually written and kept in the code. write in german
**AI:** Provided a draft of the documentation in German.

### 7. Benutzer: can you write it in the readme?
**AI:** Added the documentation to the README.md file.

### 8. Benutzer: can you change the rest of the read me to look better aswell?
**AI:** Restructured and improved the entire README.md for better formatting and professionalism.

### 9. Benutzer: i added some more, also add in the bottom that you rewrote and prettified the documentation and add the last few chat messages here to the documentation as well
**AI:** Added sections for AI revision and chat summary to the README.

### 10. Benutzer: write down the whole chat actually
**AI:** (This response) Expanded the chat section to include the full protocol as requested.


