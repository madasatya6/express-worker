const {Worker, isMainThread, parentPort} = require('worker_threads');

// referensi https://medium.com/@Trott/using-worker-threads-in-node-js-80494136dbb6
if (isMainThread) {
    // this code is executed in the main thread and not in worker.
    
    // create worker
    const worker = new Worker(__filename);
    // listen for messages from the worker and print them
    worker.on("message", (msg) => {
        console.log(msg); 
    });
} else {
    // this code is executed in the worker and not in the main thread

    // send a message to main thread
    parentPort.postMessage('Hello world!');
}