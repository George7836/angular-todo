import { Component, OnInit } from '@angular/core';
import { TaskService } from '../api/task.service';
import { Task, TaskFilter } from '../types/task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = []
  filteredTasks: Task[] = []
  filter: TaskFilter = 'all'

  constructor(private taskService: TaskService) { }

  applyFilter(filter: TaskFilter) {
    switch(filter) {
      case 'active':
        this.filteredTasks = this.tasks.filter((task) => !task.completed)
        break
      case 'completed':
        this.filteredTasks = this.tasks.filter((task) => task.completed)
        break
      default:
        this.filteredTasks = [...this.tasks]
    }
  }

  onToggleTask(updatedTask: Task) {
    this.taskService.editTask(
      updatedTask.id,
      updatedTask
    ).subscribe({
      next: () => this.applyFilter(this.filter),
    });
  }

  onDeleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe({
      next: () => this.applyFilter(this.filter),
    })
  }

  ngOnInit(): void {
    this.taskService.getTodos().subscribe()
    this.taskService.tasks.subscribe(tasks => {
      this.tasks = tasks
      this.applyFilter(this.filter)
    })
  }
}
