import { Global, Module } from '@nestjs/common';
import { ToDoController } from './to-do.controller';
import { ToDoService } from './to-do.service';

@Global()
@Module({
  controllers: [ToDoController],
  providers: [ToDoService]
})
export class ToDoModule {}
