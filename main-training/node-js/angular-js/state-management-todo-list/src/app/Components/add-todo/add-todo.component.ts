import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TodoAdd } from 'src/app/Actions/todo.action';
import { Todo } from 'src/app/Entity/Todo';


@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {
  AddTodo(todo:string){
    const newTodo = new Todo();
    console.log(todo);
    newTodo.title = todo;
    this.store.dispatch(new TodoAdd(newTodo))
  }


  constructor(private store: Store<{ todos: Todo[] }>) { }

  ngOnInit(): void {
  }

}
