const rabbitConfig = {
    uri: process.env.rabbitUri || 'amqp://localhost',
    workQueue: process.env.workQueue || 'js.create-ticket',
}

export default rabbitConfig