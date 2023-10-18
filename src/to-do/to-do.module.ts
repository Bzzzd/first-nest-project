import { Global, Module } from '@nestjs/common';
import { ToDoController } from './to-do.controller';

@Global()
@Module({
  controllers: [ToDoController]
})
export class ToDoModule {}
