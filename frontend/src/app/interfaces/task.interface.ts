export enum status {
  todo = 'Por hacer',
  doing = 'Avanzada',
  done = 'Finalizada',
}

export enum points {
  none = 0,
  one = 1,
  three = 3,
  five = 5,
  eight = 8,
  thirteen = 13,
}

export enum priority{
  low = 'Baja',
  medium = 'Media',
  high = 'Alta',
}

export interface Task {
  idtask?: number;
  idsprint: number;
  iduser: number;
  title: string;
  taskdescription: string;
  status: status;
  points: points;
  priority: priority;
}
