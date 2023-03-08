import { Module } from '@nestjs/common';
import { ReportsModule } from './reports/reports.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule, ReportsModule
  ],
  controllers: [],
  providers: [],
  exports : []
})
export class AppModule {}
