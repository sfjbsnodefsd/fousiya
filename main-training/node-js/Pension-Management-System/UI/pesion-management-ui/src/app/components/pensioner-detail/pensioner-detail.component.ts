import { Component, OnInit } from '@angular/core';
import { Pensioner } from 'src/app/Entity/pensioner';
import { PensionerDetail } from 'src/app/services/pensioner.detail.service';

@Component({
  selector: 'app-pensioner-detail',
  templateUrl: './pensioner-detail.component.html',
  styleUrls: ['./pensioner-detail.component.css']
})
export class PensionerDetailComponent implements OnInit {
  pensioner: Pensioner = new Pensioner();
  aadhaarNumber: string = '';

  getDetail() {
    const auth = localStorage.getItem('userToken');
    // const showDetails:boolean =false;
    if (auth == null || auth.trim() == '') {
      console.log(" unautherized");
      alert("unautherized user trying to access details");
    }
    else {
      const pensionerDetails = this.pensionerDetail.getPensionerDetails(this.aadhaarNumber, auth);

      pensionerDetails.subscribe(
        (response: any) => {

          // const showDetails:boolean =true;
          this.pensioner = response.message;


        },
        (httpErrorResponse: any) => {
          alert("pensioner does not exists");
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
