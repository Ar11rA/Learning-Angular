import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Todo } from './todo';
import { of } from 'rxjs/observable/of';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class TodoDataService {

  private todosUrl = 'http://localhost:4000/api/todos';

  lastId: number = 0;

  todos: Todo[] = [];

  @Output() allTodos: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) {
  }

  addTodo(todo: Todo): void {
    if (!todo.id) {
      todo.id = ++this.lastId;
    }
    this.todos.push(todo);
  }
  
  addHttpTodo (todo: Todo): void {
    this.http.post<Todo>(this.todosUrl, todo, httpOptions).pipe(
      tap((todo: Todo) => console.log(`added todo w/ id=${todo.id}`)),
      catchError(this.handleError<Todo>('addtodo'))
    ).subscribe(todo => {
      this.todos.push(todo);
      this.allTodos.emit(this.todos);
    })
  }

  deleteTodoById(id: number): void {
    this.todos = this.todos
      .filter(todo => todo.id !== id);
  }
  
  deleteTodoByIdHttp(id: number): void {
    this.http.delete<Todo[]>(`${this.todosUrl}/${id}`)
      .pipe(
        tap(_ => console.log(`deleted todo`)),
        catchError(this.handleError('delete Todo', []))
      )
      .subscribe(todos => {
        this.todos = this.todos.filter(todo => todo.id != id);
        this.allTodos.emit(this.todos);
      });
  }

  updateTodoById(id: number, values: Object = {}): Todo {
    let todo = this.getTodoById(id);
    if (!todo) {
      return null;
    }
    Object.assign(todo, values);
    return todo;
  }

  getAllTodos(): Todo[] {
    return this.todos;
  }
  
  getHttpTodos(): void {
    this.http.get<Todo[]>(this.todosUrl)
      .pipe(
        tap(_ => console.log(`fetched todos`)),
        catchError(this.handleError('getHttpTodos', []))
      )
      .subscribe(todos => {
        this.todos = todos
        this.allTodos.emit(this.todos);
      });
  }

  getTodoById(id: number): Todo {
    return this.todos
      .filter(todo => todo.id === id)
      .pop();
  }

  toggleTodoComplete(todo: Todo) {
    let updatedTodo = this.updateTodoById(todo.id, {
      complete: !todo.complete
    });
    return updatedTodo;
  }

  toggleTodoCompleteHttp(todo: Todo) : void { 
    let updatedTodo = this.updateTodoById(todo.id, {
      complete: !todo.complete
    });
   this.http.put(`${this.todosUrl}/${todo.id}`, updatedTodo, httpOptions).pipe(
      tap(_ => console.log(`updated todo id=${todo.id}`)),
      catchError(this.handleError<any>('updateTodo'))
    ).subscribe(_ => {
      let changeIndex = this.todos.findIndex(item => item.id == todo.id)
      this.todos[changeIndex] = updatedTodo;
      this.allTodos.emit(this.todos);
    });
  }
  
  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

}