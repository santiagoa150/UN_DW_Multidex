import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as process from 'node:process';

/**
 * Bootstraps the API Gateway applications.
 */
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    // TODO: Configure exception filter and logger interceptor!
    app.enableCors();
    await app.listen(process.env.APP_PORT);
    return app.get(Logger);
}

bootstrap().then((logger: Logger) => {
    logger.log(`Server listening on port :: ${process.env.APP_PORT}`);
});
