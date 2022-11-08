import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Pensioner } from '../Entity/pensioner';
const endpoint = 'http://localhost:6000/getPensionerDetailByAadhaar'
@Injectable({
  providedIn: 'root',
})



export class PensionerDetail {

  getPensionerDetails(pensioner: Pensioner, auth: string): any {
    const url = `${endpoint}/${pensioner.AadhaarNumber}`;
        return this.http.get(url, { headers: { "Autherization": auth } });
  }

  constructor(private http: HttpClient) { }
}
