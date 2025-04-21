export interface TaskCreate {
  title: string,
  description: string,
}

export interface Task extends TaskCreate{
  id: number,
  completed: boolean,
  createdAt: Date
}

export interface TaskEdit extends TaskCreate {
  completed: boolean
}

export type TaskFilter = 'all' | 'active' | 'completed'