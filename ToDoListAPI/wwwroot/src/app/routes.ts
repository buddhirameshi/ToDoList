import {Routes} from '@angular/router';
import {ToDoList} from '../app/pages/todo-list/todo-list';



const routeConfig: Routes = [
  {
    path: '',
    component: ToDoList,
    title: 'ToDo List',
  },
];
export default routeConfig;