import { Component ,inject,OnInit,input} from '@angular/core';
import { FormControl,ReactiveFormsModule  } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TodoService } from '../../services/todo.service';
import { ToDoTile } from '../todo-item-tile/todo-item-tile';
import { ToDoItem } from '../todo-item/todo-item';
import { ToDoModal } from '../todo-modal/todo-modal'; 



@Component({
  selector: 'app-todolist',
  imports: [ToDoTile,ReactiveFormsModule],
  templateUrl:'./todo-list.html',
  styleUrls: ['./todo-list.css'],
})

export class ToDoList implements OnInit  {

  
 filterControl = new FormControl(''); 
 todoItemsList: ToDoItem[] = [];
 filteredList: ToDoItem[] = [];

 constructor(private todoService: TodoService,public dialog: MatDialog) {}

    ngOnInit(): void {
    this.loadItems();
    }

    onToDoListItemUpdated(receivedData: any):void
    {
       this.todoService.updateItem(receivedData).subscribe({
          next: () => {this.loadItems()},
          error: (err) => {console.error('Error updating item:', err);}
        });

    }

    onToDoListItemUCreated(receivedData: any):void
    {
       this.todoService.createItem(receivedData).subscribe({
          next: () => {this.loadItems()},
          error: (err) => {console.error('Error updating item:', err);}
        });

    }

    onToDoListItemDeleted(deletedId: any):void
    {
       this.todoService.deleteItem(deletedId).subscribe({
          next: () => {this.loadItems()},
          error: (err) => {console.error('Error deleting item:', err);}
        });
        
    }

             


loadItems(): void {
    this.todoService.getItems().subscribe({
      next: (data) => {
        this.todoItemsList = data;
        this.filteredList = data;
      },
      error: (err) => console.error('Error loading items:', err)
    });
  }

  
  filterResults() {
    if (!this.filterControl.value) {
      this.filteredList = this.todoItemsList;
      return;
    }
    this.filteredList = this.todoItemsList.filter((todoItem) => todoItem?.title.toLowerCase().includes(this.filterControl.value!),
    );
  }

  clearResults(){
    this.filterControl = new FormControl(''); 
    this.filteredList = this.todoItemsList;
    return;
  }


    openModal(): void {
    const dialogRef = this.dialog.open(ToDoModal, {
      width: '900px', 
      height:'300px',
      data: { name: 'Add New Item',id:0,effort:0,description:'',isComplete:false } 
    })
  

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if(result.id==0){
            this.onToDoListItemUCreated(result);
        }
        else
        {
            this.onToDoListItemUpdated(result);
        }
       
      }
    });

  }
}
  
  
  








