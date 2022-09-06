import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { defineLocale, listLocales } from 'ngx-bootstrap/chronos';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { deLocale } from 'ngx-bootstrap/locale';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
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
    private localeService: BsLocaleService
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
      cost: [null, Validators.required]
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
    const age = this.myForm.controls['age'].value;
    const dateBirthday =  this.myForm.controls['date_birth'].value;
    if(dateBirthday){
      let years = moment().diff(dateBirthday, 'years');
      if(Number(age) !== years){
        return true;
      }

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
    console.log(name)
    if(name)
    {
      console.log
      nameValue = name.split(' ');
      if(nameValue.length < 2){
        return true
      }else{
        nameValue.forEach((element: any) => {
            console.log('llego aca',element)
        });
      }
    }
    return false


  }
  myFunction(){
    const name = this.myForm.controls['name'].value;
    if(name){
      let nameValue = name.split(' ');
      this.validateName = false; 
      nameValue.forEach((element:any) => {
        if(element.length>4){
          this.validateName = true
        }
      });
       
    }
  }
  onSubmit(form: any) {
    if(form.valid){
      let years = moment().diff(form.value.date_birth, 'years');
      if(Number(form.value.age) !== years){
        this.simpleAlert('La edad y fecha de nacimiento no coinciden');
      }
      console.log(form.value.age ,'!==', years);
      console.log('date_birth', form.value.date_birth);
      console.log('date_inscription', form.value.date_inscription);
      console.log('cost', form.value.cost);
      return
    }
    this.validateAllFields(form); 
  }
  validateAllFields(formGroup: FormGroup) {         
    Object.keys(formGroup.controls).forEach(field => {  
        const control = formGroup.get(field);            
        if (control instanceof FormControl) {             
            control.markAsTouched({ onlySelf: true });
        } else if (control instanceof FormGroup) {        
            this.validateAllFields(control);  
        }
    });
}
  simpleAlert(message:string){
    Swal.fire(message);
  }

}
