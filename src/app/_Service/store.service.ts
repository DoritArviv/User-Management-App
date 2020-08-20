import { Injectable } from '@angular/core';
import { IUser } from '../_interface/interfaces';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private uri = "http://localhost:3000/users"

  private users_subject = new BehaviorSubject<IUser[]>([]);
  

  constructor(
    private http : HttpClient
  ) {
    this.getAllusers();
   }

//get all
   getAllusers(){
     this.http.get(`${this.uri}`).subscribe((resp : IUser[]) => {this.updateUsersFromServer(resp);
     });
   }
   // add new user
  addUser(obj){
    this.http.post(`${this.uri}`, obj).subscribe((resp: IUser[]) => {
      this.updateUsersFromServer(resp);
    });
  }
  //update 
  updateUser(obj,id){
    this.http.put(`${this.uri}/${id}`,obj).subscribe((resp) => {
      this.updateUsersFromServer(resp);
    });
  }
  deleteUser(id){
    this.http.delete(`${this.uri}/${id}`).subscribe((resp : IUser[]) => {
      this.updateUsersFromServer(resp);
    });
  }



  private updateUsersFromServer(resp) {
   // get all the users
    // console.log(resp); 
    const _user = resp
    this.users_subject.next(_user); // everytime get the same users[] but with the changes  

    
  }

  public $users() {
    return this.users_subject.asObservable();
  }

}
