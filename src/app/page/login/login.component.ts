
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
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
      this.authService.login(this.userData.value)
    } else{
      console.log("NOT VALID!");
    }
  }

}
