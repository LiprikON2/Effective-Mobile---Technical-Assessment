import { NestFactory, Reflector } from '@nestjs/core'
import { createDatabase } from 'typeorm-extension'
import { DataSource } from 'typeorm'

import { AppModule } from './app.module'
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    // Adds actionable validation errors instead of internal errors in responses
    app.useGlobalPipes(new ValidationPipe())
    // Adds entities' virtual properties in responses
    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))

    await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
