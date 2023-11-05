export interface Sprint{
  idsprint?: number,
  title?: string,
  initialDate: Date,
  finalDate: Date,
  committedPoints?: number,
  fulfilledPoints?: number,
  noFulfilledPoints?: number,
  toDoPorcentage?:  number,
  doingPorcentage?: number,
  donePorcentage?: number
}
