import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../types/task';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() toggle = new EventEmitter<Task>() 
  @Output() delete = new EventEmitter<number>()

  constructor() { }

  onToggle(selected: boolean) {
    this.toggle.emit({ ...this.task, completed: selected });
  }

  onDelete() {
    this.delete.emit(this.task.id);
  }
}
