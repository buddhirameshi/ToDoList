import { Component,input,inject ,Output, EventEmitter} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as bootbox from 'bootbox';
import { ToDoModal } from '../todo-modal/todo-modal'; 
import {ToDoItem} from '../todo-item/todo-item';


@Component({
  selector: 'app-todo-tile',
  imports: [],
  templateUrl: './todo-item-tile.html',
  styleUrls: ['./todo-item-tile.css']
})
export class ToDoTile {
 @Output() onToDoListItemDeleted = new EventEmitter<number>();
 @Output()onToDoListItemUpdated = new EventEmitter<ToDoItem>();
  todoTile = input.required<ToDoItem>();
  constructor(public dialog: MatDialog) {}
   

    // showConfirm(id:number) {
    //       bootbox.confirm({
    //         message: "Are you sure you want to delete this item?",
    //         callback: function (result) {
    //           if (result) {
    //             // User clicked 'OK'
               
    //             // Perform deletion logic here
    //           } else {
    //             // User clicked 'Cancel'
    //             console.log("Deletion cancelled.");
    //           }
    //         }
    //       });
    //     }

      onCheckboxChange(event: any):void {     
        this.todoTile().isComplete = event.target.checked;
        const updatedItem: ToDoItem = { 
            id: this.todoTile().id,
            title: this.todoTile().title,
            isComplete:event.target.checked,
            effort:this.todoTile().effort,
            description:this.todoTile().description
          }; 
          this.onToDoListItemUpdated.emit(updatedItem); 
      }



      deleteItem(id: number) {
          this.onToDoListItemDeleted.emit(id); 
        }


      notifyParent(updatedItem:ToDoItem){
         this.onToDoListItemUpdated.emit(updatedItem); 
      }

      openModal(): void {
        const dialogRef = this.dialog.open(ToDoModal, {
          width: '900px', 
          height:'300px',
          data: { name: this.todoTile().title,id:this.todoTile().id,effort:this.todoTile().effort,description:this.todoTile().description,isComplete:this.todoTile().isComplete } // Optional: Pass data to modal
        });



    dialogRef.afterClosed().subscribe(result => {
      if (result) {  
            this.notifyParent(result);       
      }
    });
  }
      
}