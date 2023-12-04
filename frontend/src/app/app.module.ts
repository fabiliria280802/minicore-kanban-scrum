import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { ListSprintsComponent } from './components/list-sprints/list-sprints.component';
import { ListTaskComponent } from './components/list-task/list-task.component';
import { ListSubtaskComponent } from './components/list-subtask/list-subtask.component';
import { CreateUpdateSubtaskComponent } from './components/create-update-subtask/create-update-subtask.component';
import { CreateUpdateTaskComponent } from './components/create-update-task/create-update-task.component';
import { CreateUpdateSprintComponent } from './components/create-update-sprint/create-update-sprint.component';
import { CreateUpdateUsersComponent } from './components/create-update-users/create-update-users.component';
import { AuthUsersComponent } from './components/auth-users/auth-users.component';
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './components/login/login.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BacklogComponent } from './components/backlog/backlog.component';

@NgModule({
  declarations: [
    AppComponent,
    ListUsersComponent,
    ListSprintsComponent,
    ListTaskComponent,
    ListSubtaskComponent,
    CreateUpdateSubtaskComponent,
    CreateUpdateTaskComponent,
    CreateUpdateSprintComponent,
    CreateUpdateUsersComponent,
    AuthUsersComponent,
    LoginComponent,
    SignInComponent,
    NavbarComponent,
    DashboardComponent,
    BacklogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
