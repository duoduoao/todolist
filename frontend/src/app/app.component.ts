// src/app/app.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Child components
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoAddComponent } from './components/todo-add/todo-add.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule,
    TodoListComponent,
    TodoAddComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {}
