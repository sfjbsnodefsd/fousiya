import { Component, OnInit, Input } from '@angular/core';
import { PensionerEditViewAction } from 'src/app/Entity/pensioner.editview.action.enum';
import { Pensioner } from 'src/app/Entity/pensioner';
import { PensionerDetail } from 'src/app/services/pensioner.detail.service';
import { PentionersListComponent } from 'src/app/components/pentioners-list/pentioners-list.component';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pensioner-edit-view',
  templateUrl: './pensioner-edit-view.component.html',
  styleUrls: ['./pensioner-edit-view.component.css']
})
export class PensionerEditViewComponent implements OnInit {
  @Input() action: PensionerEditViewAction = PensionerEditViewAction.VIEW;

  pensionerEditViewAction = PensionerEditViewAction;
   @Input() aadharNumber: string = '';


  pensioner: Pensioner = new Pensioner();

  CreatePensioner() {
    console.log(this.pensioner.Name);
    console.log(this.pensioner.DateOfBirth);
    console.log(this.pensioner.AadhaarNumber);
    console.log(this.pensioner.PAN);
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
        console.log(result);
        alert(response.message);
      }, (httpErrorResponse: any) => {
        alert(httpErrorResponse.error.message);
        console.log(httpErrorResponse.error.message);
      })


    }





  }
  deletePensioner() {
    const auth = localStorage.getItem('userToken');
    if (auth == null || auth.trim() == '') {
      alert('unautherized');
    }
    else {
      const deletedResponse = this.pensionerDetail.deleteRecord(auth, this.aadharNumber);
      deletedResponse.subscribe((response: any) => {
        console.log(response.message);
        alert(response.message);
      }, (HttpErrorResponse: any) => {
        alert(HttpErrorResponse.error.message);
        console.log(HttpErrorResponse.error.message);
      })
    }



  }








  constructor(private pensionerDetail: PensionerDetail, modalService: NgbModal) { }

  ngOnInit(): void {

  }



}

