import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
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
    CreateUpdateUsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatSliderModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
