import { Component, OnInit } from '@angular/core';

import { ReactiveFormsModule, FormGroup, FormBuilder, Validators} from '@angular/forms';

import { CategoriesService } from '../shared/categories.service';

import { NotifyService } from '../../../core/notify.service';

import { Category } from '../shared/category';
import { Router, ActivatedRoute } from '@angular/router';


import { Observable } from 'rxjs/Observable';

type categoryFields =  'title' | 'slug';
type categoryErrors = { [u in categoryFields ]: string};
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  category: Category = new Category();
  id:string = null;
  categoryDetailsForm: FormGroup;
  parentCategories: Category[];
  categoryErrors: categoryErrors = {
    'title': '',
    'slug': ''
  };
  categoryValidationMessages = {
      'title':{
        'required' : "Title is required",
        'maxlength': "Title cannot be more than 120 chars"
      },
      'slug':{
        'required' : "Description is required"
      }
    }
  constructor(private fb:FormBuilder,
     private catS:CategoriesService,
     private aR: ActivatedRoute,
     private router: Router,
     private notify: NotifyService) { }

  ngOnInit() {
    this.catS.getMainCategories().subscribe(result=>{
      this.parentCategories = result;
    })
    this.id = this.aR.snapshot.params.id;

    if(this.id){
      this.catS.getOneCategory(this.id).valueChanges().subscribe(
        result => this.category = result
      );
    }

    this.buildDetailsForm();
  }

  buildDetailsForm(){
    this.categoryDetailsForm = this.fb.group({
      'title': ['',[
        Validators.required,
        Validators.maxLength(120)
      ]],
      'slug':['',[
        Validators.required,
        Validators.maxLength(50)
      ]],
      'parent':[
        ''
      ],
      'visible':[
        false
      ]
    });
    this.categoryDetailsForm.valueChanges.subscribe((data) => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any){
  if(!this.categoryDetailsForm){ return; }

    const form = this.categoryDetailsForm;
    for(const field in this.categoryErrors){
      if(Object.prototype.hasOwnProperty.call(this.categoryErrors, field)){

        this.categoryErrors[field] = '';
        const control = form.get(field);
        if(control && control.dirty && !control.valid){
          const messages = this.categoryValidationMessages[field];
          if(control.errors){
            for(const key in control.errors){
              if(Object.prototype.hasOwnProperty.call(control.errors, key)){
                this.categoryErrors[field] += `${(messages as {[key:string]: string})[key]}`;
              }
            }
          }
        }
      }

    }
  }

  saveCategoryFrom(){
    let result;
    if(this.id){
      result = this.catS.update(this.id, this.categoryDetailsForm.value);
    }else{
      result = this.catS.create(this.categoryDetailsForm.value);
    }
    if(result){
      this.notify.openSnackBar('Category' + this.categoryDetailsForm.value['title'] + ' saved successfully!', 'success');
      result.then(data =>{
        if(data){
          this.router.navigate(['admin/categories/', data.id]);
        }
      });
    }

  }
}
