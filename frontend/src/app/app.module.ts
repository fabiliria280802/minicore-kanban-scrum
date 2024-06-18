// Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { MSAL_INSTANCE, MsalModule, MsalService, MsalGuard, MsalInterceptor, MsalRedirectComponent } from '@azure/msal-angular';
import { IPublicClientApplication, PublicClientApplication, InteractionType } from '@azure/msal-browser';

// Routing
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Otros componentes
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

// Pipes
import { FilterBySprintPipe } from './pipes/filter-by-sprint.pipe';
import { FilterByTaskPipe } from './pipes/filter-by-task.pipe';
import { FilterByUserPipe } from './pipes/filter-by-user.pipe';
import { MAT_DATE_LOCALE } from '@angular/material/core';

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: '9de198f0-7281-4e26-a826-a7ea34900e82',
      authority: 'https://login.microsoftonline.com/common',
      redirectUri: 'http://localhost:49835/',
    },
    cache: {
      cacheLocation: 'localStorage',
      storeAuthStateInCookie: false,
    }
  });
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
    FilterByUserPipe,
    ListSprintComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    MsalModule.forRoot(MSALInstanceFactory(), {
      interactionType: InteractionType.Redirect,
      authRequest: {
        scopes: ['user.read']
      }
    }, {
      interactionType: InteractionType.Redirect,
      protectedResourceMap: new Map([
        ['https://graph.microsoft.com/v1.0/me', ['user.read']]
      ])
    }),
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
      useFactory: MSALInstanceFactory,
    },
    MsalService,
    MsalGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent, MsalRedirectComponent],
})

export class AppModule {}
