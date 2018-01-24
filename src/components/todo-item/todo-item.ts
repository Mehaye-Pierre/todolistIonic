import { TodoItem, TodoList } from './../../model/model';
import { Component, Input } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
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

  constructor(private todoservice: TodoServiceProvider,
    public navParams: NavParams, 
    public navCtrl : NavController,
    public alertCtrl: AlertController) {
  }

  public ngOnInit(): void {
    this.item = this.navParams.get('idList');
  }

  public goBack(): void{
    this.navCtrl.pop();
  }

  public delete(id : String): void{
    this.todoservice.deleteTodo(this.item.uuid, id);
  }

  public changeState(editedItem: TodoItem, state : boolean): void{
    this.todoservice.editStateTodo(this.item.uuid,editedItem,!state);
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
        {
          name: 'Desc',
          placeholder: 'Description'
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
            this.todoservice.addTodo(this.item.uuid,data.Title,data.Desc);
          }
        }
      ]
    });
    prompt.present();
  }

  public showPromptEdit( todoitem : TodoItem) {
    let prompt = this.alertCtrl.create({
      title: 'Edit liste',
      message: "Modifiez votre liste puis validez",
      inputs: [
        {
          name: 'Title',
          placeholder: todoitem.name
        },
        {
          name: 'Desc',
          placeholder: todoitem.desc
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
            this.todoservice.editDescTodo(this.item.uuid,todoitem,data.Desc);
            this.todoservice.editNameTodo(this.item.uuid,todoitem,data.Title);
          }
        }
      ]
    });
    prompt.present();
  }

}
