import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { createDatabase } from 'typeorm-extension'

import typeorm from './config/typeorm'
import { UsersModule } from './users/users.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'

const isDev = process.env.MODE === 'DEV'

@Module({
    imports: [
        UsersModule,

        ConfigModule.forRoot({
            isGlobal: true,
            load: [typeorm]
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => {
                const options = configService.get('typeorm')

                await createDatabase({ options, initialDatabase: 'postgres', ifNotExist: true })

                console.log(
                    `Connecting to ${options.database} db in ${isDev ? 'dev' : 'prod'} mode (synchronize: ${isDev})`
                )

                return {
                    ...options,
                    synchronize: isDev // createDatabase overwrites original synchronize value
                }
            },
            inject: [ConfigService]
        })
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
