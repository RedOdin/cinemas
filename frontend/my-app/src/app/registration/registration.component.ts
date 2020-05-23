import { Component, OnInit } from '@angular/core';
import { IUserModel } from '../models/user.model';
import { AppDataService } from '../app-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  public user: IUserModel = {
    email: '',
    password: ''
  };

  constructor(private readonly appDataService: AppDataService,
              private readonly router: Router) { }

  ngOnInit() {
  }

  public registration(): void {
    this.appDataService.registration(this.user).subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
