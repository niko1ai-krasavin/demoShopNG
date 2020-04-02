import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './shop/register/register.component';
import { LoginComponent } from './shop/login/login.component';
import { HomeComponent } from './shop/home/home.component';
import { ProfileComponent } from './shop/profile/profile.component';
import { BoardUserComponent } from './shop/board-user/board-user.component';
import { BoardAdminComponent } from './shop/board-admin/board-admin.component';



const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
  { 
    path: 'mod',
    loadChildren: () => import('src/app/shop/board-moderator/moderator.module').then(m => m.ModeratorModule)
  },
  { path: 'admin', component: BoardAdminComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
