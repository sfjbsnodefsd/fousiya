import { Component, OnInit,Input } from '@angular/core';
import { PensionerEditViewAction } from 'src/app/Entity/pensioner.editview.action.enum';
import { Pensioner } from 'src/app/Entity/pensioner';
import { PensionerDetail } from 'src/app/services/pensioner.detail.service';


@Component({
  selector: 'app-pensioner-edit-view',
  templateUrl: './pensioner-edit-view.component.html',
  styleUrls: ['./pensioner-edit-view.component.css']
})
export class PensionerEditViewComponent implements OnInit {
  @Input() action:PensionerEditViewAction = PensionerEditViewAction.VIEW;
  pensionerEditViewAction = PensionerEditViewAction;
  pensioner: Pensioner = new Pensioner();
  CreatePensioner() {
    const auth = localStorage.getItem('userToken');
    if (auth == null || auth.trim() == '') {
      alert('unauthorized attempt');
    }
    else {
      const createResult = this.pensionerDetail.createPensioner(auth,this.pensioner);
      createResult.subscribe((response: any) => {
        console.log(response.message);
        alert(response.message);

      }), (httpErrorResponse: any) => {
        console.log(httpErrorResponse.error);
        alert('failed to creating new pensioner ');
      }

    }


  };
  constructor(private pensionerDetail: PensionerDetail) { }

  ngOnInit(): void {
  }

}
