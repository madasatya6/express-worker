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

        channel.assertQueue(workQueue, {
            durable: true
        });

        channel.prefetch(1);
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", workQueue);
        channel.consume(workQueue, function(msg) {

            var secs = msg.content.toString().split('.').length - 1;

            console.log(" [x] Received %s", msg.content.toString());
            setTimeout(function() {
                console.log(" [x] Done");
                channel.ack(msg);
            }, secs * 1000);

        }, {
            // manual acknowledgment mode,
            noAck: false
        });
    });
});

export default listenToQueue()
