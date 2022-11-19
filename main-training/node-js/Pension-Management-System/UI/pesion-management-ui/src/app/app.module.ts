import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { PensionerDetailComponent } from './components/pensioner-detail/pensioner-detail.component';
import { ProcessPensionComponent } from './components/process-pension/process-pension.component';
import { PentionersListComponent } from './components/pentioners-list/pentioners-list.component';


@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    NavbarComponent,
    HomeComponent,
    PensionerDetailComponent,
    ProcessPensionComponent,
    PentionersListComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
