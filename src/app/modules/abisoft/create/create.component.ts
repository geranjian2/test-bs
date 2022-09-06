import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { defineLocale, listLocales } from 'ngx-bootstrap/chronos';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { deLocale } from 'ngx-bootstrap/locale';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { BisoftService } from 'src/app/service/bisoft/bisoft.service';
import { ResponseServer } from 'src/app/core/models/response';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  locale = 'es';
  locales = listLocales();
  colorTheme = 'theme-dark-blue';
  bsValue = new Date();
  dateInitial:any;
  myForm!: FormGroup;
  validateName=false;
  bsConfig?: Partial<BsDatepickerConfig>;
  constructor(
    private fb: FormBuilder,
    private bisoftService :BisoftService
  ) { 
    this.dateInitial = moment(Date.now()).subtract(18, 'years').toDate();
    defineLocale('es', deLocale);
  }
  
  ngOnInit(): void {
    
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      age: [null, Validators.required],
      date_birth: [null, Validators.required],
      date_inscription: [null, Validators.required],
      cost: [null]
    },
    {
      validator: this.ConfirmedValidator('age'),
    });
  }
  applyTheme() {
    // create new object on each property change
    // so Angular can catch object reference change
    this.bsConfig = Object.assign({}, { containerClass: this.colorTheme });
    setTimeout(() => {
      // pop.show();
    });
  }
  ageValidator(){
    const age = this.myForm.controls['age'];
    const dateBirthday =  this.myForm.controls['date_birth'];
    if(dateBirthday.value){
      let years = moment().diff(dateBirthday.value, 'years');
      console.log('YEARS::',years);
      console.log('AGE::',age.value);
      if(Number(age.value) !== Number(years)){
        console.log('VALIDO::');
        
        dateBirthday.setErrors({ confirmedValidator: true });
        return true;
      }
      dateBirthday.clearValidators();
      dateBirthday.updateValueAndValidity();
    }
    return false
  }
  ConfirmedValidator(controlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      if(control.value<18){
        control.setErrors({ confirmedValidator: true });
      }
    };
  }

  ValidateName() {
    const name = this.myForm.controls['name'].value;
    let nameValue
    if(name)
    {
      nameValue = name.split(' ');
      if(nameValue.length < 2){
        this.myForm.controls['name'].setErrors({ confirmedValidator: true });
        return true
      }
    }
    return false


  }
  validateLengthNames(){
    const name = this.myForm.controls['name'].value;
    if(name){
      let nameValue = name.split(' ');
      this.validateName = false; 
      nameValue.forEach((element:any) => {
        if(element.length>4){
          this.myForm.controls['name'].setErrors({ confirmedValidator: true });
          this.validateName = true
        }
      });
       
    }
  }

  onSubmit(form: any) {
    console.log(form.valid);
    if(form.valid){
      let years = moment().diff(form.value.date_inscription, 'years');
      let valueCost = 100;
      if(years<1 || years===1){
        form.controls['cost'].setValue(valueCost);
      }else{
        form.controls['cost'].setValue(valueCost * years);
      }
      this.bisoftService.register(form.value)?.subscribe((response:ResponseServer)=>{
        console.log('ResponseServer::', response);
      })
    }
  }

  simpleAlert(message:string){
    Swal.fire(message);
  }

}
