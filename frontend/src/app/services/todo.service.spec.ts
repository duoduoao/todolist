import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TodoService } from './todo.service';
import { TodoItem } from '../models/todo-item.model';

describe('TodoService', () => {
  let service: TodoService;
  let httpMock: HttpTestingController;

  const apiUrl = 'http://localhost:5160/api/todo';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TodoService]
    });

    service = TestBed.inject(TodoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verify no outstanding HTTP requests remain
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getTodos should fetch an array of todos via GET', () => {
    const mockTodos: TodoItem[] = [
      { id: '1', title: 'Todo 1'  },
      { id: '2', title: 'Todo 2'  }
    ];

    service.getTodos().subscribe(todos => {
      expect(todos.length).toBe(2);
      expect(todos).toEqual(mockTodos);
    });

    // Expecting one GET request to apiUrl with no body
    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockTodos); // Respond with mock data
  });

  it('#addTodo should post new todo and return the added item', () => {
    const newTitle = 'New Todo';
    const mockResponse: TodoItem = { id: '3', title: 'newTitle' };

    service.addTodo(newTitle).subscribe(todo => {
      expect(todo).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ title: newTitle });

    req.flush(mockResponse);
  });

  it('#deleteTodo should send a DELETE request and return void', () => {
    const idToDelete = '3';

    service.deleteTodo(idToDelete).subscribe(response => {
      expect(response).toBeNull(); // DELETE returns void
    });

    const req = httpMock.expectOne(`${apiUrl}/${idToDelete}`);
    expect(req.request.method).toBe('DELETE');

    req.flush(null);
  });
});
