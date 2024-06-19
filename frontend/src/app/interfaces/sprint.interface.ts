export enum sprintstatus {
  toStart = 'Por iniciar',
  initialize = 'Iniciado',
  completed = 'Completado',
}

export interface Sprint {
  id?: number;
  idprediction?: number;
  title: string;
  initialDate: string;
  finalDate: string;
  committedPoints?: number;
  fulfilledPoints?: number;
  pendingPoints?: number;
  noFulfilledPoints?: number;
  toDoPorcentage?: number;
  doingPorcentage?: number;
  donePorcentage?: number;
  sprintstatus?: sprintstatus;
  predictedPointsLower?: number;
  predictedPointsUpper?: number;
  confidenceInterval?: string;
}
