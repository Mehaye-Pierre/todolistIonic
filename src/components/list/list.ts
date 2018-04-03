import { TodoItem } from './../../model/model';
import { TodoList } from './../../model/model';
import { TodoServiceProvider } from './../../providers/todo-service/todo-service';
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NavController } from 'ionic-angular';
import { TodoItemComponent } from '../todo-item/todo-item';
import { AlertController } from 'ionic-angular';
import { Firebase } from '@ionic-native/firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { FirebaseProvider } from '../../providers/firebase/firebase';

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
  public userState ='';
  public userBool = false;

  constructor(private todoservice: TodoServiceProvider,
    private todoserviceFirebase: FirebaseProvider,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public auth: AngularFireAuth) {
  }

  public ngOnInit(): void {
    this.loadFirebaseServices();
  }

  public loadFirebaseServices(){
    this.auth.auth.onAuthStateChanged(user => {
      if (user) {
        this.userState = 'Vous êtes connecté '+user.displayName;
        this.userBool = true;
        console.log(user.uid);
        this.todoserviceFirebase.setService(user.uid)
        this.todoserviceFirebase.getList().subscribe(tmpList => this.tdList = tmpList);
        console.log(this.userState);
        console.log(this.tdList);
      } else {
        this.userState = 'Vous n\' êtes pas connecté';
        this.userBool = false;
        this.tdList = [];
        this.todoserviceFirebase.logoutService();
        console.log(this.userState);
      }
    });
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

  public delete(list : TodoList): void{
    this.todoserviceFirebase.deleteList(list);
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
          text: 'Annuler',
          handler: data => {
          }
        },
        {
          text: 'Sauvegarder',
          handler: data => {
            this.todoserviceFirebase.addList(data.Title);
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
            this.todoserviceFirebase.editList(td,data.Title);
          }
        }
      ]
    });
    prompt.present();
  }

  public login() {
    this.auth.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())     
      .catch(err => {console.log(err)});
    this.loadFirebaseServices();
  }

  public logout() {
    this.auth.auth.signOut();
    this.loadFirebaseServices();
  }

}
