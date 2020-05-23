import { Component, OnInit } from '@angular/core';
import { IUserModel } from '../models/user.model';
import { AppDataService } from '../app-data.service';
import { ICinemaModel } from '../models/cinema.model';

@Component({
  selector: 'app-cinemas',
  templateUrl: './cinemas.component.html',
  styleUrls: ['./cinemas.component.scss']
})
export class CinemasComponent implements OnInit {

  public cinemas: ICinemaModel[];

  constructor(private readonly appDataService: AppDataService) { }

  ngOnInit() {
    this.appDataService.getCinemas().subscribe((cinemas: ICinemaModel[]) => {
      this.cinemas = cinemas;
    })
  }

  public addCinema(id: number): void {
    this.appDataService.addCinema(id).subscribe();
  }

}
