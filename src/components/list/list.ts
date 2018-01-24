import { TodoItem } from './../../model/model';
import { TodoList } from './../../model/model';
import { TodoServiceProvider } from './../../providers/todo-service/todo-service';
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NavController } from 'ionic-angular';
import { TodoItemComponent } from '../todo-item/todo-item';
import { AlertController } from 'ionic-angular';

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
    public navCtrl: NavController,
    public alertCtrl: AlertController) {
  }

  public ngOnInit(): void {
    this.todoservice.getList().subscribe(tmpList => this.tdList = tmpList);
  }


  public countUnfinishedTask(tl: TodoList): number{
    var res = 0;
    tl.items.map(item => {
      if(!item.complete){
        res++;
      }
    });
    return res;
  }

  public goToPage(idList: TodoList): void{
    console.log(idList.name);
    this.navCtrl.push(TodoItemComponent,{'idList': idList});
  }

  public delete(id : String): void{
    this.todoservice.deleteList(id);
  }

  public showPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Nouvelle liste',
      message: "Entrez un nom pour votre liste",
      inputs: [
        {
          name: 'Title',
          placeholder: 'Nom'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.todoservice.addList(data.Title);
          }
        }
      ]
    });
    prompt.present();
  }

  public showPromptEdit(td : TodoList) {
    let prompt = this.alertCtrl.create({
      title: 'Edit liste',
      message: "Entrez un nouveau nom pour votre liste",
      inputs: [
        {
          name: 'Title',
          placeholder: td.name
        },
      ],
      buttons: [
        {
          text: 'Annuler',
          handler: data => {
          }
        },
        {
          text: 'Sauvegarder',
          handler: data => {
            this.todoservice.editList(td.uuid,data.Title);
          }
        }
      ]
    });
    prompt.present();
  }

}
