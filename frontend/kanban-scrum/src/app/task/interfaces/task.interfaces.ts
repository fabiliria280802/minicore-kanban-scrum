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
