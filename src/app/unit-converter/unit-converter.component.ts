/*

Hannes links

https://asvsqmwmvp.cloudimg.io/v7/_products_/830061V1000.jpg?width=160&height=80&func=bound&org_if_sml=1
https://euwdata.azureedge.net/cross-selling/v4/materials_ley.json
https://euwvinbisstorage1.blob.core.windows.net/accss-demo/master/demo/index.html#home
https://materialdesignicons.com/

*/

import { Component, OnInit } from '@angular/core';
import { Quantity, SystemOfUnits, area, frequency, length, mass, pressure, temperature, time, volume } from 'ng-units';


@Component({
  selector: 'app-unit-converter',
  templateUrl: './unit-converter.component.html',
  styleUrls: ['./unit-converter.component.css']
})



export class UnitConverterComponent implements OnInit {


  quantityList = [area, frequency, length, mass, pressure, temperature, time, volume]
  selectedQuantity = length
  baseSymbol: string
  length: Quantity;
  quantity = new Quantity(this.selectedQuantity);
  value = 1.25;


  constructor(private system: SystemOfUnits) {
   }

  ngOnInit(): void {
    this.length = this.system.get('Length');
    this.system.selectUnit(this.quantity, 'mm');
    this.baseSymbol = this.system.get(this.selectedQuantity.name).unit.symbol
  }
  
  changeMetric(metric): void {
    this.selectedQuantity = metric;
    let units: any = this.system.get(this.selectedQuantity.name).units;
    this.baseSymbol = units.find(x => x.factor == 1).symbol
    this.quantity = new Quantity(this.selectedQuantity);
  }

}
