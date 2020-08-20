import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { StoreService } from '../_Service/store.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  @Output() OnCancel : EventEmitter<any> = new EventEmitter();

  constructor(private SroteServ :StoreService) { }

  useObj = {name : '', email:'',address: {street:'',  city:'',  zipcode:''}}

  ngOnInit(): void {
  }

 add(){
  this.SroteServ.addUser(this.useObj);
    this.OnCancel.emit(false);
  
  }

  onCancel(){
    this.OnCancel.emit(false);
  }

}
