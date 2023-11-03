export interface Sprint {
  id: number;
  numSprint: number;
  initialDate: string;
  finalDate: string;
  tasks: Task[];
  committedPoints?: number;
  fulfilledPoints?: number;
  noFulfilledPoints?: number;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  points: number;
  assignedUser?: string;
  subtask: Subtask[];
}

export interface Subtask {
  id: number;
  title: string;
  description: string;
  status: string;
  assignedUser?: string;
}
