import { Component, OnInit } from '@angular/core';
import { IUserModel } from '../models/user.model';
import { AppDataService } from '../app-data.service';
import { ICinemaModel } from '../models/cinema.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cinemas',
  templateUrl: './cinemas.component.html',
  styleUrls: ['./cinemas.component.scss']
})
export class CinemasComponent implements OnInit {

  public cinemas: ICinemaModel[];

  constructor(private readonly appDataService: AppDataService,
              private readonly router: Router) { }

  ngOnInit() {
    this.appDataService.getCinemas().subscribe((cinemas: ICinemaModel[]) => {
      this.cinemas = cinemas;
    })
  }

  public viewCinema(id: number): void {
    this.router.navigate([`cinema-choice/${id}`]);
  }

}
