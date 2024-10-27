import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module';
// import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { SwaggerConfigService } from './swagger/swagger.service';

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule); // инициализируем экземпляр приложения, в create передаём модуль
  app.setGlobalPrefix('api')
  SwaggerConfigService.setupSwagger(app);

  // const jwtAuthGuard = app.get(JwtAuthGuard); // ограничение на уровне приложения
  // app.useGlobalGuards(jwtAuthGuard);

  await app.listen(PORT, () => console.log(`запустил порт PORT:${PORT}`))
}

start()