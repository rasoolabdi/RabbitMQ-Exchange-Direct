const amqp = require("amqplib");

const ExchangeName = "directMessage";
async function sendData() {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    await channel.assertExchange(ExchangeName , "direct");
    channel.publish(ExchangeName , "error" , Buffer.from("cannot read data from DB"));   // call routing key error
    setTimeout(() => {
        connection.close();
        process.exit(0);
    })
};

sendData();
