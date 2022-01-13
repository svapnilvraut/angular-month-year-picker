import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  monthYear: FormControl = new FormControl(moment());
}
