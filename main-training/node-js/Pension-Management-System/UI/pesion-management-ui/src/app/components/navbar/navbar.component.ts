import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  showLoginLink:boolean = true;

  constructor(private router: Router) { }

  ngOnInit(): void {
    const token = localStorage.getItem('userToken');
    this.showLoginLink = token == undefined || token == null;
    
    if(!token){
      this.router.navigate(['/login']);
   }
  }

}
