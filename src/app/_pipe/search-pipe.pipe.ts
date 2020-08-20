import { Pipe, PipeTransform } from '@angular/core';
import { IUser } from '../_interface/interfaces';

@Pipe({
  name: 'searchPipe'
})
export class SearchPipePipe implements PipeTransform {

  transform(users: any[], searchText: string): any {
    if(!users){
      return [];
    }
    if(!searchText){
      return users;
    }
  
    searchText = searchText.toLowerCase();
    return users.filter( user => {
      let email= user.email.toLowerCase().includes(searchText);
      let name = user.name.toLowerCase().includes(searchText);
      return email || name;
    });
   }

  

}
