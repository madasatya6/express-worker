import amqp from 'amqplib'
import { resolve } from 'bluebird'
import config from '../config'

const assertQueueOptions = { durable: false }
const sendToQueueOptions = { persistent: true }
const payload = `{"message": "this is message", "customer_id": 1, "order_id": 1234}`
const { uri, workQueue, key } = config

// repository rabbit mq with worker queue https://github.com/Otavioensa/rabbit-workers
// medium tutorial https://medium.com/@otavioguastamacchia/implementing-worker-applications-with-rabbitmq-node-1a8b7ab98e47
// sumber https://www.rabbitmq.com/getstarted.html
const lightTask = () => resolve(console.log('Light task abstaction'))

const assertAndSendToQueue = (channel) => {
    const bufferData = Buffer.from(payload)
    
    return channel.assertExchange(workQueue, 'topic', assertQueueOptions)
        .then(() => channel.publish(workQueue, key, bufferData))
        .then(() => channel.close())
}

const sendHardTaskToQueue = () => amqp.connect(uri)
    .then(connection => connection.createChannel())
    .then(channel => assertAndSendToQueue(channel))

const startHardTaskToQueue = () => lightTask()
    .then(() => sendHardTaskToQueue())
    .then(() => console.log('The message has been sent to queue'))
    .then(() => process.exit(0))


export default startHardTaskToQueue()
