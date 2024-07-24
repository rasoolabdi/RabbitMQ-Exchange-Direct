const amqp = require("amqplib");
const ExchangeName = "directMessage";

const [logType , message] = process.argv.slice(2);
console.log(logType , message);


async function sendData() {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    await channel.assertExchange(ExchangeName , "direct");
    channel.publish(ExchangeName , logType , Buffer.from(message));   // create send data with pattern
    setTimeout(() => {
        connection.close();
        process.exit(0);
    })
};

sendData();
