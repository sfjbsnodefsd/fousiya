import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { response } from 'express';
import { PensionerEditViewAction } from 'src/app/Entity/pensioner.editview.action.enum';
import { Injectable } from "@angular/core";

import { Pensioner } from 'src/app/Entity/pensioner';
import { PensionerDetail } from 'src/app/services/pensioner.detail.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pentioners-list',
  templateUrl: './pentioners-list.component.html',
  styleUrls: ['./pentioners-list.component.css']
})
export class PentionersListComponent implements OnInit {
  action: PensionerEditViewAction = PensionerEditViewAction.LIST;
  pensionerTitle: String = "Pentioners-List";
  currentAadharNumber: String = "";
  pensionerEditViewAction = PensionerEditViewAction;

  pensionerList: Pensioner[] = [];

  getAllpensionerDetails() {
    const auth = localStorage.getItem('userToken');
    if (auth == null || auth.trim() == '') {
      alert('unauthorized person trying to access pensioner details');
    } else {
      const getAllDetails = this.pensionerDetail.getAllPensionerDetail(auth);
      getAllDetails.subscribe((response: any) => {
        const pensioners = response.message;
        let pensioner: Pensioner;
        for (let i = 0; i < pensioners.length; i++) {
          pensioner = new Pensioner();
          pensioner.Name = pensioners[i].Name;
          pensioner.DateOfBirth = pensioners[i].DateOfBirth;
          pensioner.AadhaarNumber = pensioners[i].AadhaarNumber;
          this.pensionerList.push(pensioner);
        }
        console.log(this.pensionerList);
      }, (HttpErrorResponse: any) => {
        alert('cannot findpensioner details');
        console.log(HttpErrorResponse.error);
      });

    }


  }
  //pensioners array
  constructor(private pensionerDetail: PensionerDetail, private router:Router) { }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    //service call get list
    this.getAllpensionerDetails();
    this.action = PensionerEditViewAction.LIST;



  }

  changeAction(clickAction: PensionerEditViewAction, adhaarNumber: String) {
    this.action = clickAction;
    this.currentAadharNumber = adhaarNumber;
    switch (clickAction) {
      case PensionerEditViewAction.CREATE:
        this.pensionerTitle = "Pensioner Create";

        break;
      case PensionerEditViewAction.VIEW:
        this.pensionerTitle = "Pensioner View";
        break;
      case PensionerEditViewAction.EDIT:
        this.pensionerTitle = "Pensioner Edit";
        break;
      case PensionerEditViewAction.DELETE:
        this.pensionerTitle = "Delete Record";
        break;
    }

  }

}
