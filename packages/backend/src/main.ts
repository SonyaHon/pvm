import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Config } from './config';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: Config.session.secret,
      resave: false,
      saveUninitialized: false,
    }),
  );
  await app.listen(Config.app.port);
}

bootstrap();
