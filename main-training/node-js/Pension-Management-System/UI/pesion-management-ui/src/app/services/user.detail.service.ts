import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import User from '../Entity/user';
const endpoint='http://localhost:6000/getPensionerDetailByAadhaar'
@Injectable({
    providedIn: 'root',
  })



  export class PensionerDetail {
   
    pensioner(user: User) : any{
      return this.http.get(`${endpoint}/${user.aadhaar}`);
    }
  
    constructor(private http: HttpClient) {}
  }
