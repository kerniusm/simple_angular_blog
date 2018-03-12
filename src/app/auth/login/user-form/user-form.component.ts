import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators} from '@angular/forms';

import { AuthService } from '../../../core/auth.service';

type UserFields = 'email' | 'password';
type FormErrors = { [u in UserFields]: string }

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  userForm: FormGroup;
  newUser = true;
  passRest =  false;
  formErrors: FormErrors = {
    'email': '',
    'password': ''
  };
  validationMessages = {
    'email': {
      'required': 'Email is required.',
      'email': 'Email must be valid.',
    },
    'password':{
      'required': 'Password is required',
      'pattern': 'Password must include at one letter and one number',
      'minlength': 'Password must be atleast 4 chars long',
      'maxlength': 'Password cannot be more than 40 chars long'
    }
  }

  constructor(private fb: FormBuilder, private auth: AuthService) { }

  ngOnInit() {
    this.buildForm();
  }

  toggleForm(){
    this.newUser = !this.newUser;
  }

  signUp(){
    this.auth.emailSignUp(this.userForm.value['email'], this.userForm.value['password']);
  }
  logIn(){
    this.auth.emailLogin(this.userForm.value['email'], this.userForm.value['password']);
  }

  buildForm(){
    this.userForm = this.fb.group(
      {
        'email': ['',[
          Validators.required,
          Validators.email
          ]
        ],
        'password': ['',[
          Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
          Validators.minLength(6),
          Validators.maxLength(25),
          ]
        ]
      }
    );
    this.userForm.valueChanges.subscribe(
      (data) => this.onValueChanged(data));

    this.onValueChanged();
  }

  onValueChanged(data?: any){
    if(!this.userForm){ return; }

    const form = this.userForm;
    for(const field in this.formErrors){
      if(Object.prototype.hasOwnProperty.call(this.formErrors, field)){

        this.formErrors[field] = '';
        const control = form.get(field);
        if(control && control.dirty && !control.valid){
          const messages = this.validationMessages[field];
          if(control.errors){
            for(const key in control.errors){
              if(Object.prototype.hasOwnProperty.call(control.errors, key)){
                this.formErrors[field] += `${(messages as {[key:string]: string})[key]}`;
              }
            }
          }
        }
      }

    }
  }

}
