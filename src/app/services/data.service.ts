import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {


   constructor() { }
 
setItem = (item: any) => localStorage.setItem('item', JSON.stringify(item));
getItem = () => JSON.parse(localStorage.getItem('item') || 'null');

FormData:BehaviorSubject<any>=new BehaviorSubject(this.getItem());

}
