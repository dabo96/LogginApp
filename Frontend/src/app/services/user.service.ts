import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = 'http://localhost:3000/';
    this.myApiUrl = 'api/users';
  }

  singIn(user: User): Observable<any>{
    console.log(' url app ', this.myAppUrl+this.myApiUrl)
    return this.http.post(this.myAppUrl+this.myApiUrl, user);
  }
}
