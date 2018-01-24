import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {TodoItem, TodoList} from '../../model/model';
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';


@Injectable()
export class IdService {

  count = 0;

  constructor() {
  }

  public getId(): number {
    this.count++;
    return this.count;
  }

  
}