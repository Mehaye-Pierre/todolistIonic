import { IdService } from './../providers/id-service/id-service';
import { ListComponent } from './../components/list/list';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TodoServiceProvider } from '../providers/todo-service/todo-service';
import { TodoItemComponent } from '../components/todo-item/todo-item';
import { FirebaseProvider } from '../providers/firebase/firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreModule } from 'angularfire2/firestore';

const config = {
  apiKey: "AIzaSyD8aEyX7MvDRIuppwGKbYEhxc5RgLm8XtY",
  authDomain: "todolistionic-11357.firebaseapp.com",
  databaseURL: "https://todolistionic-11357.firebaseio.com",
  projectId: "todolistionic-11357",
  storageBucket: "",
  messagingSenderId: "1034283372981"
};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ListComponent,
    TodoItemComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(config),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    TodoItemComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    IdService,
    TodoServiceProvider,
    FirebaseProvider,
    AngularFireAuth,
    AngularFirestoreModule
  ]
})
export class AppModule {}
