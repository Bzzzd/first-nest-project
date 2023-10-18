import { Injectable, NotFoundException } from '@nestjs/common';
import { createToDoDto } from './dto/create-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class ToDoService {
    todos: Todo[] = [];
    getToDos() : Todo[] {
        return this.todos;
    }

    createToDo(newTodo: createToDoDto): Todo {
        const { name, description } = newTodo;
        let id;
        if (this.todos.length) {
            id = this.todos[this.todos.length - 1].id + 1;
        } else {
            id = 1;
        }
        const todo = {
            id,
            name,
            description,
            createdAt: new Date(),
        };
        this.todos.push(todo);
        return todo;
    }

    getToDo(id : number): Todo {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo)
        return todo;
        throw new NotFoundException(`No todo found with id ${id}`)
    }

    deleteToDo(id: number){
        const index = this.todos.findIndex(todo => todo.id === +id);
        if (index >= 0) {
            this.todos.splice(index, 1);
        } else {
            throw new NotFoundException(`No todo found with id ${id}`);
        }
        return `Todo with id ${id} has been deleted`;
    }

    updateToDo(
        id: number,
        newTodo: Partial<createToDoDto>
    ) {
        const index = this.todos.findIndex(todo => todo.id === +id);
        if (index >= 0) {
            this.todos.splice(index, 1);
        } else {
            throw new NotFoundException(`No todo found with id ${id}`);
        }
        return `Todo with id ${id} has been deleted`;   
    } 
    
}
