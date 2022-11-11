import { Component, OnInit } from '@angular/core';
import { ProcessPension } from 'src/app/services/process.pension';

@Component({
  selector: 'app-process-pension',
  templateUrl: './process-pension.component.html',
  styleUrls: ['./process-pension.component.css']
})
export class ProcessPensionComponent implements OnInit {

  aadhaarNumber: number = 0;
  pensionAmount: number = 0;
  bankServiceCharge: number = 0;

  processPensionerPension() {

    const auth = localStorage.getItem('userToken');
    if (auth == null || auth.trim() == '') {
      alert('unautherized attempt');
    }
    else {
      const processedPensionDetails = this.processPension.getProcessDetails(this.aadhaarNumber, auth)
      processedPensionDetails.subscribe(
        (response: any) => {
          this.pensionAmount = response.message.pensionAmount;
          console.log(this.pensionAmount);
          this.bankServiceCharge = response.message.bankServiceCharge;
          console.log(this.bankServiceCharge);
        },
        (httpErrorResponse: any) => {
          alert('pensioner does not exist');
          console.log(httpErrorResponse.error);
        }
      )
    }

  }


  constructor(private processPension: ProcessPension) { }

  ngOnInit(): void {
  }

}
