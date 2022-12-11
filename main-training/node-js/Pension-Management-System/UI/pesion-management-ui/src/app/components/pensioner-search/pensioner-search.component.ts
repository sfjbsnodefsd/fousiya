import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pensioner-search',
  templateUrl: './pensioner-search.component.html',
  styleUrls: ['./pensioner-search.component.css']
})
export class PensionerSearchComponent implements OnInit {

  aadhaarNumber:string = "";
  constructor() { }

  ngOnInit(): void {
  }

  handleSearchClick(adhaarnumber:string){    
      this.aadhaarNumber = adhaarnumber;
  }

}
