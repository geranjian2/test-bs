import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AbisoftRoutingModule } from './abisoft-routing.module';
import { CreateComponent } from './create/create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    CreateComponent,
  ],
  imports: [
    CommonModule,
    AbisoftRoutingModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
  ]
})
export class AbisoftModule { }
