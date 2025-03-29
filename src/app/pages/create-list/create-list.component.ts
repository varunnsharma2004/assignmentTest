import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-create-list',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-list.component.html',
  styleUrl: './create-list.component.css'
})
export class CreateListComponent implements OnInit {
  myForm: FormGroup;
items:any=[];
  constructor(private fb: FormBuilder,private data:DataService) {
    this.myForm = this.fb.group({
      rows: this.fb.array([
        this.createRow() 
      ])
    });
  }
  ngOnInit(): void {
  this.items=this.data.getItem();
  
debugger  }

  get rows(): FormArray {
    return this.myForm.get('rows') as FormArray;
  }

  private createRow(): FormGroup {
    return this.fb.group({
      id: [Math.random().toString(36).slice(2, 11)],  
      image: ['',Validators.required],  
      title: ['',Validators.required],
      describe: ['',[Validators.required,Validators.maxLength(250)]],
      qty: ['',Validators.required],
      price: ['',Validators.required],
      date: ['',Validators.required]    
    });
  }

  addNew() {
    this.rows.push(this.createRow());  
  }

  removeRow(id: string) {
    if (this.rows.length > 1) {
      const index = this.rows.controls.findIndex(row => row.value.id === id);
      if (index !== -1) {
        this.rows.removeAt(index); 
     }
  }  
}
  getRowFormGroup(index: number): FormGroup {
    return this.rows.at(index) as FormGroup;
  }


  submit(){
    this.items=this.items!=null?[...this.items,...this.myForm.value.rows].flat():this.items=[...this.myForm.value.rows].flat()
    debugger;
  this.data.FormData.next(this.items);
    debugger
    this.data.setItem(this.items)
    debugger
    this.myForm.reset()
    this.myForm.setControl('rows', this.fb.array([this.createRow()])); 
    // console.log(this.myForm.value)
  }

  getImage(data:any,id:any)
  {
const file=data.target.files[0];
if(file)
{

  const reader=new FileReader();
  reader.onload = () => {
    const base64String = reader.result as string;
    this.rows.at(id).patchValue({ image: base64String });
  };
  reader.readAsDataURL(file);
  data.target.value = '';
  }
}
}