import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Moment } from 'moment';
import { MatDatepicker } from '@angular/material/datepicker';
import * as _moment from 'moment';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';

const moment = _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-month-year-picker',
  templateUrl: './month-year-picker.component.html',
  styleUrls: ['./month-year-picker.component.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class MonthYearPickerComponent {

  constructor(){}
  
  public _fieldName: FormControl = new FormControl(moment());
  @Input()
  public get fieldName(): FormControl {
    return this._fieldName;
  }

  public set fieldName(fc: FormControl) {
    this._fieldName = fc;
  }

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this._fieldName.value;
    ctrlValue.year(normalizedYear.year());
    this._fieldName.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this._fieldName.value;
    ctrlValue.month(normalizedMonth.month());
    this._fieldName.setValue(ctrlValue);
    datepicker.close();
  }

}
