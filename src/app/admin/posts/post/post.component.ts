import { Component, OnInit } from '@angular/core';

import { ReactiveFormsModule, FormGroup, FormBuilder, Validators} from '@angular/forms';

import { PostsService } from '../shared/posts.service';

import { NotifyService } from '../../../core/notify.service';
import { ValidationService } from '../../../core/validation.service';

import { Post } from '../shared/post';
import { Router, ActivatedRoute } from '@angular/router';


import { Observable } from 'rxjs/Observable';
import { CategoriesService } from '../../categories/shared/categories.service';

type PostFields =  'title' | 'description' | 'short_description' | 'image_url' | 'slug' | 'category';

type PostErrors = { [u in PostFields ]: string};
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  categories: any;
  post: Post = new Post();

  tinyMCESettings = {
  height: 250,
  plugins: [
  "advlist autolink autosave link image lists charmap print preview hr anchor pagebreak",
  "searchreplace wordcount codesample visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
  "table contextmenu directionality emoticons template textcolor paste fullpage textcolor colorpicker textpattern"
  ],
  toolbar1: "bold italic underline strikethrough |styleselect formatselect fontselect fontsizeselect",
  toolbar2: "cut copy paste | searchreplace | bullist numlist | outdent indent blockquote | undo redo | link unlink anchor codesample image media code | insertdatetime preview | forecolor backcolor",
  toolbar3: "table | hr removeformat | subscript superscript | charmap emoticons | print fullscreen | ltr rtl | visualchars visualblocks nonbreaking template pagebreak restoredraft",
  menubar: false,
  toolbar_items_size: 'small',
  resize:false,
  skin_url: '/assets/tinymce/skins/lightgray',
  content_css: [
    '/assets/plugins/codesample/css/prism.css'
  ]
  }

  id:string = null;
  postForm: FormGroup;
  postErrors: PostErrors = {
    'title': '',
    'description': '',
    'short_description': '',
    'image_url': '',
    'slug': '',
    'category': ''
  };
  postValidationMessages = {
      'title':{
        'required' : "Title is required",
        'maxlength': "Title cannot be more than 120 chars"
      },
      'slug':{
        'required' : "Slug is required"
      },
      'short_description':{
        'maxlength': "Title cannot be more than 250 chars"
      },
      'description':{
        'required' : "Description is required"
      },
      'category':{
        'required' : "Category is required"
      }
    }
  constructor(private fb: FormBuilder,
     private cS:CategoriesService,
     private vS:ValidationService,
     private pS: PostsService,
     private notify:NotifyService,
     private router: Router,
     private aR: ActivatedRoute) { }

  ngOnInit() {

    this.cS.getCategoriesSnapshot().subscribe(
      (categories)=>{
        this.categories = categories;
      }
    );
    this.id = this.aR.snapshot.params.id;

    if(this.id){
      this.pS.getOnePost(this.id).valueChanges().subscribe(
        result => this.post = result
      );
    }
    this.buildDetailsForm();
  }
  buildDetailsForm(){
    this.postForm = this.fb.group({
      'title': ['',[
        Validators.required,
        Validators.maxLength(120)
      ]],
      'slug':['',[
        Validators.required,
        Validators.maxLength(50)
      ]],
      'short_description':['',[
        Validators.maxLength(250)
      ]],
      'description':[
        ''
      ],
      'category':[
        ''
      ],
      'image_url':[
        ''
      ],
      'visible':[
        false
      ]
    });

    // formInputs = this.categoryDetailsForm
    // formErrors = this.categoryErrors
    // validationMessages = this.categoryValidationMessages
    this.postForm.valueChanges.subscribe((data) => this.postErrors =  this.vS.onValueChanged(this.postForm,this.postErrors,this.postValidationMessages, data));
    this.postErrors = this.vS.onValueChanged(this.postForm,this.postErrors,this.postValidationMessages);
  }

  savePostFrom(){
    let result;
    if(this.id){
      result = this.pS.update(this.id, this.postForm.value);
    }else{
      result = this.pS.create(this.postForm.value);
    }
    if(result){
      this.notify.openSnackBar('Post ' + this.postForm.value['title'] + ' saved successfully!', 'success');
      result.then(data =>{
        if(data){
          this.router.navigate(['admin/posts/', data.id]);
        }
      });
    }

  }

}
