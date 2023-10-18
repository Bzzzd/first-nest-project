import { Body, Controller, Get, Post, Param, Query, NotFoundException, Delete, Put } from '@nestjs/common';
import { Req } from '@nestjs/common';
import { Request } from 'express';
import { Todo } from './entities/todo.entity';
import { createToDoDto } from './dto/create-todo.dto';
import { getPaginatedToDosDto } from './dto/get-paginated-todos.dto';
import { ToDoService } from './to-do.service';

@Controller('to-do')
export class ToDoController {
    constructor(
        private toDoService: ToDoService
    ) {}
    

    @Get()
    getToDos(
        @Query() queryParams: getPaginatedToDosDto
    ) {
        return this.toDoService.getToDos();
    }

    @Get('/:id')
    getToDo(
        @Param('id') id
    ) {
        return this.toDoService.getToDo(+id);
    }

    @Post()
    createToDo(
        @Body() newTodo: createToDoDto
    ): Todo {
        return this.toDoService.createToDo(newTodo);
    }

    @Delete('/:id')
    deleteToDo(
        @Param('id') id
    ) {
        return this.toDoService.deleteToDo(+id);
    }

    @Put('/:id')
    updateToDo(
        @Param('id') id,
        @Body() newTodo: Partial<createToDoDto>
    ) {
        return this.toDoService.updateToDo(+id, newTodo);
    }
}
