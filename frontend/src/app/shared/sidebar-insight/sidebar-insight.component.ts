import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ErrorService } from 'src/app/services/error.service';
import { SprintService } from 'src/app/services/sprint.service';
import { Sprint } from 'src/app/interfaces/sprint.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar-insight',
  templateUrl: './sidebar-insight.component.html',
  styleUrls: ['./sidebar-insight.component.css'],
})
export class SidebarInsightComponent implements OnInit, OnDestroy {
  sprints: Sprint[] = [];
  displayedColumns: string[] = ['title', 'committedPoints', 'fulfilledPoints', 'predictedPointsLower', 'predictedPointsUpper'];
  private apiSubscription: Subscription = new Subscription();
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

    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit() {
    this.fetchLastFiveSprintsData();
  }

  ngOnDestroy(): void {
    this.apiSubscription.unsubscribe();
  }

  fetchLastFiveSprintsData() {
    this.apiSubscription.add(
      this._sprintService.getSprints()
        .subscribe({
          next: (sprints: Sprint[]) => {
            this.sprints = sprints;
          },
          error: (error: HttpErrorResponse) => {
            this.toastr.error('Error fetching sprint data');
          }
        })
    );
  }

  processSprintData(sprints: Sprint[]) {
    this.barChartLabels = sprints.map(sprint => sprint.title);

    // Assuming your sprints array contains the last 5 completed sprints and the upcoming sprint with predictions
    const completedSprintsData = sprints.slice(0, 5).map(sprint => sprint.fulfilledPoints ?? 0); // Last 5 sprints

    const upcomingSprint = sprints[5]; // Upcoming sprint with predictions

    // Assuming you want to include the range in the last bar as a different color or pattern
    this.barChartData = [
      {
        data: completedSprintsData,
        label: 'Completed Points'
      }
    ];

    if (upcomingSprint) {
      // Add the lower predicted point as a separate bar
      this.barChartData.push({
        data: [...completedSprintsData, upcomingSprint.predictedPointsLower ?? 0],
        label: 'Predicted Lower Bound'
      });
      // Add the upper predicted point as a separate bar
      this.barChartData.push({
        data: [...completedSprintsData, upcomingSprint.predictedPointsUpper ?? 0],
        label: 'Predicted Upper Bound'
      });
    }
  }
  cancelar() {
    this.dialogRef.close();
  }
}
