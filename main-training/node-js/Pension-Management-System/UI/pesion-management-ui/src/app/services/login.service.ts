import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import User from '../Entity/user';
const BASE_URL = 'http://localhost:5000/api/users';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
   
  login(user: User) : any{
    return this.http.post(`${BASE_URL}+'/login'`, user);
  }

  constructor(private http: HttpClient) {}
}