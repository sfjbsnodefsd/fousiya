import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Pensioner } from '../Entity/pensioner';
const endpoint = 'http://localhost:5001'
@Injectable({
  providedIn: 'root',
})



export class PensionerDetail {

  getPensionerDetails(aadhaarNUmber:String, auth: string): any {
    const url = `${endpoint}/getPensionerDetailByAadhaar/${aadhaarNUmber}`;
        return this.http.get(url, { headers: { "authorization": `Bearer ${auth}` } });
  }

  getAllPensionerDetail(auth:string){
    const url = `${endpoint}/getAllPensionerDetails`;
    return this.http.get(url,{headers:{"authorization":`Bearer ${auth}`}});

  }
  createPensioner(auth:string,pensioner:Pensioner){
    const url =  `${endpoint}/createPensionerDetail`;
    return this.http.post(url,pensioner,{headers:{"authorization":`Bearer ${auth}`}});
  }


updatePensioner(auth:string,pensioner:Pensioner){
  const url = `${endpoint}/updatePensionerDetails`;
  return this.http.put(url,pensioner,{headers:{"authorization": `Bearer ${auth}`}});
}

deleteRecord(auth:string,aadhaarNUmber:String){
  const url =`${endpoint}/deletePensioner/${aadhaarNUmber}`;
  return this.http.delete(url,{headers:{"authorization": `Bearer ${auth}`}});
}




  constructor(private http: HttpClient) { }
}
