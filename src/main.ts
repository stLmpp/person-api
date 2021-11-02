import './config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function configureApp(app: INestApplication): void {
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.enableCors();
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(compression());
  app.use(morgan('combined'));
  const options = new DocumentBuilder().setTitle('Api').setVersion('1.0.0').build();
  const document = SwaggerModule.createDocument(app, options, {});
  SwaggerModule.setup('help', app, document, {
    customCss: `.swagger-ui .scheme-container { position: sticky; top: 0; z-index: 1; margin-bottom: 0; padding: 0.25rem 0; }`,
  });
}

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  configureApp(app);
  await app.listen(process.env.POST ?? 3000);
}

bootstrap().then();
