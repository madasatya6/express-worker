import amqp from 'amqplib'
import { resolve } from 'bluebird'
import config from '../config'

const assertQueueOptions = { durable: true }
const consumeQueueOptions = { noAck: false }
const { uri, workQueue } = config 

const genRandomTime = () => Math.random() * 10000

const processHeavyTask = msg => resolve(console.log("Message received")).
    then(setTimeout(() => console.log(msg.content.toString()), genRandomTime()))