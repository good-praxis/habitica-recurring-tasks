import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: '../db/app.db',
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
