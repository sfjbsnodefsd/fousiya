import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root',
  })
export class UtilService{
  
    regexp= new RegExp("^[2-9]{1}[0-9]{3}\s?[0-9]{4}\s?[0-9]{4}$");
  

    isValidAdhaarNumber(adhaarnumber:string){
        return this.regexp.test(adhaarnumber);
    }

}