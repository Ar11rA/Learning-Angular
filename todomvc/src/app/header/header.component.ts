import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo';
import { TodoDataService } from '../todo-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  newTodo: Todo = new Todo();

  constructor(private todoDataService: TodoDataService) {
  }

  ngOnInit() {
   
  }

  addTodo() {
    if (this.newTodo.title.length > 0) {
      this.todoDataService.addHttpTodo(this.newTodo);
    }
    else {
      console.log('Empty string not permitted!')
    }
  }

}
