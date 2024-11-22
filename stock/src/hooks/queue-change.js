import { serialize } from 'v8'
import { connect } from 'amqplib'
let connection = null
let channel = null

const getRabbitMqConnection = async () => {
    if (!connection) {
        connection = await connect('amqp://rabbitmq')
        channel = await connection.createChannel()
        await channel.assertQueue('your_default_queue', { durable: false })
    }

    return { connection, channel }
}
export const queueChange = async (context) => {
    console.log(`Running hook queueChange on ${context.path}.${context.method}`)
    // console.log('context', context.toJSON())

    const service = context.path
    const action = context.event
    const result = structuredClone(context.result)
    const timestamp = Date.now()

    if ('id' in result) {
        result['result_id'] = result['id']
        delete result['id']
    }

    const change = { service, action, result, timestamp }
    console.log('Change', change)

    const { connection, channel } = await getRabbitMqConnection()

    const message = serialize(change)

    await channel.assertQueue(service, { durable: false })

    channel.sendToQueue(service, Buffer.from(message))
}
