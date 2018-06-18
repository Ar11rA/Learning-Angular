import { Component, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material';
import { Post } from './post.model';
import { ItemService } from '../../services/item.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public posts: Post[];
  public post: Post;
  public isLoading: boolean;
  public dataSource: MatTableDataSource<Post>;
  displayedColumns = ['name', 'description'];

  constructor(private itemService: ItemService) {
    this.post = new Post('', '');
    this.posts = [];
    this.isLoading = true;
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit() {
    this.getPosts();
  }

  getPosts(): void {
    this.itemService.getItems()
      .subscribe(actions => {
        actions.forEach(action => {
          this.posts.push(action.payload.val());
        });
        this.isLoading = false;
        console.log(this.posts)
        this.dataSource = new MatTableDataSource(this.posts);
      });
  }
  createPost(): void {
    this.posts = []
    this.itemService.createItem(this.post.name, this.post.description);
  }

}
