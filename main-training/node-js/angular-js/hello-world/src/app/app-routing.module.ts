import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';

import { UserFormComponent } from './Components/user-form/user-form.component';

const routes: Routes = [{path :"", component:HomeComponent}, {path:"register", component:UserFormComponent}];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
