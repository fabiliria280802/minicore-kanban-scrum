export enum subtaskstatus {
  todo = 'Por hacer',
  doing = 'Avanzada',
  done = 'Finalizada',
}

export interface Subtask {
  idtask: number;
  iduser: number;
  title: string;
  description: string;
  subtaskstatus: subtaskstatus;
  assignedUser?: string;
}


