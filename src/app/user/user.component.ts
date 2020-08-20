import { Component, OnInit, Input, Output,EventEmitter, OnDestroy } from '@angular/core';
import { StoreService } from '../_Service/store.service';
import { TodoUserService } from '../_Service/todo-user.service';
import {ITodo } from '../_interface/interfaces';
import { Subscription } from 'rxjs';
import { PostUserService } from '../_Service/post-user.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit ,OnDestroy {
  @Input() currentUser
  
  @Output() UserId : EventEmitter<any> = new EventEmitter();
  showAddress= false
  uncompletedTasks = false;

  sub :Subscription;
  //HELPER
  isRed : boolean = false;
  isVisible : boolean = false;
  tosods= false;
  
  constructor(
    private StoreServ : StoreService,
    private todoService : TodoUserService,
    private postService : PostUserService) { }


  ngOnInit(): void {
    this.onCompleted(this.currentUser.id)
  }

  onDelete(id, $id){
    this.StoreServ.deleteUser(id);
    //delete tosos 
    this.todoService.delete($id);
    //delete posts 
    this.postService.deletePosts($id);

  }
  
  onUpdate(id,name,email,street,city,zipcode){
    let obj ={
      name:name,
      email:email,
      address: {
          street:street,
          city:city,
          zipcode:zipcode}
  }
  this.StoreServ.updateUser(obj,id);
  }
  

  onCompleted(id){
    this.sub= this.todoService.$todos().subscribe((data:ITodo[])=>{
     const todoUser :ITodo[]= data.filter(x =>x.userId === id)
     this.uncompletedTasks = false;
     todoUser.forEach((todo :ITodo)=>{
       if (!todo.completed){
       this.uncompletedTasks= true
      }
       else{
         (err) => console.log(err);
         }
     });
    });
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }
  
  update(id){
    let obj ={
      name: this.currentUser.name,
      email: this.currentUser.email,
      address: {
          street : this.currentUser.address.street,
          city:this.currentUser.address.city,
          zipcode:this.currentUser.address.zipcode}
  }
  this.StoreServ.updateUser(obj,id);
  }


}
