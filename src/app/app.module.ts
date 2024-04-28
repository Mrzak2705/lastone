import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';

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
import { MessageService } from 'primeng/api'; // nécessaire pour `p-toast`

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AdminBoardComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    AssignProjectsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ToastModule,
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
