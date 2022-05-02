import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';

const httpsOptions = {
  key: fs.readFileSync('./secrets/key.pem'),
  cert: fs.readFileSync('./secrets/cert.pem'),
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    httpsOptions,
  });
  await app.listen(3000);
}
bootstrap();
