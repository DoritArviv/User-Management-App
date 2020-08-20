import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShowAllComponent } from './show-all/show-all.component';
import { UserComponent } from './user/user.component';

//http
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoUserComponent } from './todo-user/todo-user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { PostUserComponent } from './post-user/post-user.component';
import { SearchPipePipe } from './_pipe/search-pipe.pipe';



@NgModule({
  declarations: [
    AppComponent,
    ShowAllComponent,
    UserComponent,
    TodoUserComponent,
    AddUserComponent,
    PostUserComponent,
    SearchPipePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
