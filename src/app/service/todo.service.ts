import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../model/todo';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  _todoList: Todo[] = []
  constructor(private http: HttpClient, private router: Router) { }
  addTodo(todo: Todo) {
    todo.ID = this._todoList.length + 1;
    this._todoList.push(todo);
    console.log(todo);
    return this.http.post<any>('http://localhost:8000/api/todos', todo);
  }

  deleteTodo(id: number) {
    const todo = this._todoList.findIndex(c => c.ID === id);
    this._todoList.splice(todo, 1);
    return this.http.delete<any>('http://localhost:8000/api/todos/' + id);
  }
  getAllTodos() {
    return this._todoList;
  }

  editTodo(todo: Todo) {
    const index = this._todoList.findIndex(c => c.ID === todo.ID);
    this._todoList[index] = todo;
    return this.http.post<any>('http://localhost:8000/api/todos/' + index, todo);
  }
}


