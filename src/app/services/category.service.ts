import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ICategory } from '../types/category.interface';
import { API_URL } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categoriesSig = signal<ICategory[]>([])

  constructor(private readonly http:HttpClient, 
    private readonly toastr:ToastrService) {}

    findAll(){
      return this.http.get<ICategory[]>('category/getall').subscribe((categories:ICategory[])=>{
        this.categoriesSig.set(categories)
      })
    }

    create(name:string){
      return this.http.post<ICategory>('category/create', {name}).subscribe((newCategory:ICategory)=>{
        this.categoriesSig.update((categories)=>[...categories, newCategory])
        this.toastr.success('Created')
      })
    }

    delete(id:number){
      return this.http.delete<ICategory>(`category/delete/${id}`).subscribe(()=>{
        this.categoriesSig.update((categories)=>categories.filter((category)=>category.id !==id))
        this.toastr.warning('Deleted')
      }
      )
    }

    update(id:number, name:string){
      return this.http.put<ICategory>(`category/update/${id}`, {name}).subscribe(()=>{
        this.categoriesSig.update((categories)=>categories.map((ctg)=>ctg.id === id ? {...ctg, name}: ctg))
        this.toastr.success('Updated')
    })
    }
}
