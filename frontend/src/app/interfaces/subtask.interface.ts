export enum status {
  todo = 'Por hacer',
  doing = 'Avanzada',
  done = 'Finalizada',
}

export interface Subtask {
  idsubtask: number;
  idtask: number;
  title: string;
  description: string;
  status: status;
  assignedUser?: string;
}
