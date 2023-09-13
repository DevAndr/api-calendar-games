import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {GamesModule} from './games/games.module';
import {UsersModule} from './users/users.module';
import {ListsModule} from './lists/lists.module';
import {ConfigService} from '@nestjs/config';
import {MongooseModule} from '@nestjs/mongoose';
import {AuthModule} from './auth/auth.module';
import {ClientsModule, Transport,} from '@nestjs/microservices';
import {APP_GUARD} from '@nestjs/core';
import {RefreshTokenStrategy} from '@server/auth/strategy/refresh-token.strategy';
import {AccessTokenStrategy} from '@server/auth/strategy';
import {JwtAuthGuard} from "@server/guards/jwt-auth.guard";
import {CoreModule} from "@app/core";
import * as process from "process";

@Module({
    imports: [
        CoreModule,
        MongooseModule.forRoot(
            // {
            //     imports: [ConfigService],
            //     inject: [ConfigService],
            //     useFactory: (config: ConfigService) => ({
            //         uri: config.get('database.host'),
            //         dbName: config.get('database.dbName')
            //     })
            // }

            process.env.MONGO_HOST,
            {
                dbName: process.env.MONGO_DB_NAME,
            },
        ),
        // JwtModule.register({}),
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
        ConfigService,
        AccessTokenStrategy,
        RefreshTokenStrategy,
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard
        },
        AppService,
    ],
})
export class AppModule {
}
