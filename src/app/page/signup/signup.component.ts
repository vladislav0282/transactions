import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  userData:FormGroup

  constructor(private readonly authService:AuthService){
    this.userData = new FormGroup({
      email: new FormControl('',[Validators.required, Validators.email]), /*в скобках указывается: 1-дефолтное значение, 2-[валидация]*/
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    }
    )
  }

  onSubmit(){
    if(this.userData.valid){
      this.authService.signUp(this.userData.value)
    } else{
      console.log("NOT VALID!");
    }
  }
}
