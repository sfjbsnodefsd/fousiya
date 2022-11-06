import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import User from '../../Entity/user';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  
  user: User = new User();
  
  title = "Login";
  
  login(){
     
      //validation

      var loginResultObservable = this.loginService.login(this.user);
      loginResultObservable.subscribe(
        (response: any) => {
          //set cookie          
           alert('valid user');
        },
        (httpErrorResponse:any)=>{
          console.log("ERROR LOGIN")
          console.log(httpErrorResponse.error);
        }
        
      );

      
  }
   
  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
  }

}
