export enum subtaskstatus {
  todo = 'Por hacer',
  doing = 'Avanzada',
  done = 'Finalizada',
}

export interface Subtask {
  idsubtask?: number;
  idtask: number;
  iduser: number;
  title: string;
  subtaskdescription: string;
  subtaskstatus: subtaskstatus;
}


