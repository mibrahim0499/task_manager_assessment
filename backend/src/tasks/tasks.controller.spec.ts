import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskPriority, TaskStatus } from './enums/enums';

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;

  const mockTasksService = {
    create: jest.fn((dto) => {
      return {
        id: 1,
        ...dto,
        status: dto.status || TaskStatus.TODO,
        priority: dto.priority || TaskPriority.MEDIUM,
        createdAt: new Date(),
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: mockTasksService,
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new task', async () => {
      const dto: CreateTaskDto = {
        title: 'Test Task',
        description: 'Test Description',
        priority: TaskPriority.HIGH,
        status: TaskStatus.TODO,
      };

      const result = await controller.create(dto);

      expect(result).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          title: dto.title,
          description: dto.description,
          priority: dto.priority,
          status: dto.status,
          createdAt: expect.any(Date),
        }),
      );
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });
});
