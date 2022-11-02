import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  
  title = "Login";
  username = "";
  password = "";
  save(){
    console.log(this.password + " " + this.username);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
