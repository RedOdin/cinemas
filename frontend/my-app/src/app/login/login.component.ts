import { Component, OnInit } from '@angular/core';
import { IUserModel } from '../models/user.model';
import { Router } from '@angular/router';
import { AppDataService } from '../app-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public user: IUserModel = {
    email: '',
    password: ''
  };

  constructor(private readonly appDataService: AppDataService,
              private readonly router: Router) { }

  ngOnInit() {
  }

  public signIn(): void {
    this.appDataService.login(this.user).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
