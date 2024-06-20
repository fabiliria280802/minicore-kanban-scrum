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
import { ListSubtaskComponent } from './components/list-subtask/list-subtask.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { ListSprintComponent } from './components/list-sprint/list-sprint.component';
import { IntegrateEcommerceComponent } from './components/integrate-ecommerce/integrate-ecommerce.component';
import { AuthGuard } from './services/guard/auth.guard';

//definicion de rutas
const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signIn', component: SignInComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'backlog', component: BacklogComponent, canActivate: [AuthGuard] },
  { path: 'create-update-sprint', component: CreateUpdateSprintComponent, canActivate: [AuthGuard] },
  { path: 'create-update-task', component: CreateUpdateTaskComponent, canActivate: [AuthGuard] },
  { path: 'create-update-subtask', component: CreateUpdateSubtaskComponent, canActivate: [AuthGuard] },
  { path: 'create-update-users', component: CreateUpdateUsersComponent, canActivate: [AuthGuard] },
  { path: 'list-task', component: ListTaskComponent, canActivate: [AuthGuard] },
  { path: 'list-subtask', component: ListSubtaskComponent, canActivate: [AuthGuard] },
  { path: 'list-users', component: ListUsersComponent, canActivate: [AuthGuard] },
  { path: 'list-sprint', component: ListSprintComponent, canActivate: [AuthGuard] },
  { path: 'integrate-Ecoommerce', component: IntegrateEcommerceComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login' },
  //{ path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
