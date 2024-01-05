export interface Prediction {
  idprediction: number;
  predictedPointsLower: number;
  predictedPointsUpper: number;
  confidenceInterval: string;
}
