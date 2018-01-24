import { TodoItem } from './../../model/model';
import { TodoList } from './../../model/model';
import { TodoServiceProvider } from './../../providers/todo-service/todo-service';
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NavController } from 'ionic-angular';
import { TodoItemComponent } from '../todo-item/todo-item';

/**
 * Generated class for the ListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'app-list',
  templateUrl: 'list.html'
})
export class ListComponent {

  public tdList: TodoList[] = [];

  constructor(private todoservice: TodoServiceProvider,
    public navCtrl: NavController) {
  }

  public ngOnInit(): void {
    this.todoservice.getList().subscribe(tmpList => this.tdList = tmpList);
  }


  public countUnfinishedTask(tl: TodoList): number{
    var res = 0;
    tl.items.map(item => {
      if(item.complete){
        res++;
      }
    });
    return res;
  }

  public goToPage(idList: TodoList): void{
    console.log(idList.name);
    this.navCtrl.push(TodoItemComponent,{'idList': idList});
  }

}
