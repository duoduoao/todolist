// src/app/components/todo-add/todo-add.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-add',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.scss'],
})
export class TodoAddComponent {
  title = '';
  @Output() todoAdded = new EventEmitter<void>();

  constructor(private todoService: TodoService) {}

  addTodo(): void {
    console.log('Add button clicked');

    const trimmedTitle = this.title.trim();
    if (!trimmedTitle) return;

    this.todoService.addTodo(trimmedTitle).subscribe({
      next: () => {
        this.title = '';
        this.todoAdded.emit();
      },
      error: (err) => console.error('Failed to add todo', err),
    });
  }
}
