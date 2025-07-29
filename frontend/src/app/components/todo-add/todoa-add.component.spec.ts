import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoAddComponent } from './todo-add.component';
import { TodoService } from '../../services/todo.service';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe('TodoAddComponent', () => {
  let component: TodoAddComponent;
  let fixture: ComponentFixture<TodoAddComponent>;
  let todoServiceSpy: jasmine.SpyObj<TodoService>;

  beforeEach(async () => {
    // Create a spy for TodoService with addTodo method
    const spy = jasmine.createSpyObj('TodoService', ['addTodo']);

    await TestBed.configureTestingModule({
      imports: [TodoAddComponent, FormsModule], // TodoAddComponent is standalone; include FormsModule if needed
      providers: [
        { provide: TodoService, useValue: spy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TodoAddComponent);
    component = fixture.componentInstance;
    todoServiceSpy = TestBed.inject(TodoService) as jasmine.SpyObj<TodoService>;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should NOT call addTodo if title is empty or whitespace', () => {
    component.title = '   ';
    component.addTodo();
    expect(todoServiceSpy.addTodo).not.toHaveBeenCalled();
  });

  it('should call todoService.addTodo with trimmed title and emit todoAdded on success', () => {
    component.title = ' New Todo ';
    const emittedSpy = spyOn(component.todoAdded, 'emit');

    // Make addTodo return an observable that completes successfully
    todoServiceSpy.addTodo.and.returnValue(of({ id: '1', title: 'Test Todo' }));

    component.addTodo();

    expect(todoServiceSpy.addTodo).toHaveBeenCalledWith('New Todo');
    expect(component.title).toBe(''); // title cleared after success
    expect(emittedSpy).toHaveBeenCalled();
  });

  it('should log error when todoService.addTodo fails', () => {
    component.title = 'Test fail';

    const consoleErrorSpy = spyOn(console, 'error');
    todoServiceSpy.addTodo.and.returnValue(throwError(() => new Error('Add failed')));

    component.addTodo();

    expect(todoServiceSpy.addTodo).toHaveBeenCalledWith('Test fail');
    expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to add todo', jasmine.any(Error));
  });
});
