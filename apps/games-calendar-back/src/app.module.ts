import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GamesModule } from './games/games.module';
import { UsersModule } from './users/users.module';
import { ListsModule } from './lists/lists.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    // MongooseModule.forRoot(
    //   'mongodb://root:password123@localhost:27017/?directConnection=true',
    //   {
    //     dbName: 'calendar-games',
    //   },
    // ),
    // ClientsModule.register({
    //   clients: [
    //     {
    //       name: 'EMAIL_NOTIFY',
    //       transport: Transport.TCP,
    //     },
    //   ],
    //   isGlobal: true,
    // }),
    AuthModule,
    GamesModule,
    UsersModule,
    ListsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'EMAIL_NOTIFY',
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
        });
      },
    },
  ],
})
export class AppModule {}
