import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { graphqlUploadExpress } from 'graphql-upload';

// 에러메시지 로그를 위한 import
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './commons/filter/http-exception.filter';

// Chat 을 위한 임시 import
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.use(graphqlUploadExpress()); // graphql upload 이용하기위한 추가
  app.useStaticAssets(join(__dirname, '..', 'frontend')); // socket test 를 위한 추가
  // Cors 추가
  app.enableCors({
    origin: ['https://dangder.shop', 'http://localhost:3000'],
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
