import {Component} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {ToDoList} from '../app/pages/todo-list/todo-list';

@Component({
  selector: 'app-root',
  imports: [ToDoList, RouterOutlet, RouterLink],
  template: `
   <main>
      <a [routerLink]="['/']">
        <header class="brand-name">
          <img class="brand-logo" src="/assets/logo.png" alt="logo" aria-hidden="true" /> <span class="brand-name-text">Let's Do This!</span>
        </header>
      </a>
      <section class="content">
        <router-outlet />
      </section>
    </main>
  `,
  styleUrls: ['./app.css'],
})
export class App {
  title = 'ToDo List';
}

