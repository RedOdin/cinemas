import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { CinemasComponent } from './cinemas/cinemas.component';
import { CinemaComponent } from './cinema/cinema.component';
import { MyCinemasComponent } from './my-cinemas/my-cinemas.component';
import { FormsModule } from '@angular/forms';
import { AppDataService } from './app-data.service';
import { HttpClientModule } from '@angular/common/http';
import { CreateCinemaComponent } from './create-cinema/create-cinema.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    CinemasComponent,
    CinemaComponent,
    MyCinemasComponent,
    CreateCinemaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AppDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
