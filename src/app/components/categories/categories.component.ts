import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {faRemove, faEdit} from  '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  categoryForm:FormGroup

removeIcon=faRemove
editIcon=faEdit

categoryId=0
title=''
method: 'create' | 'update' = 'create'

constructor(public categoryService: CategoryService){
  this.categoryForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
  })
}

ngOnInit(): void { 
  this.categoryService.findAll()
}

onSubmit(){
  if(this.categoryForm.valid){
    if(this.method==='create'){
      this.categoryService.create(this.categoryForm.value.name)
      this.categoryForm.reset()
    } else{
      this.categoryService.update(this.categoryId, this.categoryForm.value.name)
      this.categoryForm.reset()
      this.method='create'
    }
  }
}

delete(id:number){
  this.categoryService.delete(id)
}

edit(id:number, name:string){
  this.categoryId = id
  this.categoryForm.setValue({name:name})
  this.method = 'update'
}

}
