import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo';
import { TodoDataService } from '../todo-data.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  newTodo: Todo = new Todo();

  constructor(private todoDataService: TodoDataService) {
  }

  ngOnInit() {
    this.todoDataService.getHttpTodos();
    this.todoDataService.allTodos.subscribe(data => console.log(data));
  }

  toggleTodoComplete(todo) {
    this.todoDataService.toggleTodoCompleteHttp(todo);
  }

  removeTodo(todo) {
    this.todoDataService.deleteTodoByIdHttp(todo.id);
  }

  get todos() {
    return this.todoDataService.getAllTodos()
  }

}
