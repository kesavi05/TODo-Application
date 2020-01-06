import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { TodoService } from '../service/todo.service';
import { TodoComponent } from '../todo/todo.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  isPopupOpened = false;
  constructor(private dialog?: MatDialog,
    private _todoService?: TodoService) { }

  ngOnInit() {
  }

  get TodoList() {
    return this._todoService.getAllTodos();
  }

  addTodo() {
    this.isPopupOpened = true;
    const dialogRef = this.dialog.open(TodoComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isPopupOpened = false;
    });
  }
  editTodo(id: number) {
    this.isPopupOpened = true;
    const todo = this._todoService.getAllTodos().find(c => c.ID === id)
    const dialogRef = this.dialog.open(TodoComponent, {
      data: todo
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isPopupOpened = false;
    });
  }

  deleteTodo(id: number) {
    this._todoService.deleteTodo(id);
  }
}
