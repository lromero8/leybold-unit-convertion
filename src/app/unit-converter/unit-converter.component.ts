/*

Hannes links

https://asvsqmwmvp.cloudimg.io/v7/_products_/830061V1000.jpg?width=160&height=80&func=bound&org_if_sml=1
https://euwdata.azureedge.net/cross-selling/v4/materials_ley.json
https://euwvinbisstorage1.blob.core.windows.net/accss-demo/master/demo/index.html#home
https://materialdesignicons.com/

*/

import { Component, OnInit } from '@angular/core';
import { Quantity, area, frequency, length, mass, pressure, temperature, time, volume, QuantityDefinition, SystemOfUnits } from 'ng-units';
import { FormControl, FormGroup } from '@angular/forms';
import { queryStructureValidator } from '../shared/query-structure.directive';


const regex: RegExp = /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)+ \b(m²|cm²|mm³|m|cm|mm|in|ft|Hz|kHz|MHz|rpm|g|kg|t|Pa|bar|mbar|Torr|mTorr|psi|inHg|K|°C|°F|ms|s|min|h|m³|cm³|mm³)\b in \b(m²|cm²|mm³|m|cm|mm|in|ft|Hz|kHz|MHz|rpm|g|kg|t|Pa|bar|mbar|Torr|mTorr|psi|inHg|K|°C|°F|ms|s|min|h|m³|cm³|mm³)\b/;


@Component({
  selector: 'app-unit-converter',
  templateUrl: './unit-converter.component.html',
  styleUrls: ['./unit-converter.component.css']
})
export class UnitConverterComponent implements OnInit {

  quantityList: QuantityDefinition[] = [area, frequency, length, mass, pressure, temperature, time, volume];
  selectedQuantity: QuantityDefinition = length;
  value = 1.25;
  invalidUnits: Boolean = false;

  inputQuantity: Quantity;
  outputQuantity: Quantity;


  queryForm!: FormGroup;

  constructor(private system: SystemOfUnits) { }

  ngOnInit(): void {
    this.changeMetric(length);
    this.system.selectUnit(this.outputQuantity, 'cm');

    this.queryForm = new FormGroup({
      queryControl: new FormControl('', [queryStructureValidator(regex)])
    });
  }

  

  changeMetric(metric: QuantityDefinition): void {
    console.log(metric)
    this.selectedQuantity = metric;
    this.inputQuantity = new Quantity(metric);
    this.outputQuantity = new Quantity(metric);
  }


  validateTwoQuantityDefinitions(fromSymbol: string, toSymbol: string){
    return this.quantityList.find( i => {
      if(Object.keys(i.units).includes(fromSymbol) && Object.keys(i.units).includes(toSymbol))
        return i.name
    })
  }

  submitQuery() {
    if (this.queryForm.valid) { // Check if the syntax is correct
      let strArray = this.queryForm.value.queryControl.split(' ');
      let quantity = this.validateTwoQuantityDefinitions(strArray[1], strArray[3]);
      if(quantity !== undefined){  // Check if the two units belong to the same Quantity
        this.changeMetric(this.quantityList.find(i => i.name === quantity.name))
        
        this.system.selectUnit(this.inputQuantity, strArray[1]);
        // console.log(this.inputQuantity)
        this.value = this.inputQuantity.toBase(parseFloat(strArray[0]))
        this.system.selectUnit(this.outputQuantity, strArray[3]);
        // console.log(this.outputQuantity)

        
      }
      else { // Validate two units belong to the same Quantity
        this.queryForm.controls['queryControl'].setErrors({'incorrect': true})
        this.invalidUnits = true
      }
      
    }
  }

  
}

// To-Do
  // Select unit on select input after query submit
  // Validate with ngmodelchanged or onvaluechanges

// Notes
  // Model-Driven Form: FormBuilder/FormGroup
  // Template-Driven Form: ngModel and Name