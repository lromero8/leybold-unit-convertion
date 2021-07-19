/*

Hannes links

https://asvsqmwmvp.cloudimg.io/v7/_products_/830061V1000.jpg?width=160&height=80&func=bound&org_if_sml=1
https://euwdata.azureedge.net/cross-selling/v4/materials_ley.json
https://euwvinbisstorage1.blob.core.windows.net/accss-demo/master/demo/index.html#home
https://materialdesignicons.com/

*/

import { Component, OnInit } from '@angular/core';
import { Quantity, area, frequency, length, mass, pressure, temperature, time, volume, QuantityDefinition, SystemOfUnits } from 'ng-units';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { queryStructureValidator } from '../shared/query-structure.directive';




@Component({
  selector: 'app-unit-converter',
  templateUrl: './unit-converter.component.html',
  styleUrls: ['./unit-converter.component.css']
})
export class UnitConverterComponent implements OnInit {

  quantityList: QuantityDefinition[] = [area, frequency, length, mass, pressure, temperature, time, volume];
  selectedQuantity: QuantityDefinition = length;
  value = 1.25;
  inputValue = 2.5;

  inputQuantity: Quantity;
  outputQuantity: Quantity;

  regex: RegExp = /^[0-9]+ \b(m2|cm2|mm3|m|cm|mm|in|ft|Hz|kHz|MHz|rpm|g|kg|t|Pa|bar|mbar|Torr|mTorr|psi|inHg|k|c|f|ms|s|min|h|m3|cm3|mm3)\b in \b(m2|cm2|mm3|m|cm|mm|in|ft|Hz|kHz|MHz|rpm|g|kg|t|Pa|bar|mbar|Torr|mTorr|psi|inHg|k|c|f|ms|s|min|h|m3|cm3|mm3)\b/;

  profileForm!: FormGroup;
  // profileForm = this.fb.group({
  //   firstName: ['', { validators: queryStructureValidator(this.regex), updateOn: "submit" }]
  // });

  constructor(private fb: FormBuilder, private system: SystemOfUnits) { }

  ngOnInit(): void {
    this.changeMetric(length);
    this.system.selectUnit(this.outputQuantity, 'cm');

    this.profileForm = new FormGroup({
      firstName: new FormControl('', [queryStructureValidator(this.regex)])
    });
  }

  

  changeMetric(metric: QuantityDefinition): void {
    console.log(metric)
    this.selectedQuantity = metric;
    this.inputQuantity = new Quantity(metric);
    this.outputQuantity = new Quantity(metric);
  }

  keyDownFunction() {
    if (this.profileForm.valid) {
      let strArray = this.profileForm.value.firstName.split(' ');
      console.log(strArray[0], strArray[1], strArray[3])
      this.system.selectUnit(this.inputQuantity, strArray[1]);
      this.value = Number(strArray[0]);
      this.system.selectUnit(this.outputQuantity, strArray[3]);
      // this.system.broadcast(this.inputQuantity)
      // this.system.broadcast(this.outputQuantity)
      // this.selectedQuantity = 
      // console.log(this.value)
      // console.log(this.system.get('Length'))
      
    }
  }

}

// To-Do
  // Get the value right
  // Change metric with Quantity