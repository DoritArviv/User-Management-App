import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IPost } from '../_interface/interfaces';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostUserService {
  private url :string = "http://localhost:3000/posts";
  private post_subject = new BehaviorSubject<IPost[]>([]);
  constructor(
    private http : HttpClient
  ) {
    this.getAll()
   }

  getAll(){
    this.http.get(`${this.url}`).subscribe((resp :IPost[])=>{
      this.UpdatePostsRtomServer(resp)
  })
  }

  addPost(obj){
    this.http.post(`${this.url}`, obj).subscribe((resp :IPost[])=>{
      this.UpdatePostsRtomServer(resp)
  });
  }
  deletePosts(id){
    this.http.delete(`${this.url}/${id}`).subscribe((resp :IPost[])=>{
      this.UpdatePostsRtomServer(resp)
    });
  }

  private UpdatePostsRtomServer(resp){
    const _post= resp;
    this.post_subject.next(_post);
  }

  public $posts(){
    return  this.post_subject.asObservable();
  }


}
