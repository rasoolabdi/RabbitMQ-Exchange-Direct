const amqp = require("amqplib");
const ExchangeName = "directMessage";

async function ReciveData() {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    await channel.assertExchange(ExchangeName , "direct");
    const assertQueue = await channel.assertQueue("" , {exclusive: true});
    channel.bindQueue(assertQueue.queue , ExchangeName , "error");
    channel.consume(assertQueue.queue , (msg) => {
        console.log(msg.content.toString());
    })
}

ReciveData();