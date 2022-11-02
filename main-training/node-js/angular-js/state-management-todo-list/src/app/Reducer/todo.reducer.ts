import { ActionParent } from "../Actions/todo.action";
import { Todo } from "../Entity/Todo";
import { TodoActionType } from "../shared/enum/todo-action-types.enum";


const initialState:Todo[] =[
    {title:"Hello"}
]

export function TodoReducer(state = initialState, action:ActionParent){
switch(action.type){
    case TodoActionType.Add:
        return [...state , action.payload];
    default:return state;
}

}