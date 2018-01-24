import { TodoItem, TodoList } from './../../model/model';
import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TodoServiceProvider } from '../../providers/todo-service/todo-service';


/**
 * Generated class for the TodoItemComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'todo-item',
  templateUrl: 'todo-item.html'
})
export class TodoItemComponent {

  public item: TodoList;

  constructor(private todoservice: TodoServiceProvider,public navParams: NavParams, public navCtrl : NavController) {
  }

  public ngOnInit(): void {
    this.item = this.navParams.get('idList');
    console.log(this.item);
  }

  public goBack(): void{
    this.navCtrl.pop();
  }

}
