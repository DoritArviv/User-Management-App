import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { ITodo } from '../_interface/interfaces';

@Injectable({
  providedIn: 'root'
})
export class TodoUserService {

  private url :string = "http://localhost:3000/todos";
  private todos_subject = new BehaviorSubject<ITodo[]>([]);

  constructor(
    private http : HttpClient
    ) { 
     this.getAll();
    }

    getAll(){
      this.http.get(`${this.url}`).subscribe((resp :ITodo[])=>{
        this.UpdateTodosFromServer(resp)
    })
    }

    addTodo(obj){
      this.http.post(`${this.url}`, obj).subscribe((resp :ITodo[])=>{
        this.UpdateTodosFromServer(resp)
    })
    }
    // markCompleted
    updateTodo(id){
      this.http.put(`${this.url}/${id}`, {completed : true }).subscribe((resp :ITodo[])=>{
        this.UpdateTodosFromServer(resp)
    })
    }

  getByID(id){
   return this.http.get(`${this.url}/${id}`)
  }

  delete(id){
    this.http.delete(`${this.url}/${id}`).subscribe((resp :ITodo[])=>{
      this.UpdateTodosFromServer(resp)
    });
  }


  private UpdateTodosFromServer(resp){
    // console.log(resp);
    
    const _todo = resp;
    this.todos_subject.next(_todo);
  }

  public $todos(){
    return  this.todos_subject.asObservable();
  }
}
