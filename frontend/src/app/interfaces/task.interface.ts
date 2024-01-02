export enum status {
  todo = 'Por hacer',
  doing = 'Avanzada',
  done = 'Finalizada',
}

export enum points {
  none = '-',
  one = '1',
  three = '3',
  five = '5',
  eight = '8',
  thirteen = '13',
}

export interface Task {
  idsprint: number;
  iduser: number;
  title: string;
  description: string;
  status: status;
  points: points;
  assignedUser?: string;
}
