import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { response } from 'express';
import { PensionerEditViewAction } from 'src/app/Entity/pensioner.editview.action.enum';

import { Pensioner } from 'src/app/Entity/pensioner';
import { PensionerDetail } from 'src/app/services/pensioner.detail.service';

@Component({
  selector: 'app-pentioners-list',
  templateUrl: './pentioners-list.component.html',
  styleUrls: ['./pentioners-list.component.css']
})
export class PentionersListComponent implements OnInit {
  action:PensionerEditViewAction = PensionerEditViewAction.LIST;
  pensionerTitle:String = "Pentioners-List";
  pensionerEditViewAction = PensionerEditViewAction;

// pensioner: Pensioner = new Pensioner();
//   CreatePensioner() {
//     const auth = localStorage.getItem('userToken');
//     if (auth == null || auth.trim() == '') {
//       alert('unauthorized attempt');
//     }
//     else {
//       const createResult = this.pensionerDetail.createPensioner(auth,this.pensioner);
//       createResult.subscribe((response: any) => {
//         console.log(response.message);
//         alert(response.message);

//       }), (httpErrorResponse: any) => {
//         console.log(httpErrorResponse.error);
//         alert('failed to creating new pensioner ');
//       }

//     }


//   };




  pensionerList: Pensioner[] = [];

  getAllpensionerDetails() {
    const auth = localStorage.getItem('userToken');
    if (auth == null || auth.trim() == '') {
      alert('unauthorized person trying to access pensioner details');
    } else {
      const getAllDetails = this.pensionerDetail.getAllPensionerDetail(auth);
      getAllDetails.subscribe((response: any) => {
        const pensioners = response.message;
        let pensioner: Pensioner;
        for (let i = 0; i < pensioners.length; i++) {
          pensioner = new Pensioner();
          pensioner.Name = pensioners[i].Name;
          pensioner.DateOfBirth = pensioners[i].DateOfBirth;
          pensioner.AadhaarNumber = pensioners[i].AadhaarNumber;
          pensioner.PAN = pensioners[i].PAN;
          pensioner.SalaryEarned = pensioners[i].SalaryEarned;
          pensioner.Allowances = pensioners[i].Allowances;
          pensioner.SelfOrFamilyPension = pensioners[i].SelfOrFamilyPension;
          pensioner.BankDetails.BankName = pensioners[i].BankDetails.BankName;
          pensioner.BankDetails.AccountNumber = pensioners[i].BankDetails.AccountNumber;
          pensioner.BankDetails.PublicOrPrivateBank = pensioners[i].BankDetails.PublicOrPrivateBank;
          this.pensionerList.push(pensioner);
        }
        console.log(this.pensionerList);
      }, (HttpErrorResponse: any) => {
        alert('cannot findpensioner details');
        console.log(HttpErrorResponse.error);
      });

    }


  }
  //pensioners array
  constructor(private pensionerDetail: PensionerDetail) { }

  ngOnInit(): void {
    //service call get list
    this.getAllpensionerDetails();
    this.action = PensionerEditViewAction.LIST;

   
  }

  changeAction(action:PensionerEditViewAction){
   this.action = action;
   switch(action){
    case PensionerEditViewAction.CREATE:
      this.pensionerTitle = "Pensioner Create";
      break;
      case PensionerEditViewAction.VIEW:
      this.pensionerTitle = "Pensioner View";
      break;
      case PensionerEditViewAction.EDIT:
        this.pensionerTitle = "Pensioner Edit";
        break;
   }

  }

}
