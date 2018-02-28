import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import 'rxjs/add/operator/map';
import { TodoList, TodoItem } from '../../model/model';
import { IdService } from '../id-service/id-service';
/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseProvider {

  todoCol: AngularFirestoreCollection<TodoList>;
  data: Observable<TodoList[]>;

  constructor(private afs: AngularFirestore,
    public idserv : IdService) {
  }

  ngOnInit(){
  }

  public setService(userId){
    this.todoCol = this.afs.collection(userId);
    this.data = this.todoCol.valueChanges();
  }

  public getList(): Observable<TodoList[]> {
    return this.data;
  }

}
