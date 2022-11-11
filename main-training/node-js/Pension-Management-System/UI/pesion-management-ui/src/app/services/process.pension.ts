import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

const endpoint = 'http://localhost:5002';
@Injectable({
  providedIn: 'root',
})



export class ProcessPension {

  getProcessDetails(aadhaarNumber:number, auth: string): any {
    const url = `${endpoint}/ProcessPension`;
        return this.http.post(url,{aadhaar:aadhaarNumber}, { headers: { "authorization": `Bearer ${auth}` } });
  }

  constructor(private http: HttpClient) { }
}
