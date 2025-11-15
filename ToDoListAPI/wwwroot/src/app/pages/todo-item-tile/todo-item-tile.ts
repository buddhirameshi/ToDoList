import { Component,input } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {ToDoItem} from '../todo-item/todo-item';


@Component({
  selector: 'app-todo-tile',
  imports: [RouterOutlet, RouterLink],
  template: `
<section class="tile">
      <h2 class="tile-heading">{{ todoTile().title }}</h2>
      <p class="tile-status">{{ todoTile().isComplete }}</p>
      <p class="tile-effort">{{ todoTile().effort }}</p>
      <p class="tile-description">{{ todoTile().description }}</p>
    </section>
  `,
  styleUrls: ['./todo-item-tile.css']
})
export class ToDoTile {
 todoTile = input.required<ToDoItem>();

}
