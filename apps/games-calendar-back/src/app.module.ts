import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GamesModule } from './games/games.module';
import { UsersModule } from './users/users.module';
import { ListsModule } from './lists/lists.module';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import {
  ClientProxyFactory,
  ClientsModule,
  Transport,
} from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forRoot(
      'mongodb://root:password123@localhost:27017/?directConnection=true',
      {
        dbName: 'calendar-games',
      },
    ),
    ClientsModule.register({
      clients: [
        {
          name: 'EMAIL_SERVICE',
          transport: Transport.TCP,
          options: {
            host: 'localhost',
            port: 3031,
          },
        },
      ],
      isGlobal: true,
    }),
    AuthModule,
    GamesModule,
    UsersModule,
    ListsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: 'EMAIL_SERVICE',
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) =>
    //     ClientProxyFactory.create({
    //       transport: Transport.TCP,
    //       options: {
    //         host: 'localhost',
    //         port: 3031,
    //       },
    //     }),
    // },
  ],
})
export class AppModule {}
