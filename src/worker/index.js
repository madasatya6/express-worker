import amqp from 'amqplib/callback_api'
import config from '../config'

const { uri, workQueue } = config

const listenToQueue = () => amqp.connect(uri, function(error0, connection) {
    if (error0) {
        throw error0;
    }

    connection.createChannel(function(error1, channel) {

        if (error1) {
            throw error1;
        }

        let workers = registerWorkers(new Worker(channel));

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C");

        for (let worker of workers.GetRoutes()) { 
            
            channel.assertQueue(worker.name, {
                durable: true
            });

            channel.prefetch(1);
            
            channel.consume(worker.name, worker.callback, {
                // manual acknowledgment mode,
                noAck: false
            });
        }
    });
});

const registerWorkers = (worker) => {
    
    worker.Register("create-tickets", CreateTickets(worker))
   
    return worker;
}

const CreateTickets = (worker) => {
    return function(msg) {
        let channel = worker.GetChannel();
        var secs = msg.content.toString().split('.').length - 1;

        console.log(" [x] Received %s", msg.content.toString());
        setTimeout(function() {
            console.log(" [x] Done");
            channel.ack(msg);
        }, secs * 1000);

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
