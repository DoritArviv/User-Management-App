import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private http : HttpClient) { }
  urluser = "http://localhost:3000/users"

   getUser(){
    return this.http.get(this.urluser)
    // return userData
    // .map(x=>{
    //   return { id :x.id,name : x.name, email :x.email,
    //           city : x.address.city, zipcode : x.address.zipcode,
    //           street : x.address.street}
    // })
  }

  upDateUser(obj,id){
   return this.http.put(`${this.urluser}/${id}`, obj).subscribe(data=>{
    console.log(data);
    
  })

  }

  

}
