import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { TodoUserService } from '../_Service/todo-user.service';
import { ITodo } from '../_interface/interfaces';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-todo-user',
  templateUrl: './todo-user.component.html',
  styleUrls: ['./todo-user.component.css']
})
export class TodoUserComponent implements OnInit ,OnDestroy {
@Input() useridTodo

 userId  = this.useridTodo
 todoUser: ITodo[]= []
 addTodo = false;
 completed = false;

 _$todo : Subscription = null;
  constructor(
    private todoService : TodoUserService) { }

  ngOnInit(): void {
  this.getall()   
  }
  
  getall(){
    this._$todo = this.todoService.$todos().subscribe((data:ITodo[])=>{
     let x= data.filter(x =>x.userId == this.useridTodo)
      this.todoUser = x;
    });
  }

  ngOnDestroy(){
    if(this._$todo !== null)
    this._$todo.unsubscribe();
  }

  Addtodo(){
    this.addTodo= true

  }
  AddUserTodo(id, title){
    let todoObj = {
      userId : id,
      title :title,
      completed : this.completed
    }
    this.todoService.addTodo(todoObj);
    this.addTodo= false;
  }

 
  markCompleted(id){
    this.todoService.updateTodo(id);
  }
  

 


}
