import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig: TypeOrmModuleOptions = {
 type: 'sqlite',
 database: 'tasks.db',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
 synchronize: true,

};