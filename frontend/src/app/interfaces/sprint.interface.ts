export interface Sprint {
  idsprint?: number;
  title: string;
  initialDate: string;
  finalDate: string;
  committedPoints?: number;
  fulfilledPoints?: number;
  noFulfilledPoints?: number;
  toDoPorcentage?: number;
  doingPorcentage?: number;
  donePorcentage?: number;
}
