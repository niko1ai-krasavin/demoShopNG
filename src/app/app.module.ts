import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { LoginComponent } from './shop/login/login.component';
import { RegisterComponent } from './shop/register/register.component';
import { HomeComponent } from './shop/home/home.component';
import { ProfileComponent } from './shop/profile/profile.component';
import { BoardAdminComponent } from './shop/board-admin/board-admin.component';
import { BoardUserComponent } from './shop/board-user/board-user.component';

import { authInterceptorProviders } from './_helpers/auth.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {

}
