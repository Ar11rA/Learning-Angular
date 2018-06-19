import { Component, OnInit, Input } from '@angular/core';
import { Todo } from '../todo';
import { TodoDataService } from '../todo-data.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo;

  constructor(private todoDataService: TodoDataService) { }

  ngOnInit() {
  }

  toggleTodoComplete(todo) {
    this.todoDataService.toggleTodoCompleteHttp(todo);
  }

  removeTodo(todo) {
    this.todoDataService.deleteTodoByIdHttp(todo.id);
  }

}
