import { Component, Input, OnInit } from '@angular/core';
import { Pensioner } from 'src/app/Entity/pensioner';
import { PensionerDetail } from 'src/app/services/pensioner.detail.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-pensioner-detail',
  templateUrl: './pensioner-detail.component.html',
  styleUrls: ['./pensioner-detail.component.css']
})
export class PensionerDetailComponent implements OnInit {

  showPensionerDetail : boolean = true;
  private _adhaarnumber: string = "";
  get aadhaarNumber(): string {
    return this._adhaarnumber;
  }
  @Input() set aadhaarNumber(value: string) {
    this._adhaarnumber = value;
    this.getDetail();
  }

  pensioner: Pensioner = new Pensioner();

  getDetail() {
    this.showPensionerDetail = true;
    if(!(this.aadhaarNumber.length > 0)) return;
    const auth = localStorage.getItem('userToken');
    if (auth == null || auth.trim() == '') {
      console.log(" unautherized");
      alert("unautherized user trying to access details");
    }
    else if (!this.utilService.isValidAdhaarNumber(this.aadhaarNumber)) {
      this.pensioner = new Pensioner();      
    }
    else {
      const pensionerDetails = this.pensionerDetail.getPensionerDetails(this.aadhaarNumber, auth);

      pensionerDetails.subscribe(
        (response: any) => {
          this.pensioner = response.message
        },
        (httpErrorResponse: any) => {
          this.pensioner = new Pensioner();
          this.showPensionerDetail = false; 
          console.log(httpErrorResponse.error);
        }

      );
    }

  }

  isValidAdhaarNumber(adhaarnumber: string){
    return this.utilService.isValidAdhaarNumber(adhaarnumber);
  }

  constructor(private pensionerDetail: PensionerDetail, private utilService: UtilService) { }

  ngOnInit(): void {
  }

}
