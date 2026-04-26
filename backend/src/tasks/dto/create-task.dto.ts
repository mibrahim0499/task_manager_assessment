import { PartialType } from "@nestjs/mapped-types";
import { TaskPriority, TaskStatus } from "../enums/enums";

export class CreateTaskDto {

    title: string;
    description?: string;
    status: TaskStatus;
    priority: TaskPriority;
}


export class UpdateTaskDto extends PartialType(CreateTaskDto) {}

