import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IAuthUser, IUser } from '../types/user.interface';
import { API_URL } from '../constants/constants';
import { catchError, tap } from 'rxjs';

/*означает что AuthService можно использовать на всех уровнях нашего приложения*/
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthSig = signal<boolean>(false)

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly toastr: ToastrService,
  ) {
    const token = localStorage.getItem('token')
    this.isAuthSig.set(!!token)
  }


  signUp(userData:IAuthUser){
    return this.http.post<IAuthUser>(`${API_URL}/user/signup`, userData)
    .pipe(
      tap(()=>{this.login(userData)}), //чтобы при регистрации сразу происходил login
      catchError(err=>{
        this.handleError(err)
        throw new Error(err.message)
      })
    )
    .subscribe(()=>this.toastr.success('created')
    )
  }

  login(userData:IAuthUser){
    return this.http.post<IUser>(`${API_URL}/user/login`, userData)
    .pipe(
      tap((res:IUser)=>{
        localStorage.setItem('token', res.token)
        this.isAuthSig.set(true) //при коррекном логине устанавливаем значение true
      }),
      catchError(err=>{
        this.handleError(err)
        throw new Error(err.message)
      })
    )
    .subscribe(()=> {
      this.toastr.success('logeed in')
      this.router.navigate(['/home'])
    }
  )
  }

  logout(){
    localStorage.removeItem('token')
    this.isAuthSig.set(false)
    this.router.navigate(['/login'])
    this.toastr.success('logget out')
  }

  // функция которая показывает информацию об ошибке
  private handleError(err:HttpErrorResponse):void{
    this.toastr.error(err.error.message)
  }
}
