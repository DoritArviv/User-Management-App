import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { StoreService } from './_Service/store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  searchText : string
  addUesr= false;

  constructor(){}
  
  ngOnInit(){
 }

  onAdd(){
    this.addUesr = true;
  }

  cancelAddUser(event){
    if(event === false)
    this.addUesr= false;
  }
}
