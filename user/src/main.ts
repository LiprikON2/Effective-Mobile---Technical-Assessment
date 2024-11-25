import { NestFactory, Reflector } from '@nestjs/core'
import { createDatabase } from 'typeorm-extension'
import { DataSource } from 'typeorm'

import { AppModule } from './app.module'
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    const config = new DocumentBuilder()
        .setTitle('User Microservice')
        .setDescription('Provides users service')
        .setVersion('1.0')
        .build()
    const documentFactory = () => SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('docs', app, documentFactory)

    // Adds actionable validation errors instead of internal errors in responses
    app.useGlobalPipes(
        new ValidationPipe({
            // Required for paginated endpoints
            transform: true
        })
    )
    // Adds entities' virtual properties in responses
    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))

    await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
