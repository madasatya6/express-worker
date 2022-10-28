import amqp from 'amqplib/callback_api'
import config from '../config'

const { uri, workQueue, key } = config

const listenToQueue = () => amqp.connect(uri, function(error0, connection) {
    if (error0) {
        throw error0;
    }

    connection.createChannel(function(error1, channel) {

        if (error1) {
            throw error1;
        }

        let workers = workerRegistry(new Worker(channel));
        
        channel.assertExchange(workQueue, 'topic', {
            durable: false
        });

        channel.prefetch(1);

        channel.assertQueue('', {
            exclusive: true
        }, function(error2, q) {

            if (error2) {
                throw error2;
            }
            console.log(' [*] Waiting for logs. To exit press CTRL+C');

            for (let worker of workers.GetRoutes()) { 
                channel.bindQueue(q.queue, workQueue, worker.name);
        
                channel.consume(q.queue, worker.callback, {
                    noAck: true
                });
            }
        });
    });
});

const workerRegistry = (worker) => {
    
    worker.Register("create.one", CreateTickets(worker))
   
    return worker;
}

const CreateTickets = (worker) => {
    return function(msg) {
        // let channel = worker.GetChannel();
        console.log(" [x] %s:'%s'", msg.fields.routingKey, msg.content.toString());
    };
}

class Worker {
    constructor(channel) {
        this.channel = channel;
        this.workers = [];
    }
    Register(workerName, callback) {
        this.workers.push({
            name: workerName,
            callback: callback,
        })
    }
    GetRoutes() {
        return this.workers;
    }
    GetChannel() {
        return this.channel;
    }
}

export default listenToQueue()
