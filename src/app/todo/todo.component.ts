import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TodoService } from '../service/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  Completed: string;
  seasons: string[] = ['Completed', 'Not Completed'];

  public _todoForm: FormGroup;
  constructor(private _formBuilder:FormBuilder,
    private dialogRef:MatDialogRef<TodoComponent>,
    private _todoService:TodoService,
    @Inject(MAT_DIALOG_DATA) public data:any) { }

    onNoClick() : void {
      this.dialogRef.close();
    }

  ngOnInit() {

    this._todoForm=this._formBuilder.group({
    ID: [this.data.ID],
    Title: [this.data.Title,[Validators.required]] ,
    Description: [this.data.Description,[Validators.required]] ,
    DueDate: [this.data.DueDate,[Validators.required]] ,
    Priority: [this.data.Priority,[Validators.required]],
    Completed: [this.seasons[1],[Validators.required]] });
    
  }

  onSubmit()
  {
    if(isNaN(this.data.ID))
    {
      this._todoService.addTodo(this._todoForm.value);
      this.dialogRef.close();
    }else
    {
      this._todoService.editTodo(this._todoForm.value);
      this.dialogRef.close();
    }
    
  }

}
