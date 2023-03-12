import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config'
const cookieSession = require('cookie-session');
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal : true
    }),
    TypeOrmModule.forRootAsync({
      inject : [ConfigService],
      useFactory : (config : ConfigService) => {
        return {
          type : 'mariadb',
          host : config.get<string>('DB_HOST'),
          port : 3306,
          username : config.get<string>('DB_USERNAME'),
          password : config.get<string>('DB_PASSWORD'),
          database : config.get<string>('DB_DATABASE'),
          entities : [User, Report],
          synchronize : true,
          charset : 'utf8mb4'
        }
      }
    }),
    UsersModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide : APP_PIPE,
    useValue : new ValidationPipe({
      whitelist: true,
    })
  }],
})

export class AppModule {
  
  // 미들웨어를 등록하는 메서드
  configure(consumer: MiddlewareConsumer) {
    // cookieSession 미들웨어를 등록하고, 옵션 객체를 설정합니다.
    consumer.apply(
      cookieSession({
        keys: ['asdfasfd'], // 세션 암호화에 사용될 키 값
      })
    )
    // forRoutes 메서드를 사용하여 모든 라우터에 미들웨어를 등록합니다.
    .forRoutes('*');
  }
}
