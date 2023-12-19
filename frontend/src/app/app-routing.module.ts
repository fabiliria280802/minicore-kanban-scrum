//modulos de angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//componentes
import { LoginComponent } from './components/login/login.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateUpdateSprintComponent } from './components/create-update-sprint/create-update-sprint.component';
import { CreateUpdateTaskComponent } from './components/create-update-task/create-update-task.component';
import { CreateUpdateSubtaskComponent } from './components/create-update-subtask/create-update-subtask.component';
import { CreateUpdateUsersComponent } from './components/create-update-users/create-update-users.component';
import { IndexComponent } from './components/index/index.component';
import { ListTaskComponent } from './components/list-task/list-task.component';
import { BacklogComponent } from './components/backlog/backlog.component';

//definicion de rutas
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signIn', component: SignInComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'backlog', component: BacklogComponent },
  { path: 'create-update-sprint', component: CreateUpdateSprintComponent },
  { path: 'create-update-task', component: CreateUpdateTaskComponent },
  { path: 'create-update-subtask', component: CreateUpdateSubtaskComponent },
  { path: 'create-update-users', component: CreateUpdateUsersComponent },
  { path: 'index', component: IndexComponent },
  { path: 'list-task', component: ListTaskComponent },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
