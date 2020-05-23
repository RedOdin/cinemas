import { Component, OnInit } from '@angular/core';
import { ICinemaModel } from '../models/cinema.model';
import { AppDataService } from '../app-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-cinemas',
  templateUrl: './my-cinemas.component.html',
  styleUrls: ['./my-cinemas.component.scss']
})
export class MyCinemasComponent implements OnInit {

  public cinemas: ICinemaModel[];

  constructor(private readonly appDataService: AppDataService,
              private readonly router: Router) { }

  ngOnInit() {
    this.appDataService.getMyCinemas().subscribe((cinemas: ICinemaModel[]) => {
      this.cinemas = cinemas;
    },(error => {this.router.navigate(['/login'])}))
  }

  public deleteMyCinema(id: number): void {
    this.appDataService.deleteMyCinema(id).subscribe((data) => {
      this.appDataService.getMyCinemas().subscribe((cinemas: ICinemaModel[]) => {
        this.cinemas = cinemas;
      }, (error => { console.log(error);this.router.navigate(['/login'])}))
    }, (error => {console.log(error);this.router.navigate(['/login'])}));
  }
}
