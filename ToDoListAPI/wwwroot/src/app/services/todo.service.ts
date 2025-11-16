 import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
 import { Observable } from 'rxjs';
import { ToDoItem } from '../pages/todo-item/todo-item';



@Injectable({
  providedIn: 'root' // Makes the service available throughout the application
})


export class TodoService {

  private apiUrl = '/api/todolist';

   constructor(private http: HttpClient) {}


  getItems(): Observable<ToDoItem[]> {
    return this.http.get<ToDoItem[]>(this.apiUrl);
  }

  getItemById(id: number): Observable<ToDoItem> {
    return this.http.get<ToDoItem>(`${this.apiUrl}/${id}`);
  }

  createItem(item: ToDoItem): Observable<ToDoItem> {
    return this.http.post<ToDoItem>(this.apiUrl, item);
  }

  updateItem(item: ToDoItem): Observable<ToDoItem> {
    return this.http.put<ToDoItem>(`${this.apiUrl}/${item.id}`, item);
  }

  deleteItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}

