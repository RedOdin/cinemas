import { Component, DoCheck, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { IUserModel } from './models/user.model';
import { AppDataService } from './app-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ CookieService ]
})
export class AppComponent implements DoCheck, OnInit {

  public isLogin: boolean = false;
  public account: IUserModel;

  constructor(private readonly cookieService: CookieService,
              private readonly appDataService: AppDataService) {}

  ngOnInit(): void {
    this.isLogin = this.cookieService.check('USER');
  }

  ngDoCheck(): void {
    this.isLogin = this.cookieService.check('USER');
    if (this.isLogin && !this.account) {
      this.appDataService.getAccount().subscribe((user: IUserModel) => {
        this.account = user;
      })
    }
  }

  public exit(): void {
    this.cookieService.delete('USER');
    this.account = undefined;
  }

}
