import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalServiceService } from './global-service.service';

@Injectable({
  providedIn: 'root'
})
export class AdministrationService {

  public URL: string = 'http://165.22.229.164:8088';
  // public URL: string = 'http://localhost:8088';

  constructor(public http: HttpClient, private globalService: GlobalServiceService) { }

  loginUser(data): Observable<any> {
    return this.http.post<any>(`${this.URL}/users/login`, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  registerUser(data): Observable<any> {
    return this.http.post<any>(`${this.URL}/users/register`, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  createPractice(data): Observable<any> {
    return this.http.post<any>(`${this.URL}/practices/practice`, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.globalService.token
      })
    });
  }

  getTrainings(): Observable<any> {
    return this.http.get<any>(`${this.URL}/trainings/get-all`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.globalService.token
      })
    });
  }

  getExcercises(): Observable<any> {
    return this.http.get<any>(`${this.URL}/trainings/exercises`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.globalService.token
      })
    });
  }

  getTrainingById(id: number): Observable<any> {
    return this.http.get<any>(`${this.URL}/trainings/training/${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.globalService.token
      })
    });
  }

  getPractice(id: number): Observable<any> {
    return this.http.get<any>(`${this.URL}/practices/user/${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.globalService.token
      })
    });
  }
}
