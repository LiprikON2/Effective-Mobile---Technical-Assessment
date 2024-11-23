import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { createDatabase } from 'typeorm-extension'

@Module({
    imports: [
        UsersModule,
        // TypeOrmModule.forRoot({
        //     type: 'postgres',

        //     host: process.env.POSTGRES_HOST,
        //     port: parseInt(process.env.POSTGRES_PORT),
        //     username: process.env.POSTGRES_USER,
        //     password: process.env.POSTGRES_PASSWORD,
        //     database: process.env.POSTGRES_DB,

        //     entities: [],
        //     synchronize: true
        // })
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => {
                const options = {
                    type: 'postgres',
                    host: process.env.POSTGRES_HOST,
                    port: parseInt(process.env.POSTGRES_PORT),
                    username: process.env.POSTGRES_USER,
                    password: process.env.POSTGRES_PASSWORD,
                    database: process.env.POSTGRES_DB,

                    // ref: https://medium.com/@gausmann.simon/nestjs-typeorm-and-postgresql-full-example-development-and-project-setup-working-with-database-c1a2b1b11b8f#:~:text=is%20able%20to-,synchronize,-your%20data%20model
                    synchronize: process.env.MODE === 'DEV'
                } as const

                await createDatabase({ options, initialDatabase: 'postgres', ifNotExist: true })

                return {
                    ...options,
                    entities: [__dirname + '/**/*.entity{.ts,.js}']
                }
            },
            inject: [ConfigService]
        })
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
