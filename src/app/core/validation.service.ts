import { Injectable } from '@angular/core';

@Injectable()
export class ValidationService {

  constructor() { }
  // formInputs = this.categoryDetailsForm
  // formErrors = this.categoryErrors
  // validationMessages = this.categoryValidationMessages
  onValueChanged(formInputs:any, formErrors:any, validationMessages:any, data?: any){

  if(!formInputs){ return; }
  let errors = null;
    const form = formInputs;
    for(const field in formErrors){
      if(Object.prototype.hasOwnProperty.call(formErrors, field)){

        formErrors[field] = '';
        const control = form.get(field);
        if(control && control.dirty && !control.valid){
          const messages = validationMessages[field];
          if(control.errors){
            for(const key in control.errors){
              if(Object.prototype.hasOwnProperty.call(control.errors, key)){
                formErrors[field] += `${(messages as {[key:string]: string})[key]}`;
              }
            }
          }
        }
      }

    }
    return formErrors;
  }
}
