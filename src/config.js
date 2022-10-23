const rabbitConfig = {
    uri: process.env.rabbitUri || 'amqp://localhost',
    workQueue: process.env.workQueue || 'create-tickets',
}

export default rabbitConfig