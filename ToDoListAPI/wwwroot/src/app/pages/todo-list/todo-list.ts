import { Component ,inject} from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { ToDoTile } from '../todo-item-tile/todo-item-tile';
import { ToDoItem } from '../todo-item/todo-item';



@Component({
  selector: 'app-todolist',
  imports: [ToDoTile],
  template: `
     <section>
      <form>
         <input type="string" placeholder="Filter by Title" #filter class="task-search-input" /> 
        <button class="task-search" type="button" (click)="filterResults(filter.value)">Search</button>
      </form>
    </section>
    <section class="results">
       @for(oneItem of filteredList; track $index) {
        <app-todo-tile [todoTile]="oneItem" />
      }
    </section>
  `,
  styleUrls: ['./todo-list.css'],
})

export class ToDoList {
 todoItemsList: ToDoItem[] = [];
 filteredList: ToDoItem[] = [];

  todoService: TodoService = inject(TodoService);
 constructor() {
    this.todoService
      .getToDoList()
      .then((toDoList: ToDoItem[]) => {
        this.todoItemsList = toDoList;
        this.filteredList = toDoList;
      });
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredList = this.todoItemsList;
      return;
    }
    this.filteredList = this.todoItemsList.filter((todoItem) => todoItem?.title.toLowerCase().includes(text.toLowerCase()),
    );
  }
}







