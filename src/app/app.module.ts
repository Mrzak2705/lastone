import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminBoardComponent } from './admin-board/admin-board.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { AssignProjectsComponent } from './assign-projects/assign-projects.component';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { ProjectAssignmentService } from './_services/project-assignment.service'; // vérifiez le chemin
import { UserService } from './_services/user.service'; // vérifiez le chemin
import { MessageService } from 'primeng/api';
import { ProjectManagementComponent } from './project-management/project-management.component'; // nécessaire pour `p-toast`


import { DashboardComponent } from './dashboard/dashboard.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HeaderComponent } from './header/header.component';



import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    SidenavComponent,
    LoginComponent,
    RegisterComponent,
    AdminBoardComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    AssignProjectsComponent,
    ProjectManagementComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DialogModule,
    ToastModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatMenuModule 
  ],
  providers: [
    authInterceptorProviders,
    ProjectAssignmentService, // fournisseur ajouté
    UserService, // fournisseur ajouté
    MessageService, // fournisseur ajouté
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
