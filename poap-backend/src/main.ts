import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const httpsOptions = {
  key: fs.readFileSync('./secrets/private-key.pem'),
  cert: fs.readFileSync('./secrets/public-certificate.pem'),
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    httpsOptions,
  });
  await app.listen(3000);
}
bootstrap();
