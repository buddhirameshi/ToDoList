
import { Component, Inject,input , Output, EventEmitter} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { ToDoItem } from '../todo-item/todo-item';

@Component({
  selector: 'app-todo-modal',
  standalone: true,
  imports: [ReactiveFormsModule ],
  templateUrl:'./todo-modal.html',
  styleUrls: ['./todo-modal.css']
})
export class ToDoModal {
 

   updatedItem = input.required<ToDoItem>();

  todoForm = new FormGroup({
    id:new FormControl(this.toDoModal.id),
    title: new FormControl(this.toDoModal.name),
    description: new FormControl(this.toDoModal.description),
    effort: new FormControl(this.toDoModal.effort),
    isComplete: new FormControl(this.toDoModal.isComplete),
  });


 constructor(public dialogRef: MatDialogRef<ToDoModal>,@Inject(MAT_DIALOG_DATA) public toDoModal: { name: string,isComplete:boolean,effort:number,description:string,id:number }) {
  
 }
      

      closeModal(): void {
        this.dialogRef.close(); 
      }


      onCheckboxChange(event: any):void {     
        this.toDoModal.isComplete = event.target.checked;
      }

      submitChanges():void{
        const changedItem: ToDoItem = { 
          id: this.toDoModal.id,
          title: this.todoForm.value.title??'',
          isComplete:this.todoForm.value.isComplete??false,
          effort:this.todoForm.value.effort??0,
          description:this.todoForm.value.description??''
        };  

          this.dialogRef.close(changedItem);
      }

}


   