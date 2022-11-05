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
      var loginResultObservable = this.loginService.login(this.user);
      loginResultObservable.subscribe(
        (response: any) => {
          console.log(response);
          if(response){
              if(response.success == 0){  //invalid username or password
                console.log( `ERROR LOGIN ${response}`);
              }
              else{
                console.log( `LOGIN SUCCESS${response}`);
              }
          }
          else{   //SERVICE EXCEPTION
            console.log("ERROR LOGIN")
          }
        },
        function () {
          //console.log(error);
        }
      );

      
  }
   
  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
  }

}
