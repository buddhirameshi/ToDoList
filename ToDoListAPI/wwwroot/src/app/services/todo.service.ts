// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
import { ToDoItem } from '../pages/todo-item/todo-item';


@Injectable({
  providedIn: 'root'
})


export class TodoService {

  private apiUrl = 'https://localhost:7219/api/todolist';

  // constructor(private http: HttpClient) {}

  // getTodos(): Observable<TodoItem[]> {
  //   return this.http.get<TodoItem[]>(this.apiUrl);
  // }

  // addTodo(todo: TodoItem): Observable<TodoItem> {
  //   return this.http.post<TodoItem>(this.apiUrl, todo);
  // }

  // deleteTodo(id: number): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/${id}`);
  // }

async getToDoList(): Promise<ToDoItem[]> {
    const data = await fetch(this.apiUrl);
    return (await data.json()) ?? [];
  }
  async getToDoItemById(id: number): Promise<ToDoItem | undefined> {
    const data = await fetch(`${this.apiUrl}?id=${id}`);
    const taskJson = await data.json();
    return taskJson[0] ?? {};
  }

  addNewToDoItem(id: number, title: string, isComplete: boolean,description:string,effort:number) {
    // tslint:disable-next-line
    console.log(id, title, effort);
  }

}

