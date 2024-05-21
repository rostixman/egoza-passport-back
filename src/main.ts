import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('passport')
    .setDescription(
      'If no version is selected, the latest version will be selected by default',
    )
    .setVersion('1.0.1')
    .build();

  app.setGlobalPrefix('api').enableVersioning({
    type: VersioningType.URI,
  });

  const document = SwaggerModule.createDocument(app, config, {
    ignoreGlobalPrefix: false,
  });

  SwaggerModule.setup('docs', app, document, {
    patchDocumentOnRequest: (req, _res, document) => {
      const copyDocument = JSON.parse(JSON.stringify(document));
      const isValidVersion = /\/v[0-9]+\//;

      for (const route in document.paths) {
        if (isValidVersion.test(route)) {
          continue;
        }
        delete copyDocument.paths[route];
      }

      return copyDocument;
    },
  });

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
