import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module';
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { SwaggerConfigService } from './swagger/swagger.service';

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule); // инициализируем экземпляр приложения, в create передаём модуль
  

  SwaggerConfigService.setupSwagger(app);

  // настройка сваггера
  // const config = new DocumentBuilder()
  // .setTitle('МУЖ НА ЧАС')
  // .setDescription('Документация REST API')
  // .setVersion('1.0.0')
  // .addTag('DMITRII')
  // .build()
  
  // const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('api/docs', app, document);

  // app.useGlobalGuards(JwtAuthGuard) // ограничение на уровне приложения

  await app.listen(PORT, () => console.log(`запустил порт PORT:${PORT}`))
}

start()