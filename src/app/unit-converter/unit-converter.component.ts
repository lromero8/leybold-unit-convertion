import { Component, OnInit } from '@angular/core';


const metrics = [
  {
    type: 'Length',
    units: [
      {
        name: 'Meters',
        factor: 1
      },
      {
        name: 'Kilometers',
        factor: 1000
      },
      {
        name: 'Centimeters',
        factor: 1 / 100
      }
    ]
  },
  {
    type: 'Area',
    units: [
      {
        name: 'Square Miles',
        factor: 1
      },
      {
        name: 'Square Kilometers',
        factor: 1 / 2.589988110336
      },
      {
        name: 'Acres',
        factor: 1 / 640
      },
      {
        name: 'Hectares',
        factor: 1 / 258.9988110336
      },
      {
        name: 'Square Yards',
        factor: 1 / 3097600
      },
      {
        name: 'Square Meters',
        factor: 1 / 2589988.110336
      },
      {
        name: 'Square Feet',
        factor: 1 / 27878400
      },
      {
        name: 'Square Inches',
        factor: 1 / 4014489600
      }
    ]
  },
  {
    type: 'Time',
    units: [
      {
        name: 'Years',
        factor: 31536000
      },
      {
        name: 'Days',
        factor: 86400
      },
      {
        name: 'Hours',
        factor: 3600
      },
      {
        name: 'Minutes',
        factor: 60
      },
      {
        name: 'Seconds',
        factor: 1
      }
    ]
  },
  {
    type: 'Temperature',
    units: [
      {
        name: 'Fahrenheit',
        factor: 5 / 9
      },
      {
        name: 'Celsius',
        factor: 9 / 5
      }
    ]
  }
];

export interface Metric {
  type: string;
  units: Unit[];
}

export interface Unit {
  name: string;
  factor: number;
}

@Component({
  selector: 'app-unit-converter',
  templateUrl: './unit-converter.component.html',
  styleUrls: ['./unit-converter.component.css']
})



export class UnitConverterComponent implements OnInit {

  inputNumber = 2;
  metrics: Metric[] = metrics;
  outputUnits: Unit[] = metrics[0].units;
  inputUnits: Unit[] = metrics[0].units;
  selectedMetric = metrics[0].type;
  selectedInputUnit = metrics[0].units[0];
  selectedOutputUnit = metrics[0].units[1];
  outputNumber: number;


  constructor() {
   }

  ngOnInit(): void {
    this.modelChanged('');
  }

  ChangeMetric(metric: Metric): void {
    this.selectedMetric = metric.type;
    // console.log(metric)
    this.selectedInputUnit = metric.units[0];
    this.selectedOutputUnit = metric.units[1];
    this.inputUnits = metric.units;
    this.outputUnits = metric.units;
    this.changeResult(this.inputNumber, this.selectedInputUnit, this.selectedOutputUnit);
  }

  ChangeInputUnit(newInputUnit: Unit): void {
    this.selectedInputUnit = newInputUnit;
    this.changeResult(this.inputNumber, this.selectedInputUnit, this.selectedOutputUnit);
  }

  ChangeOutputUnit(newOutputUnit: Unit): void {
    this.selectedOutputUnit = newOutputUnit;
    this.changeResult(this.inputNumber, this.selectedInputUnit, this.selectedOutputUnit);
  }

  modelChanged(e): void {
    this.changeResult(this.inputNumber, this.selectedInputUnit, this.selectedOutputUnit);
  }

  changeResult(value: number, inputUnit: Unit, outputUnit: Unit): void {
    this.outputNumber = this.convert(value, inputUnit, outputUnit);
    if (this.selectedMetric === 'Temperature'){
      this.outputNumber = this.convertTemperature(value, inputUnit, outputUnit);
    }
  }

  convert(value: number, inputUnit: Unit, outputUnit: Unit): number {
    const base = value * inputUnit.factor;
    return base / outputUnit.factor;
  }

  convertTemperature(value: number, inputUnit: Unit, outputUnit: Unit): number {
    return inputUnit.name !== outputUnit.name ?
      inputUnit.name === 'Celsius' ?
        (value * inputUnit.factor) + 32
          : (value - 32) * inputUnit.factor
    : value;
  }

  swapUnits(): void {
    const temp = this.selectedInputUnit;
    this.selectedInputUnit = this.selectedOutputUnit;
    this.selectedOutputUnit = temp;
    this.changeResult(this.inputNumber, this.selectedInputUnit, this.selectedOutputUnit);
  }
}
