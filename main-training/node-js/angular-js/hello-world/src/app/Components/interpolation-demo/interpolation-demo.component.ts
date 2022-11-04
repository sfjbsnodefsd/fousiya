import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-interpolation-demo',
  templateUrl: './interpolation-demo.component.html',
  styleUrls: ['./interpolation-demo.component.css']
})
export class InterpolationDemoComponent implements OnInit {
 name:string = "Fousiya";
 lang:string ="javascript";

printAddress(){
  return "I live in ireland, Donegal"
}

  constructor() { }

  ngOnInit(): void {
  }

}
