import { Component,input,inject } from '@angular/core';
// import {RouterLink, RouterOutlet} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import * as bootbox from 'bootbox';
import { ToDoModal } from '../todo-modal/todo-modal'; 
import {ToDoItem} from '../todo-item/todo-item';
import { TodoService } from '../../services/todo.service'


@Component({
  selector: 'app-todo-tile',
  imports: [],
  template: `
<section class="tile">
      <h2 class="tile-heading">
        <span class="task-heading">{{ todoTile().id }} . {{ todoTile().title }}</span>
        
        <button type="button" (click)="deleteItem(todoTile().id)" class="tile-delete-btn" title="Delete"><img src="../assets/delete.png"/></button>
        <button type="button" (click)="openModal()" class="tile-edit-btn" title="Edit"><img src="../assets/edit-icon.ico"/></button>
      </h2> 
      
      <p class="tile-status">{{ todoTile().isComplete }}</p>
      <p class="tile-effort">{{ todoTile().effort }}</p>
      <p class="tile-description">{{ todoTile().description }}</p>
    </section>
  `,
  styleUrls: ['./todo-item-tile.css']
})
export class ToDoTile {
 todoTile = input.required<ToDoItem>();
todoService: TodoService = inject(TodoService);
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

      deleteItem(id: number) {
          this.todoService.deleteItem(id).subscribe(() => console.log('Deleted'));
        }

      // loadItems(): void {
      //   this.todoService.getItems().subscribe({
      //     next: (data) => {
      //       this.todoItemsList = data;
      //       this.filteredList = data;
      //     },
      //     error: (err) => console.error('Error loading items:', err)
      //   });
      // }

        


      openModal(): void {
        const dialogRef = this.dialog.open(ToDoModal, {
          width: '900px', 
          height:'300px',
          data: { name: this.todoTile().title,id:this.todoTile().id,effort:this.todoTile().effort,description:this.todoTile().description,isComplete:this.todoTile().isComplete } // Optional: Pass data to modal
        });


     

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed', result);
        
        });
      }
}