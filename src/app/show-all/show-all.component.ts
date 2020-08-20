import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { StoreService } from '../_Service/store.service';
import { Subscription } from 'rxjs';
import { IUser } from '../_interface/interfaces';

@Component({
  selector: 'app-show-all',
  templateUrl: './show-all.component.html',
  styleUrls: ['./show-all.component.css']
})
export class ShowAllComponent implements OnInit , OnDestroy{
  @Input() searchText
  usersData :IUser[] =[]
  _$user : Subscription = null;
  
 
  constructor(
    private storeServ : StoreService) { }

  ngOnInit(){
    this.getUesers()
  }


  getUesers(){
    this._$user= this.storeServ.$users().subscribe((user: IUser[])=>{
      console.log(user);  
      this.usersData= user;
    })

  }
  ngOnDestroy(){
    if(this._$user !== null){
      this._$user.unsubscribe();
    }
  }

}
