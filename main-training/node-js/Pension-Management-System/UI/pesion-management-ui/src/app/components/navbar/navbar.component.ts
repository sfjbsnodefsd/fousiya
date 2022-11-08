import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  showLoginLink:boolean = true;
  logout(){
    localStorage.setItem('userToken','');
    this.router.navigate(['/login']);
    
 
  }

  constructor(private router: Router) { }

  ngOnInit(): void {
    const token = localStorage.getItem('userToken');
    this.showLoginLink = token == undefined || token == null;
    
    if(!token || token.trim() ==''){
      this.router.navigate(['/login']);
   }
  }

}
