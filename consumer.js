const amqp = require("amqplib");
const ExchangeName = "directMessage";
const logTypes = process.argv.slice(2); //get parameters => error, info , warning
console.log(logTypes);

async function ReciveData() {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    await channel.assertExchange(ExchangeName , "direct");
    const assertQueue = await channel.assertQueue("" , {exclusive: true});
    for(const pattern of logTypes) {
        channel.bindQueue(assertQueue.queue , ExchangeName , pattern);
    }
    channel.consume(assertQueue.queue , (msg) => {
        console.log(msg.content.toString());
    })
}

ReciveData();