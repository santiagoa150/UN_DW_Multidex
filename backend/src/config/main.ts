import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as process from 'node:process';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

/**
 * Bootstraps the API Gateway applications.
 */
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    // TODO: Configure exception filter and logger interceptor!
    app.enableCors();
    app.setGlobalPrefix(process.env.APP_REST_PREFIX);
    const swaggerConfig = new DocumentBuilder()
        .setTitle('Multidex App')
        .setDescription('API Rest for Multidex App')
        .addBearerAuth()
        .build();
    SwaggerModule.setup(process.env.SWAGGER_PREFIX, app, SwaggerModule.createDocument(app, swaggerConfig));
    await app.listen(process.env.APP_PORT);
    return app.get(Logger);
}

bootstrap().then((logger: Logger) => {
    logger.log(`Server listening on port :: ${process.env.APP_PORT}`);
    logger.log(`Swagger listening on :: /${process.env.SWAGGER_PREFIX}`);
});
