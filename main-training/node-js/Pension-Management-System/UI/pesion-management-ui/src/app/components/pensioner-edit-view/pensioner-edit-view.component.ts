import { Component, OnInit, Input } from '@angular/core';
import { PensionerEditViewAction } from 'src/app/Entity/pensioner.editview.action.enum';
import { Pensioner } from 'src/app/Entity/pensioner';
import { PensionerDetail } from 'src/app/services/pensioner.detail.service';
import { response } from 'express';
import { HttpErrorResponse } from '@angular/common/http';
import {PentionersListComponent} from 'src/app/components/pentioners-list/pentioners-list.component';


@Component({
  selector: 'app-pensioner-edit-view',
  templateUrl: './pensioner-edit-view.component.html',
  styleUrls: ['./pensioner-edit-view.component.css']
})
export class PensionerEditViewComponent implements OnInit {
  @Input() action: PensionerEditViewAction = PensionerEditViewAction.VIEW;
  pensionerEditViewAction = PensionerEditViewAction;
  pensioner: Pensioner = new Pensioner();




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


  CreatePensioner() {
    const auth = localStorage.getItem('userToken');
    if (auth == null || auth.trim() == '') {
      alert('unauthorized attempt');
    }
    else {
      const createResult = this.pensionerDetail.createPensioner(auth, this.pensioner);
      createResult.subscribe((response: any) => {
        console.log(response.message);
        alert(response.message);

      }, (httpErrorResponse: any) => {
        console.log(httpErrorResponse.error);
        alert(httpErrorResponse.error.message);
      })

    }


  };
  UpdatePensioner() {
    const auth = localStorage.getItem('userToken');
    if (auth == null || auth.trim() == '') {
      alert('unauthorized attempt');
    }
    else {
      const updateResult = this.pensionerDetail.updatePensioner(auth, this.pensioner);
      updateResult.subscribe((response: any) => {
        const result = response.message;
        console.log(response.message);
        alert(response.message);
      },
        (httpErrorResponse: any) => {
          alert(httpErrorResponse.error.message);
          console.log(httpErrorResponse.error.message);
        })


    }



  }






  constructor(private pensionerDetail: PensionerDetail, pentionersListComponent:PentionersListComponent) { }

  ngOnInit(): void {

    this.getAllpensionerDetails();
    
    
    //adhaar input
    //service call get detailsadhaar

  }

}
