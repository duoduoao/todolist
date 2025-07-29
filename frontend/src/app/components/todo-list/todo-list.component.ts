// src/app/components/todo-list/todo-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from '../../services/todo.service';
import { TodoItem } from '../../models/todo-item.model';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  todos: TodoItem[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.todoService.getTodos().subscribe({
      next: (todos) => (this.todos = todos),
      error: (err) => console.error('Failed to load todos', err),
    });
  }

  onDelete(id: string): void {
    this.todoService.deleteTodo(id).subscribe({
      next: () => {
        this.todos = this.todos.filter(todo => todo.id !== id);
      },
      error: (err) => console.error('Failed to delete todo', err),
    });
  }
}
