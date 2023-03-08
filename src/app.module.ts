import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';


@Module({
  imports: [
    UsersModule, ReportsModule,
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal : true
    }),
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/../**/**.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
      charset : 'utf8mb4'
    }),
  ],
  controllers: [],
  providers: [],
  exports : []
})
export class AppModule {}
