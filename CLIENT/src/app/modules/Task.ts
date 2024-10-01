export interface Task {
  id: number;
  title: string;
  details: string;
  deadline: string;
  priority: string;
  project: string;
  isFinished: boolean;
  isAfterDeadline: boolean;
  userId: number;
}
