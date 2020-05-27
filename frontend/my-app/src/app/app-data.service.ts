import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUserModel } from './models/user.model';
import { ICinemaModel } from './models/cinema.model';
import { ISeatReservedModel } from './models/seat-reserved.model';

@Injectable()
export class AppDataService{

  constructor(private readonly httpClient: HttpClient){
  }

  public registration(user: IUserModel): Observable<any> {
    return this.httpClient.post('http://localhost:3000/registration', user, {withCredentials: true})
  }

  public login(user: IUserModel): Observable<any> {
    return this.httpClient.post('http://localhost:3000/login', user, {withCredentials: true})
  }

  public getCinemas(): Observable<any> {
    return this.httpClient.get('http://localhost:3000/cinemas', {withCredentials: true})
  }

  public getCinema(id: number): Observable<any> {
    return this.httpClient.get(`http://localhost:3000/cinemas/${id}`, {withCredentials: true})
  }

  public getAccount(): Observable<any> {
    return this.httpClient.get('http://localhost:3000/account', {withCredentials: true})
  }

  public addCinema(id: number): Observable<any> {
    return this.httpClient.post('http://localhost:3000/add-cinema', {id: id}, {withCredentials: true})
  }

  public createCinema(cinema: ICinemaModel): Observable<any> {
    return this.httpClient.post('http://localhost:3000/create-cinema', {cinema}, {withCredentials: true})
  }

  public getMyCinemas(): Observable<ICinemaModel[]> {
    return this.httpClient.get<ICinemaModel[]>('http://localhost:3000/my-cinemas', {withCredentials: true})
  }

  public deleteMyCinema(cinema: ICinemaModel): Observable<any> {
    return this.httpClient.post(`http://localhost:3000/delete-my-cinema`,{cinema}, {withCredentials: true})
  }

  public getSeatsReserved(id: number): Observable<any> {
    return this.httpClient.get(`http://localhost:3000/seats-reserved/${id}`, {withCredentials: true})
  }

  public setSeatReserved(seatCinema: ISeatReservedModel): Observable<any> {
    return this.httpClient.post(`http://localhost:3000/seat-reservation`, seatCinema,{withCredentials: true})
  }
}
