const rabbitConfig = {
    uri: process.env.rabbitUri || 'amqp://localhost',
    workQueue: process.env.workQueue || 'js.ticket',
    key: 'create.one',
} 

export default rabbitConfig