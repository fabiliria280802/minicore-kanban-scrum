export interface Subtask {
  id: number;
  title: string;
  description: string;
  status: string;
  assignedUser?: string;
}
