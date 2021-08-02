import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UnitConverterComponent } from './unit-converter/unit-converter.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { NgUnitsModule } from 'ng-units';
import { systemOfUnitsInitializer } from './system-of-units-initializer';
import { TwoQuantitiesValidator } from './shared/two-quantities-validator.directive';



@NgModule({
  declarations: [
    AppComponent,
    UnitConverterComponent,
    TwoQuantitiesValidator
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgUnitsModule.forRoot(systemOfUnitsInitializer())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
