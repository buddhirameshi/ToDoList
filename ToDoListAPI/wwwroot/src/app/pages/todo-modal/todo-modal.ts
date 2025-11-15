
import { Component, Inject,input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { ToDoItem } from '../todo-item/todo-item';

@Component({
  selector: 'app-todo-modal',
  standalone: true,
  imports: [ReactiveFormsModule ],
  template: `
  <section>
       <form [formGroup]="todoForm" (submit)="submitChanges()" class="modal-form">
      <header class="modal-header">
          <h2> {{toDoModal.name}}</h2>
          <button (click)="closeModal()" class="modal-close">Close</button>
           <button type="submit" class="modal-save">Save</button>
      </header>
      <body>
       
            <section class="modal-form-group">
                <label for="title">Title</label>
                <input id="title" type="text" formControlName="title" [value]="toDoModal.name"/>
            </section>
            <section class="modal-form-group">
                <label for="description">Description</label>
                <input  id="description" type="text" formControlName="description" [value]="toDoModal.description"  />
            </section>
            <section class="modal-form-group">
                <label for="effort">Effort</label>
                <input id="effort" type="number" formControlName="effort"  [value]="toDoModal.effort" />
            </section>
            <section class="modal-form-group">
                <label for="isComplete">Is Complete?</label>
                <input id="isComplete" type="checkbox" formControlName="isComplete" [checked]="toDoModal.isComplete" (change)="onCheckboxChange($event)" />
            </section>
         
       
      </body>
       </form>
</section>
  `,
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


 constructor(private todoService: TodoService,
        public dialogRef: MatDialogRef<ToDoModal>,
        @Inject(MAT_DIALOG_DATA) public toDoModal: { name: string,isComplete:boolean,effort:number,description:string,id:number }
      ) {
       }
      

      closeModal(): void {
        this.dialogRef.close('Modal closed'); // Optional: Return data on close
      }

      onCheckboxChange(event: any):void {     
        this.toDoModal.isComplete = event.target.checked;
      }

      submitChanges():void{
        if(this.todoForm.value.id==0)
        {
          this.createItem();
        }
        else
        {
          this.updateItem();
        }
      }

      // onTextChange(event: Event): void {
      //   const target = event.target as HTMLTextAreaElement;
      //   this.toDoModal.description = target.value;
      // }

        // updating an item
      updateItem(): void {
      const updatedItem: ToDoItem = { 
          id: this.toDoModal.id,
          title: this.todoForm.value.title??'',
          isComplete:this.todoForm.value.isComplete??false,
          effort:this.todoForm.value.effort??0,
          description:this.todoForm.value.description??''
        }; 

        this.todoService.updateItem(updatedItem).subscribe({
          next: (item) => {console.log('Item Updated:', item);this.closeModal(); 

          },
          error: (err) => {console.error('Error Updating item:', err);this.closeModal()}
        });
      }

        // creating an item
    createItem(): void {
      const newItem: ToDoItem = { 
          id: this.toDoModal.id,
          title: this.todoForm.value.title??'',
          isComplete:this.todoForm.value.isComplete??false,
          effort:this.todoForm.value.effort??0,
          description:this.todoForm.value.description??''
        }; 

        this.todoService.createItem(newItem).subscribe({
          next: (item) => {console.log('Item Created:', item);this.closeModal(); 

          },
          error: (err) => {console.error('Error Creating item:', err);this.closeModal()}
        });
    }

    }


   