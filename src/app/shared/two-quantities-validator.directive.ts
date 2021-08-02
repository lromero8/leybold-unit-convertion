import { Directive } from '@angular/core';
import { AbstractControl, Validator, NG_VALIDATORS } from '@angular/forms';
import { area, frequency, length, mass, pressure, temperature, time, volume, QuantityDefinition } from 'ng-units';


@Directive({
  selector: '[twoQuantitiesValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: TwoQuantitiesValidator,
    multi: true
  }]
})
export class TwoQuantitiesValidator implements Validator {

  regex: RegExp = /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)+ \b(m²|cm²|mm³|m|cm|mm|in|ft|Hz|kHz|MHz|rpm|g|kg|t|Pa|bar|mbar|Torr|mTorr|psi|inHg|K|°C|°F|ms|s|min|h|m³|cm³|mm³)\b in \b(m²|cm²|mm³|m|cm|mm|in|ft|Hz|kHz|MHz|rpm|g|kg|t|Pa|bar|mbar|Torr|mTorr|psi|inHg|K|°C|°F|ms|s|min|h|m³|cm³|mm³)\b/;
  quantityList: QuantityDefinition[] = [area, frequency, length, mass, pressure, temperature, time, volume];

  validateTwoQuantityDefinitions(fromSymbol: string, toSymbol: string){
    return this.quantityList.find( i => {
      if(Object.keys(i.units).includes(fromSymbol) && Object.keys(i.units).includes(toSymbol))
        return i.name
    })
  }

  validate(control: AbstractControl) : {[key: string]: any} | null {
    if(control.value && this.regex.test(control.value)){
      let strArray = control.value.split(' ');
      let quantity = this.validateTwoQuantityDefinitions(strArray[1], strArray[3]);
      if (quantity === undefined)
        return { 'InvalidQuantities': true };

      return null

    }
    return null;
  }
}