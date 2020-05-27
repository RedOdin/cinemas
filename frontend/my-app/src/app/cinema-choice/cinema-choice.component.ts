import { Component, OnInit } from '@angular/core';
import { AppDataService } from '../app-data.service';
import { ActivatedRoute } from '@angular/router';
import { ISeatReservedModel } from '../models/seat-reserved.model';
import { ISeatReservationModel } from '../models/seat-reservation.model';
import { ICinemaModel } from '../models/cinema.model';

@Component({
  selector: 'app-cinema-choice',
  templateUrl: './cinema-choice.component.html',
  styleUrls: ['./cinema-choice.component.scss']
})
export class CinemaChoiceComponent implements OnInit {

  public seatReserved: ISeatReservedModel[];
  public seatsReservation: ISeatReservationModel[][] = [];
  public cinema: ICinemaModel;
  private idCinema: number;
  private seatCountInRow = 15;
  private seatRow = 5;

  constructor(private readonly appDataService: AppDataService,
              private readonly activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.idCinema = this.activatedRoute.snapshot.params['id'];
    this.getSeatsReserved();
    this.getCinema();
  }

  private getCinema(): void {
    this.appDataService.getCinema(this.idCinema)
      .subscribe((cinema: ICinemaModel) => {
        this.cinema = cinema;
      });
  }

  private getSeatsReserved(): void {
    this.appDataService.getSeatsReserved(this.idCinema)
      .subscribe((seatReserved: ISeatReservedModel[]) => {
        this.seatReserved = seatReserved;
        this.setSeatsStatus();
      });
  }

  private setSeatsStatus(): void{
    for (let i = 0; i < this.seatRow; i++) {
      this.seatsReservation[i] = [];
      for (let j = 0; j < this.seatCountInRow; j++) {
        const index = j + i * this.seatCountInRow;
        if (this.seatReserved.some((seatReserved: ISeatReservedModel) => seatReserved.seat - 1 === index)) {
          this.seatsReservation[i].push({ seat: index, isReserved: true, isUser: this.seatReserved.find((seat: ISeatReservedModel) => {
              return seat.seat - 1 === index;
            }).isUser } as ISeatReservationModel);
          continue;
        }
        this.seatsReservation[i].push({ seat: index, isReserved: false } as ISeatReservationModel);
      }
    }
  }

  public setSeatReservedStatus(id: number): void {
    this.appDataService.setSeatReserved({seat: id + 1, id_cinema: this.idCinema} as ISeatReservedModel)
      .subscribe(() => {
        this.getSeatsReserved();
      });
  }
}
