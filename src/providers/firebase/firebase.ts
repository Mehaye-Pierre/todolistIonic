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
  userId;

  constructor(private afs: AngularFirestore,
    public idserv : IdService) {
  }

  ngOnInit(){
  }

  public setService(userId){
    this.userId = userId;
    this.todoCol = this.afs.collection(userId);
    this.data = this.todoCol.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as TodoList;
        const uuid = a.payload.doc.id;
        return { uuid, ...data };
      });
    });
  }

  public getNewTodoID(list: TodoList):String{
    let res = -1;
    list.items.map(a =>{
      if(Number(a.uuid) > res){
        res = Number(a.uuid);
      }
    })
    return (res+1).toString();
  }

  public getList(): Observable<TodoList[]> {
    return this.data;
  }

  public getSingleList(uuid : string): Observable<TodoList> {
    return this.data.map(tmp => tmp.find(t => t.uuid == uuid));
  }

  public addList(name : string){
    let newList : TodoList = {
      name : name,
      items : []
    }
    this.afs.collection(this.userId).add(newList)
  }

  public editList(list : TodoList, newName : string){
    this.afs.collection(this.userId).doc(list.uuid).update({name: newName});
  }

  public deleteList(list : TodoList){
    this.afs.collection(this.userId).doc(list.uuid).delete();
  }

  public getTodos(list: TodoList) : Observable<TodoItem[]> {
    return this.afs.collection(this.userId).doc(list.uuid).valueChanges() as Observable<TodoItem[]>;
  }

  public addTodo(list: TodoList,title : string, desc : string){
    let newTodo : TodoItem = {
      name : title,
      desc : desc,
      complete : false
    }
    let id = this.getNewTodoID(list);
    newTodo.uuid = id.toString();
    list.items.push(newTodo);
    this.afs.collection(this.userId).doc(list.uuid).update({items: list.items})
  }

  public editStateTodo(list: TodoList, editedItem: TodoItem, newState : boolean) {
    list.items.map(a => {
      if(a.uuid == editedItem.uuid){
        a.complete = newState;
      }
    })
    this.afs.collection(this.userId).doc(list.uuid).update({items: list.items})
  }

  public editNameTodo(list: TodoList, editedItem: TodoItem, newName : string) {
    list.items.map(a => {
      if(a.uuid == editedItem.uuid){
        a.name = newName;
      }
    })
    this.afs.collection(this.userId).doc(list.uuid).update({items: list.items})
  }
  
  public editDescTodo(list: TodoList, editedItem: TodoItem, newDesc : string) {
    list.items.map(a => {
      if(a.uuid == editedItem.uuid){
        a.desc = newDesc;
      }
    })
    this.afs.collection(this.userId).doc(list.uuid).update({items: list.items})
  }
  



}
