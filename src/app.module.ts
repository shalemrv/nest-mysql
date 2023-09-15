import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './typeorm/entities/User';
import { Post } from './typeorm/entities/Post';
import { Profile } from './typeorm/entities/Profile';

import { UsersModule } from './users/users.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'shalemv',
    password: 'Raj@1995',
    database: 'nest_tutorial',
    entities: [User, Profile, Post],
    synchronize: true
  }), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
