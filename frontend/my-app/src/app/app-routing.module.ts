import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CinemasComponent } from './cinemas/cinemas.component';
import { MyCinemasComponent } from './my-cinemas/my-cinemas.component';
import { RegistrationComponent } from './registration/registration.component';
import { CreateCinemaComponent } from './create-cinema/create-cinema.component';


const routes: Routes = [
  {
    path: '',
    component: CinemasComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: 'my-cinemas',
    component: MyCinemasComponent
  },
  {
    path: 'create-cinema',
    component: CreateCinemaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
