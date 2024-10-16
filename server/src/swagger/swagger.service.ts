import { Injectable, INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

@Injectable()
export class SwaggerConfigService {
  static setupSwagger(app: INestApplication): void {
    const config = new DocumentBuilder()
    .setTitle('МУЖ НА ЧАС')
    .setDescription('Документация REST API')
    .setVersion('1.0.0')
    .addTag('DMITRII')
    .build()

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
  }
}
