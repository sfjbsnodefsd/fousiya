import { ActionParent } from "../Actions/todo.action";
import { Todo } from "../Entity/Todo";


const initialState:Todo[] =[
    {title:"Dummy title 1"}
]

export function TodoReducer(state = initialState, action:ActionParent){
switch(action.type){
    default:return state;
}

}