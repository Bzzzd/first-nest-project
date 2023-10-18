import { Body, Controller, Get, Post, Param, NotFoundException, Delete, Put } from '@nestjs/common';
import { Req } from '@nestjs/common';
import { Request } from 'express';
import { Todo } from './entities/todo.entity';

@Controller('to-do')
export class ToDoController {
    constructor() {
        this.todos = [];
    }
    todos: Todo[];

    @Get()
    getToDos(
        @Req() request: Request
    ) {
        return this.todos;
    }

    @Get('/:id')
    getToDo(
        @Param('id') id
    ) {
        const todo = this.todos.find(todo => todo.id === +id);
        if (todo)
        return todo;
        throw new NotFoundException(`No todo found with id ${id}`)
    }

    @Post()
    createToDo(
        @Body() newTodo: Todo
    ) {
        if (this.todos.length) {
            newTodo.id = this.todos[this.todos.length - 1].id + 1;
        } else {
            newTodo.id = 1;
        }
        this.todos.push(newTodo);
        return newTodo;
    }

    @Delete('/:id')
    deleteToDo(
        @Param('id') id
    ) {
        const index = this.todos.findIndex(todo => todo.id === +id);
        if (index >= 0) {
            this.todos.splice(index, 1);
        } else {
            throw new NotFoundException(`No todo found with id ${id}`);
        }
        return `Todo with id ${id} has been deleted`;
    }

    @Put('/:id')
    updateToDo(
        @Param('id') id,
        @Body() newTodo: Partial<Todo>
    ) {
        const todo = this.getToDo(id);
        todo.description = newTodo.description? newTodo.description : todo.description;
        todo.name = newTodo.name? newTodo.name : todo.name;
        return todo;
    }
}
