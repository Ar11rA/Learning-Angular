import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo';
import { TodoDataService } from '../todo-data.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private todoDataService: TodoDataService) { }

  ngOnInit() {
  }

  get todos() {
    return this.todoDataService.getAllTodos();
  }
}
