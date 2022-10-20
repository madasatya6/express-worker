const rabbitConfig = {
    uri: process.env.rabbitUri || 'amqp://localhost',
    workQueue: process.env.workQueue || 'workQueue',
}

export default rabbitConfig