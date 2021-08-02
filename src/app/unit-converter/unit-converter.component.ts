/*

Hannes links

https://asvsqmwmvp.cloudimg.io/v7/_products_/830061V1000.jpg?width=160&height=80&func=bound&org_if_sml=1
https://euwdata.azureedge.net/cross-selling/v4/materials_ley.json
https://euwvinbisstorage1.blob.core.windows.net/accss-demo/master/demo/index.html#home
https://materialdesignicons.com/

*/

import { Component, OnInit } from '@angular/core';
import { Quantity, area, frequency, length, mass, pressure, temperature, time, volume, QuantityDefinition, SystemOfUnits } from 'ng-units';


@Component({
  selector: 'app-unit-converter',
  templateUrl: './unit-converter.component.html',
  styleUrls: ['./unit-converter.component.css']
})
export class UnitConverterComponent implements OnInit {

  regex: RegExp = /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)+ \b(m²|cm²|mm³|m|cm|mm|in|ft|Hz|kHz|MHz|rpm|g|kg|t|Pa|bar|mbar|Torr|mTorr|psi|inHg|K|°C|°F|ms|s|min|h|m³|cm³|mm³)\b in \b(m²|cm²|mm³|m|cm|mm|in|ft|Hz|kHz|MHz|rpm|g|kg|t|Pa|bar|mbar|Torr|mTorr|psi|inHg|K|°C|°F|ms|s|min|h|m³|cm³|mm³)\b/;

  quantityList: QuantityDefinition[] = [area, frequency, length, mass, pressure, temperature, time, volume];
  selectedQuantity: QuantityDefinition = length;
  value = 1.25;
  invalidUnits: Boolean = false;

  inputQuantity: Quantity;
  outputQuantity: Quantity;

  queryInput: string;


  constructor(private system: SystemOfUnits) { }

  ngOnInit(): void {
    this.changeMetric(length);
    this.system.selectUnit(this.outputQuantity, 'cm');
  }

  

  changeMetric(metric: QuantityDefinition): void {
    console.log(metric)
    this.selectedQuantity = metric;
    this.inputQuantity = new Quantity(metric);
    this.outputQuantity = new Quantity(metric);
  }


  getSystemFromSymbol(symbol: string){
    return this.quantityList.find( i => {
      if(Object.keys(i.units).includes(symbol))
        return i.name
    })
  }

  submitQuery(e: string) {
    // console.log(e);
    let strArray = e.split(' ');
    let definition = this.getSystemFromSymbol(strArray[1])
    this.changeMetric(definition);

    this.system.selectUnit(this.inputQuantity, strArray[1]);
    this.value = this.inputQuantity.toBase(parseFloat(strArray[0]))
    this.system.selectUnit(this.outputQuantity, strArray[3]);
    
  }

  
}

// To-Do
  // Select correct units on selectors after query input is submitted

// Notes
  // Model-Driven Form: FormBuilder/FormGroup
  // Template-Driven Form: ngModel and Name