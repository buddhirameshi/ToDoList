import {Routes} from '@angular/router';
import {Home} from './home/home';
import {Details} from './details/details';
import {ToDoList} from '../app/pages/todo-list/todo-list';



const routeConfig: Routes = [
  {
    path: '',
    component: ToDoList,
    title: 'ToDo List',
  },
  {
    path: 'details/:id',
    component: Details,
    title: 'Home details',
  },
];
export default routeConfig;