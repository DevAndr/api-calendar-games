import {NestFactory} from '@nestjs/core';
import {EmailNotifyModule} from './email-notify.module';
import {MicroserviceOptions, Transport} from '@nestjs/microservices';

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        EmailNotifyModule,
        {
            transport: Transport.TCP,
            options: {
                host: 'localhost',
                port: 3031,
            },
        },
    );
    await app.listen(); //.finally(() => console.log('microservice email started'));
}

bootstrap();
