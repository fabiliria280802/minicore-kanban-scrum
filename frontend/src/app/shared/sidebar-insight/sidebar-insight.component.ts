import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ErrorService } from 'src/app/services/error.service';
import { PredictionService } from 'src/app/services/prediction.service';
import { Prediction } from 'src/app/interfaces/prediction.interface';
import { SprintService } from 'src/app/services/sprint.service';
import { Sprint } from 'src/app/interfaces/sprint.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar-insight',
  templateUrl: './sidebar-insight.component.html',
  styleUrls: ['./sidebar-insight.component.css'],
})
export class SidebarInsightComponent implements OnInit, OnDestroy {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartData: ChartDataset[] = [];
  //llamada a la otra pagina
  prediction: any;

  constructor(
    public dialogRef: MatDialogRef<SidebarInsightComponent>,
    private toastr: ToastrService,
    private http: HttpClient,
    private router: Router,
    private _errorService: ErrorService,
    private _sprintService: SprintService,
    private _predictionService: PredictionService,
    private apiSubscription: Subscription,

    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit() {
    this.apiSubscription = this._sprintService.predict().subscribe((data) => {
      this.prediction = data;
    });
  }

  ngOnDestroy(): void {
    if (this.apiSubscription) {
      this.apiSubscription.unsubscribe();
    }
  }
  cancelar() {
    this.dialogRef.close();
  }
}
