// Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { MSAL_INSTANCE, MsalModule, MsalService } from '@azure/msal-angular';
import { IPublicClientApplication } from '@azure/msal-browser';
// Routing
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//adiccionals
import { ListUsersComponent } from './components/list-users/list-users.component';
import { ListTaskComponent } from './components/list-task/list-task.component';
import { ListSubtaskComponent } from './components/list-subtask/list-subtask.component';
import { CreateUpdateSubtaskComponent } from './components/create-update-subtask/create-update-subtask.component';
import { CreateUpdateTaskComponent } from './components/create-update-task/create-update-task.component';
import { CreateUpdateSprintComponent } from './components/create-update-sprint/create-update-sprint.component';
import { CreateUpdateUsersComponent } from './components/create-update-users/create-update-users.component';
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './components/login/login.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BacklogComponent } from './components/backlog/backlog.component';
import { IndexComponent } from './components/index/index.component';
import { SprintActiveComponent } from './components/sprint-active/sprint-active.component';
import { ListSprintComponent } from './components/list-sprint/list-sprint.component';

//pipes
import { FilterBySprintPipe } from './pipes/filter-by-sprint.pipe';
import { FilterByTaskPipe } from './pipes/filter-by-task.pipe';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { PublicClientApplication } from '@azure/msal-browser';

export function MSALInstanceFactory(): IPublicClientApplication{
  return new PublicClientApplication({
      auth:{
        clientId: '9de198f0-7281-4e26-a826-a7ea34900e82',
        redirectUri: 'https://minicore-kanban-scrum-4v57pnk1w-fabiliria280802s-projects.vercel.app/backlog'
      }
  })
}

@NgModule({
  declarations: [
    AppComponent,
    ListUsersComponent,
    ListTaskComponent,
    ListSubtaskComponent,
    CreateUpdateSubtaskComponent,
    CreateUpdateTaskComponent,
    CreateUpdateSprintComponent,
    CreateUpdateUsersComponent,
    LoginComponent,
    SignInComponent,
    NavbarComponent,
    DashboardComponent,
    BacklogComponent,
    IndexComponent,
    SprintActiveComponent,
    FilterBySprintPipe,
    FilterByTaskPipe,
    ListSprintComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MsalModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
  ],
  providers: [
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'es',
    },
    {
      provide: MSAL_INSTANCE,
      useValue: MSALInstanceFactory,
    },
    MsalService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
