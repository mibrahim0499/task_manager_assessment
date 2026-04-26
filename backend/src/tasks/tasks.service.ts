import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateTaskDto, UpdateTaskDto } from './dto/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { TaskPriority, TaskStatus } from './enums/enums';

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private repo: Repository<Task>) {}

  async create(createTaskDto: CreateTaskDto) {
    const task = this.repo.create(createTaskDto);
    return await this.repo.save(task);
  }

  async findAll(status?: TaskStatus, priority?: TaskPriority) {
    const query: any = {};
    if (status) query.status = status;
    if (priority) query.priority = priority;

    return await this.repo.find({ where: query });
  }

  async findOne(id: number) {
    if (isNaN(id)) {
      throw new BadRequestException('Invalid ID format');
    }
    const task = await this.repo.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.findOne(id);
    Object.assign(task, updateTaskDto);
    return await this.repo.save(task);
  }

  async remove(id: number) {
    const task = await this.findOne(id);
    await this.repo.remove(task);
    return task;
  }
}
