import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { TodoListComponent } from './todo-list.component';
import { TodoService } from '../../services/todo.service';
import { of, throwError } from 'rxjs';
import { DebugElement } from '@angular/core';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let todoServiceSpy: jasmine.SpyObj<TodoService>;

  const mockTodos = [
    { id: '1', title: 'Test Todo 1' },
    { id: '2', title: 'Test Todo 2'  }
  ];

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('TodoService', ['getTodos', 'deleteTodo']);

    await TestBed.configureTestingModule({
      imports: [TodoListComponent],  // standalone true component
      providers: [{ provide: TodoService, useValue: spy }]
    }).compileComponents();

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    todoServiceSpy = TestBed.inject(TodoService) as jasmine.SpyObj<TodoService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load todos on init and set todos array', () => {
    todoServiceSpy.getTodos.and.returnValue(of(mockTodos));

    fixture.detectChanges();  // triggers ngOnInit

    expect(todoServiceSpy.getTodos).toHaveBeenCalled();
    expect(component.todos.length).toBe(2);
    expect(component.todos).toEqual(mockTodos);
  });

  it('should log error if getTodos fails', () => {
    const consoleErrorSpy = spyOn(console, 'error');
    const errorResponse = new Error('Failed to load');

    todoServiceSpy.getTodos.and.returnValue(throwError(() => errorResponse));

    fixture.detectChanges(); // triggers ngOnInit

    expect(todoServiceSpy.getTodos).toHaveBeenCalled();
    expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to load todos', errorResponse);
    expect(component.todos).toEqual([]);
  });

  it('should delete todo and remove it from the list on successful delete', () => {
    // Initialize with todos
    component.todos = [...mockTodos];
    const idToDelete = '1';

    todoServiceSpy.deleteTodo.and.returnValue(of(void 0));

    component.onDelete(idToDelete);

    expect(todoServiceSpy.deleteTodo).toHaveBeenCalledWith(idToDelete);
    expect(component.todos.length).toBe(1);
    expect(component.todos.find(t => t.id === idToDelete)).toBeUndefined();
  });

  it('should log error if deleteTodo fails', () => {
    component.todos = [...mockTodos];
    const consoleErrorSpy = spyOn(console, 'error');
    const idToDelete = '1';

    todoServiceSpy.deleteTodo.and.returnValue(throwError(() => new Error('Delete failed')));

    component.onDelete(idToDelete);

    expect(todoServiceSpy.deleteTodo).toHaveBeenCalledWith(idToDelete);
    expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to delete todo', jasmine.any(Error));
    expect(component.todos.length).toBe(2); // list remains unchanged on error
  });
});
