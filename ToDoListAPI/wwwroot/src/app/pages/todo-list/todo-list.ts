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
  template: `
     <section class="list-wrap">
      <form class="list-filter-wrap">
         <input   type="text" placeholder="Filter by Title" class="task-search-input" [formControl]="filterControl" /> 
        <button class="task-search" type="button" (click)="filterResults()">Search</button>
        <button class="task-clear" type="button" (click)="clearResults()">Clear</button>
      </form>
      <button type="button" (click)="openModal()" class="task-add" title="Add"><img src="../assets/add.png"/><span> Add New Task</span></button>
    </section>

    <section class="results">
       @for(oneItem of filteredList; track $index) {
        <app-todo-tile [todoTile]="oneItem" (toDoListCalled)="loadItems()"/>
      }
    </section>
   
    
  `,
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
    this.filteredList = this.todoItemsList.filter((todoItem) => todoItem?.title.toLowerCase().includes(text.toLowerCase()),
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
      console.log('The dialog was closed', result);
    
    });
  }
  
}







