import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PensionerDetailComponent } from './components/pensioner-detail/pensioner-detail.component';
import { PentionersListComponent } from './components/pentioners-list/pentioners-list.component';
import { ProcessPensionComponent } from './components/process-pension/process-pension.component';
import { UserLoginComponent } from './components/user-login/user-login.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "pensioners", component: PentionersListComponent },
   { path: "pensionerdetail", component: PensionerDetailComponent },
  { path: "pension", component: ProcessPensionComponent },{path:"login",component:UserLoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
