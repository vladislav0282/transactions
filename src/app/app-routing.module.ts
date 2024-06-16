import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { LoginComponent } from './page/login/login.component';
import { ProfileComponent } from './page/profile/profile.component';
import { SignupComponent } from './page/signup/signup.component';
import { authGuard } from './guards/auth.guards';

const routes: Routes = [{
  path:'',
  component: HomeComponent,
  title:'Home',
  canActivate:[authGuard()] //для того чтобы незарегистрированный пользователь не мог посетить эту страницу
},
{
  path:'login',
  component: LoginComponent,
},
{
  path:'profile',
  component: ProfileComponent,
  canActivate:[authGuard()]
},
{
  path:'signup',
  component: SignupComponent,
},
{
  // если неправильный(несуществующий роут) редиректит на HomeComponent
  path:'**', 
  component: HomeComponent,
  redirectTo:''
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
