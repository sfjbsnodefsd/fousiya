import { Component, OnInit } from '@angular/core';
import User from 'src/app/Entity/user';
import { PensionerDetail } from 'src/app/services/user.detail.service';

@Component({
  selector: 'app-pensioner-detail',
  templateUrl: './pensioner-detail.component.html',
  styleUrls: ['./pensioner-detail.component.css']
})
export class PensionerDetailComponent implements OnInit {
  user: User = new User();
  pensioner() {
    var pensionerDetails = this.pensionerDetail.pensioner(this.user);

    pensionerDetails.subscribe(
        (response: any) => {
          alert("valid user");
            console.log(response.message.Name);
    
        },
        (httpErrorResponse:any)=>{
          console.log("ERROR LOGIN")
          console.log(httpErrorResponse.error);
        }
        
      );
  }

  constructor(private pensionerDetail: PensionerDetail) { }

  ngOnInit(): void {
  }

}
