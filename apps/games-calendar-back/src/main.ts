import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(cookieParser());
    app.enableCors(
        {origin: true, credentials: true}
    );
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(3030);
}

bootstrap().then(r => {
    console.log('server started')
});
