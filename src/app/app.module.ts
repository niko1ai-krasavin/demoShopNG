import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';

import { HomeComponent } from './shop/home/home.component';
import { ProfileComponent } from './shop/profile/profile.component';
import { BoardAdminComponent } from './shop/board-admin/board-admin.component';
import { BoardUserComponent } from './shop/board-user/board-user.component';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { AuthComponent } from './auth/auth.component'
import { RegistrationComponent } from './auth/registration/registration.component';
import { LoginComponent } from './auth/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardUserComponent,
    AuthComponent,
    RegistrationComponent,
    LoginComponent
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
