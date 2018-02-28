import { IdService } from './../id-service/id-service';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {TodoItem, TodoList} from '../../model/model';
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';

/*
Not used anymore, left for test purpose
*/

@Injectable()
export class TodoServiceProvider {

  data:TodoList[] = [
    {
      uuid : "a351e558-29ce-4689-943c-c3e97be0df8b",
      name : "List 1",
      items : [
        {
          uuid : "7dc94eb4-d4e9-441b-b06b-0ca29738c8d2",
          name : "Item 1-1",
          complete : false
        },
        {
          uuid : "20c09bdd-1cf8-43b0-9111-977fc4d343bc",
          name : "Item 1-2",
          complete : false
        },
        {
          uuid : "bef88351-f4f1-4b6a-965d-bb1a4fa3b444",
          name : "Item 1-3",
          complete : true
        }
      ]
    },
    { uuid : "90c04913-c1a2-47e5-9535-c7a430cdcf9c",
      name : "List 2",
      items : [
        {
          uuid : "72849f5f-2ef6-444b-98b0-b50fc019f97c",
          name : "Item 2-1",
          complete : false
        },
        {
          uuid : "80d4cbbe-1c64-4603-8d00-ee4932045333",
          name : "Item 2-2",
          complete : true
        },
        {
          uuid : "a1cd4568-590b-428b-989d-165f22365485",
          name : "Item 2-3",
          complete : true
        }
      ]
    },
    { uuid : "90c04913-c1a2-47e5-9535-c7a430cdcf25",
    name : "List 3",
    items : [
      {
        uuid : "72849f5f-2ef6-444b-98b0-b50fc019f932",
        name : "Item 3-1",
        complete : false
      },
      {
        uuid : "80d4cbbe-1c64-4603-8d00-ee4932045338",
        name : "Item 3-2",
        complete : true
      },
      {
        uuid : "a1cd4568-590b-428b-989d-165f22365498",
        name : "Item 3-3",
        complete : true
      }
    ]
  }
  ];

  constructor(public idserv : IdService) {
  }

  public getList(): Observable<TodoList[]> {
    return Observable.of(this.data);
  }

  public editList(listUuid : String, newName : string){
    let index = this.data.findIndex(d => d.uuid == listUuid);
    this.data[index].name = newName;
  }

  public deleteList(listUuid : String){
    let index = this.data.findIndex(d => d.uuid == listUuid);
    if (index != -1) {
      this.data.splice(index,1);
    }
  }

  public addList(name : string){
    let newList : TodoList = {
      uuid : this.idserv.getId().toString(),
      name : name,
      items : []
    }
    this.data.push(newList);
  }

  public getTodos(uuid:String) : Observable<TodoItem[]> {
    return Observable.of(this.data.find(d => d.uuid == uuid).items)
  }


  public editTodo(listUuid : String, editedItem: TodoItem) {
    let items = this.data.find(d => d.uuid == listUuid).items;
    let index = items.findIndex(value => value.uuid == editedItem.uuid);
    items[index] = editedItem;
  }

  public editNameTodo(listUuid : String, editedItem: TodoItem, newName : string) {
    let items = this.data.find(d => d.uuid == listUuid).items;
    let index = items.findIndex(value => value.uuid == editedItem.uuid);
    items[index].name = newName;
  }

  public editStateTodo(listUuid : String, editedItem: TodoItem, newState : boolean) {
    let items = this.data.find(d => d.uuid == listUuid).items;
    let index = items.findIndex(value => value.uuid == editedItem.uuid);
    items[index].complete = newState;
  }

  public editDescTodo(listUuid : String, editedItem: TodoItem, newDesc : string) {
    let items = this.data.find(d => d.uuid == listUuid).items;
    let index = items.findIndex(value => value.uuid == editedItem.uuid);
    items[index].desc = newDesc;
  }

  public deleteTodo(listUuid: String, uuid: String) {
    let items = this.data.find(d => d.uuid == listUuid).items;
    let index = items.findIndex(value => value.uuid == uuid);
    if (index != -1) {
      items.splice(index,1);
    }
  }

  public addTodo(listUuid: String,title : string, desc : string){
    let items = this.data.find(d => d.uuid == listUuid).items;
    let newTodo : TodoItem = {
      uuid : this.idserv.getId().toString(),
      name : title,
      desc : desc,
      complete : false
    }
    items.push(newTodo);

  }
}