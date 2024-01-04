import { Component,Inject, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ErrorService } from 'src/app/services/error.service';
import { PredictionService } from 'src/app/services/prediction.service';
import { Prediction } from 'src/app/interfaces/prediction.interface';

@Component({
  selector: 'app-sidebar-insight',
  templateUrl: './sidebar-insight.component.html',
  styleUrls: ['./sidebar-insight.component.css']
})

export class SidebarInsightComponent implements OnInit{
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = ['Tarea', 'Spike'];
  barChartType: ChartType = 'bar';
  barChartData: ChartDataset[] = [
    { data: [65, 59], label: 'Tus puntos' }
  ];
  //llamada a la otra pagina
  id: number | undefined;
  prediction: Prediction | undefined;

  constructor(
    public dialogRef:MatDialogRef<SidebarInsightComponent>,
    private toastr: ToastrService,
    private router: Router,
    private _errorService: ErrorService,
    private _predictionService: PredictionService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.id = data.id;
  }

  ngOnInit() {
    if (this.id !== undefined) {
      this.getPredictionData(this.id);
    }
  }
  getPredictionData(sprintId: number): void {
    this._predictionService.getPrediction(sprintId).subscribe(
      (prediction: Prediction) => {
        this.prediction = prediction;
        this.updateChartData(prediction);
      },
      (error: HttpErrorResponse) => {
        this.toastr.error('Error al obtener la predicción.', 'Error');
      }
    );
  }
  cancelar(){
    this.dialogRef.close();
  }
  updateChartData(prediction: Prediction): void {
    // Aquí actualizas tus datos del gráfico con la información de la predicción.
    // Por ejemplo, si tienes una predicción de puntos para "Tarea" y "Spike",
    // podrías actualizar el barChartData de la siguiente manera:
    this.barChartData = [
      { data: [prediction.predictedPointsLower, prediction.predictedPointsUpper], label: 'Predicción de Puntos' }
    ];
  }
}
