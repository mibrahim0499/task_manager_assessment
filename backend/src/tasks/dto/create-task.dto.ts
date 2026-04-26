import { PartialType } from '@nestjs/mapped-types';
import { TaskPriority, TaskStatus } from '../enums/enums';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(TaskStatus)
  @IsOptional()
  status: TaskStatus = TaskStatus.TODO;

  @IsEnum(TaskPriority)
  @IsOptional()
  priority: TaskPriority = TaskPriority.MEDIUM;
}

export class UpdateTaskDto extends PartialType(CreateTaskDto) {}
