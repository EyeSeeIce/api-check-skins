import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule} from "@nestjs/config";
import { TypeOrmModule } from '@nestjs/typeorm';
import {UserModule} from "./user/user.module";
import {SkinModule} from "./skin/skin.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
          process.env.NODE_ENV === 'development'
              ? './env/.env.development'
              : './env/.env.localhost',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 3306,
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || 'password',
      database: process.env.DB_NAME || 'test',
      autoLoadEntities: true,
      synchronize: true, // Не оставляй true на проде
    }),
      UserModule,
      SkinModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
