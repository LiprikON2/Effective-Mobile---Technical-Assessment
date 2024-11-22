// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'
import { connect } from 'amqplib'
import { Application, ServiceTypes } from '../declarations'
import { deserialize } from 'v8'

export const initRabbitMQConsumer = async (queue: string, service: keyof ServiceTypes, app: Application) => {
    const connection = await connect('amqp://rabbitmq')
    const channel = await connection.createChannel()

    await channel.assertQueue(queue, { durable: false })

    console.log(`Waiting for messages in ${queue}.`)

    channel.consume(queue, (msg) => {
        if (msg !== null) {
            const change = deserialize(msg.content)
            console.log('Received change:', change.action, change.service)

            const entry = { ...change.result, action: change.action, timestamp: change.timestamp }
            console.log('entry', entry)
            app.service(service)
                // @ts-ignore
                .create(entry)
                .catch((err) => {
                    console.error('Error creating history entry:', err)
                })

            channel.ack(msg)
        }
    })
}
