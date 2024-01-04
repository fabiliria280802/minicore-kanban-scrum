import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SpinnerComponent } from './spinner/spinner.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSortModule } from '@angular/material/sort';
import { MatNativeDateModule } from '@angular/material/core';
import { SidebarInsightComponent } from './sidebar-insight/sidebar-insight.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [SpinnerComponent, SidebarInsightComponent],
  imports: [
    CommonModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatChipsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatToolbarModule,
    MatSortModule,
    FormsModule,
    MatDatepickerModule,
    MatPaginatorModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    NgChartsModule,
    //al importar spinnner component vale kk
    //SpinnerComponent,
  ],
  exports: [
    MatSlideToggleModule,
    MatSliderModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatChipsModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatGridListModule,
    MatDatepickerModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSidenavModule,
    MatSortModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatToolbarModule,
    MatPaginatorModule,
    HttpClientModule,
    SpinnerComponent,
    ReactiveFormsModule,
    NgChartsModule,
  ],
})
export class SharedModule {}
