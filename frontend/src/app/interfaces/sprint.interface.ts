export interface Sprint {
  title: string;
  // TODO: agregar DESCRIPCION
  initialDate: string;
  finalDate: string;
  committedPoints?: number;
  fulfilledPoints?: number;
  noFulfilledPoints?: number;
  toDoPorcentage?: number;
  doingPorcentage?: number;
  donePorcentage?: number;
}
