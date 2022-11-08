import { Component, OnInit } from '@angular/core';
import {Pensioner} from 'src/app/Entity/pensioner';
import { PensionerDetail } from 'src/app/services/user.detail.service';

@Component({
  selector: 'app-pensioner-detail',
  templateUrl: './pensioner-detail.component.html',
  styleUrls: ['./pensioner-detail.component.css']
})
export class PensionerDetailComponent implements OnInit {
  pensioner: Pensioner = new Pensioner();
  getDetail() {
    const auth = localStorage.getItem('userToken');
   // const showDetails:boolean =false;
    if(auth == null ||auth.trim() =='')
    {
      console.log(" unautherized");
      alert("unautherized user trying to access details");
    }
    else{
      const pensionerDetails = this.pensionerDetail.getPensionerDetails(this.pensioner,auth);

    pensionerDetails.subscribe(
        (response: any) => {
          alert("valid pensioner");
         // const showDetails:boolean =true;
          this.pensioner._id =response.message._id;
          this.pensioner.Name=response.message.BankName;
          this.pensioner.DateOfBirth=response.DateOfBirth;
          this.pensioner.AadhaarNumber = response.message.AadhaarNumber;
          this.pensioner.PAN = response.message.PAN;
          this.pensioner.SalaryEarned = response.message.SalaryEarned;
          this.pensioner.Allowances = response.message.Allowances;
          this.pensioner.SelfOrFamilyPension =response.message.SelfOrFamilyPension;
          this.pensioner.BankName =response.message.BankName;
          this.pensioner.AccountNumber= response.message.AccountNumber;
          this.pensioner.PublicOrPrivateBank=response.message.PublicOrPrivateBank
          
         
          alert(this.pensioner.Name);
            console.log(this.pensioner.Name);
    
        },
        (httpErrorResponse:any)=>{
          console.log("ERROR LOGIN")
          console.log(httpErrorResponse.error);
        }
        
      );
  }

    }
   
    

  constructor(private pensionerDetail: PensionerDetail) { }

  ngOnInit(): void {
  }

}
