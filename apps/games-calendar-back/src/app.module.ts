import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GamesModule } from './games/games.module';
import { UsersModule } from './users/users.module';
import { ListsModule } from './lists/lists.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { APP_GUARD } from '@nestjs/core';
import { RefreshTokenStrategy } from '@server/auth/strategy/refresh-token.strategy';
import { AccessTokenStrategy } from '@server/auth/strategy';
import { JwtAuthGuard } from '@server/guards/jwt-auth.guard';
import { CoreModule } from '@app/core';
import { ScoresModule } from '@server/scores/scores.module';

@Module({
  imports: [
    CoreModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get('database.host'),
        dbName: config.get('database.dbName'),
      }),
    }),
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
    ScoresModule,
  ],
  controllers: [AppController],
  providers: [
    ConfigService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    AppService,
  ],
})
export class AppModule {}
