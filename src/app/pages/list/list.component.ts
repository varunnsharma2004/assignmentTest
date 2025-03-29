import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit{

  itemsData:any;

  constructor(private data:DataService)
  {
  
  }
  ngOnInit(): void {
    this.data.FormData.subscribe((rs)=>{this.itemsData=rs.flat()
      console.log(this.itemsData,'sdfsdf')})
  }
  page: number = 1;
  itemsPerPage: number = 5;

  get paginatedData() {
    const start = (this.page - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.itemsData.slice(start, end);
  }

   get allpages(){
    
  return Math.ceil(this.itemsData.length / this.itemsPerPage)

  }
  changePage(next: boolean) {
    if (next) {
      if (this.page < Math.ceil(this.itemsData.length / this.itemsPerPage)) {
        this.page++;
      }
    } else {
      if (this.page > 1) {
        this.page--;
      }
    }
  }
}
