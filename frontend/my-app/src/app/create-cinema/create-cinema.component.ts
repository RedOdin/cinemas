import { Component, OnInit } from '@angular/core';
import { ICinemaModel } from '../models/cinema.model';
import { AppDataService } from '../app-data.service';

@Component({
  selector: 'app-create-cinema',
  templateUrl: './create-cinema.component.html',
  styleUrls: ['./create-cinema.component.scss']
})
export class CreateCinemaComponent implements OnInit {

  public cinema: ICinemaModel = {
    title: '',
    description: '',
    image: ''
  };

  constructor(private readonly appDataService: AppDataService) { }

  ngOnInit() {
  }

  public createCinema(): void {
    this.appDataService.createCinema(this.cinema).subscribe();
  }

}
