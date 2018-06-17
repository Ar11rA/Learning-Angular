import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Post } from '../components/dashboard/post.model';

@Injectable()
export class ItemService {

  public items: Post[];
  private itemRef: AngularFireList<Post>;

  constructor(private db: AngularFireDatabase) {
    this.items = [];
  }

  getItems() {
    this.itemRef = this.db.list<Post>('item');
    return this.itemRef.snapshotChanges(['child_added'])
  }

  createItem(name: string, description: string): void {
    const itemRef = this.db.list<Post>('item');
    itemRef.push({
      name,
      description
    });
  }

}
