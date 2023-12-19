export enum subtaskstatus {
  todo = 'Por hacer',
  doing = 'Avanzada',
  done = 'Finalizada',
}

export interface Subtask {
  idsubtask: number;
  idtask: number;
  title: string;
  description: string;
  Subtaskstatus: subtaskstatus;
  assignedUser?: string;
}
