import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ stopAtFirstError: true }));
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
  });
  app.startAllMicroservices();
  await app.listen(3030);
}

bootstrap();
