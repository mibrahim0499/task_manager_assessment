import { Injectable } from '@nestjs/common';
import { CreateTaskDto, UpdateTaskDto } from './dto/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private repo: Repository<Task>) {}
  async create(createTaskDto: CreateTaskDto) {
    const task = await this.repo.save(createTaskDto);
    return task;
  }

  async findAll() {
    return await this.repo.find();
  }

  async findOne(id: number) {
    return await this.repo.findOne({where:{id}});
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.findOne(id);
    if(!task){
      throw new Error('Task not found');
    }
    return await this.repo.update(id, updateTaskDto);
    
  }

  async remove(id: number) {
    const task = await this.findOne(id);
    if(!task){
      throw new Error('Task not found');
    }
    return await this.repo.delete(id);
  }
}
