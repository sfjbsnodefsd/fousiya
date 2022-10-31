import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { PipeDemoComponent } from './Components/pipe-demo/pipe-demo.component';
import { RegisteredUsersComponent } from './Components/registered-users/registered-users.component';
import { UserFormComponent } from './Components/user-form/user-form.component';

const routes: Routes = [{path:"", component:HomeComponent}, {path:"register", component:UserFormComponent}, {path:"registered", component:RegisteredUsersComponent},
 { path:"pipe",component:PipeDemoComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }