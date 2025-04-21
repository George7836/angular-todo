import { Component, OnInit } from '@angular/core';
import { TaskService } from '../api/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskCreate, Task } from '../types/task';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  task: TaskCreate | Task = { title: '', description: '' };
  isEditMode = false;
  loading = false;

  constructor(
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const taskId = this.route.snapshot.paramMap.get('taskId');
    
    if (taskId) {
      this.isEditMode = true;
      this.loadTask(Number(taskId));
    }
  }

  loadTask(id: number) {
    this.loading = true;
    this.taskService.getTask(id).subscribe({
      next: (task) => {
        this.task = task;
        this.loading = false;
      },
      error: () => {
        this.router.navigate(['/']);
      }
    });
  }

  onSubmit() {
    if (this.isEditMode) {
      this.editTask();
    } else {
      this.addTask();
    }
  }

  addTask() {
    this.taskService.addTask(this.task as TaskCreate).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
    });
  }

  editTask() {
    if (!this.isEditMode || !('id' in this.task)) return;

    this.taskService.editTask(
      this.task.id,
      { title: this.task.title, description: this.task.description, completed: this.task.completed }
    ).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
    });
  }
}
