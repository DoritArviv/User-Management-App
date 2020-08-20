import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { PostUserService } from '../_Service/post-user.service';
import { IPost } from '../_interface/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-user',
  templateUrl: './post-user.component.html',
  styleUrls: ['./post-user.component.css']
})
export class PostUserComponent implements OnInit, OnDestroy {
@Input() userId

posts : IPost[] =[]
addpost = false;

_$post :Subscription =null;
  constructor(
    private post_Service : PostUserService
  ) { }

  ngOnInit(): void {
    this.getAllPosts();
    
  }

  getAllPosts(){
   this._$post= this.post_Service.$posts().subscribe((data : IPost[])=>{
      let findPostUser = data.filter(x=>x.userId === this.userId)
      this.posts = findPostUser;   
    });
  }
  ngOnDestroy(){
    if(this._$post !== null)
    this._$post.unsubscribe();
  }
  
  AddPost(){
    this.addpost= true
  }

  AddUserpost(userId,title, body){
    let postOj= {
      userId: userId,
      title : title,
      body : body
    }
    this.post_Service.addPost(postOj);
    this.addpost= false
  }

}
