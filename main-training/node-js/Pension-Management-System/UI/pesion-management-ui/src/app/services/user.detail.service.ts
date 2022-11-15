import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Pensioner } from '../Entity/pensioner';
const endpoint = 'http://localhost:5001/getPensionerDetailByAadhaar'
@Injectable({
  providedIn: 'root',
})



export class PensionerDetail {

  getPensionerDetails(aadhaarNUmber:number, auth: string): any {
    const url = `${endpoint}/${aadhaarNUmber}`;
        return this.http.get(url, { headers: { "authorization": `Bearer ${auth}` } });
  }

  constructor(private http: HttpClient) { }
}
