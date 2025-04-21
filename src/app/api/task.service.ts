import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task, TaskCreate, TaskEdit } from '../types/task';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = '/api/tasks'
  private tasksSubject = new BehaviorSubject<Task[]>([])
  tasks = this.tasksSubject.asObservable()

  constructor(private http: HttpClient) { }

  getTodos() {
    return this.http.get<Task[]>(this.apiUrl).pipe(tap((tasks) => this.tasksSubject.next(tasks)))
  }

  getTask(id: number) {
    return this.http.get<Task>(`${this.apiUrl}/${id}`)
  }

  addTask(task: TaskCreate) {
    return this.http.post<Task>(this.apiUrl, task).pipe(tap((task) => {
      const currentTasks = this.tasksSubject.value
      this.tasksSubject.next([...currentTasks, task])
    }))
  }
  
  editTask(id: number, task: TaskEdit) {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, task).pipe(tap((updatedTask) => {
      const tasks = this.tasksSubject.value.map(t => 
        t.id === id ? updatedTask : t
      );
      this.tasksSubject.next(tasks);
    }))
  }

  deleteTask(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(tap(() => {
      const existingTasks = this.tasksSubject.value.filter((task) => task.id !== id)
      this.tasksSubject.next(existingTasks)
    }))
  }
}
